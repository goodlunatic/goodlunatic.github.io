# 2025 浙江省大学生网络与信息安全竞赛 Misc Writeup

**2025 浙江省大学生网络与信息安全竞赛 Writeup**
<!--more-->

本文仅记录问的比较多的几道 Misc 题，其余题目的题解可参考 A1natas 的官方 Writeup：

初赛：https://mp.weixin.qq.com/s/MpmetBaIVQNhCUOnis63gQ

决赛：https://mp.weixin.qq.com/s/Vl86wmSNVhbZd7f9KSkh8g

> 本文中涉及的具体题目附件可以进我的[知识星球](https://t.zsxq.com/an6p6)获取

## 题目名称 小小作曲家

附件给了两个pcapng 流量包：attachment.pcapng 和 velato.pcapng

打开翻看一下发现是用 USB 传了 MIDI 数据

![](imgs/image-20251118110518135.png)

我们首先看这个attachment.pcapng，用 tshark 导出一下 midi 事件和对应的时间戳

```bash
tshark -r attachment.pcapng -T fields -Y 'usbaudio.midi.event' -e 'frame.time_epoch' -e 'usbaudio.midi.event' > 1.txt
```

> 这里也是赛后和别的师傅们交流了一下才知道，**这里要把时间戳也一起提取出来**
> 
> 要不然后面制作 mid 文件的时候会有问题，音符和时间就没法对应上，导致错失关键信息
> 
> 参考链接：https://www.dr0n.top/posts/3802b37a/

数据提取出来后的格式大致如下

![](imgs/image-20251118110929386.png)

我们写个脚本，用这些 midi 事件制作 mid 文件

```python
import mido


PPQ = 480  # 每四分音符的 tick 数
BPM = 120.0  # 节拍速度
MIN_DURATION_MS = 120.0  # 音符最小持续时间（毫秒）

def parse_midi_events(input_file):
    with open(input_file, "r") as f:
        data = f.read()

    lines = data.splitlines()
    # print(lines) # 1722159321.608646000\t904064
    events = []

    for line in lines:
        parts = line.split("\t")
        ts_str, hexdata = parts
        ts = float(ts_str)  # 时间戳
        b = bytes.fromhex(hexdata)
        status, note, velocity = b[0], b[1], b[2]
        if 0x90 <= status <= 0x9F and velocity > 0:
            events.append((ts, "note_on", note, velocity))
        elif 0x80 <= status <= 0x8F or (0x90 <= status <= 0x9F and velocity == 0):
            events.append((ts, "note_off", note, velocity))

    return events

def enforce_min_note_duration(events):
    # 按需延长 Note Off 的时间，保证音符不少于 MIN_DURATION_MS
    min_duration = MIN_DURATION_MS / 1000.0
    active_notes = {}  # 记录活跃的 note_on 事件
    processed_events = []
    
    for event in events:
        ts, event_type, note, velocity = event
        if event_type == "note_on":
            key = note
            active_notes[key] = (ts, event_type, note, velocity)
            processed_events.append(event)
        elif event_type == "note_off":
            key = note
            if key in active_notes:
                start_ts, _, _, _ = active_notes[key]
                min_end = start_ts + min_duration
                # 如果持续时间太短，延长 Note Off 的时间戳
                if ts < min_end:
                    new_event = (min_end, event_type, note, velocity)
                    processed_events.append(new_event)
                else:
                    processed_events.append(event)
                del active_notes[key]
            else:
                processed_events.append(event)
    
    # 对处理后的事件按时间戳排序
    processed_events.sort(key=lambda x: x[0])
    return processed_events

def build_midi(events, output_midi):
    # 确保所有音符都有最小持续时间
    processed_events = enforce_min_note_duration(events)
    
    # 创建 MIDI 文件
    mid = mido.MidiFile(ticks_per_beat=PPQ)
    track = mido.MidiTrack()
    mid.tracks.append(track)
    
    # 设置曲速
    tempo_us = int(mido.bpm2tempo(BPM))
    track.append(mido.MetaMessage("set_tempo", tempo=tempo_us, time=0))
    
    # 将事件转换为MIDI消息
    prev_time = 0.0
    start_time = processed_events[0][0] if processed_events else 0
    
    for event in processed_events:
        ts, event_type, note, velocity = event
        rel_time = ts - start_time
        
        # 计算与前一个事件的时间差（秒）
        delta = max(0.0, rel_time - prev_time)
        
        # 将秒转换为 MIDI tick 数
        ticks = int(round(mido.second2tick(delta, PPQ, tempo_us)))
        
        # 创建MIDI消息
        if event_type == "note_on":
            msg = mido.Message("note_on", note=note, velocity=velocity, time=ticks)
        elif event_type == "note_off":
            msg = mido.Message("note_off", note=note, velocity=velocity, time=ticks)
        else:
            continue
            
        track.append(msg)
        prev_time = rel_time
    
    track.append(mido.MetaMessage("end_of_track", time=0))
    mid.save(output_midi)
    print(f"[+] MIDI 文件已保存：{output_midi}（共 {len(processed_events)} 个事件）")

if __name__ == "__main__":
    input_data = "1.txt"
    out_midi = "1.mid"
    
    events = parse_midi_events(input_data)
    print(f"[+] 提取到 {len(events)} 个 MIDI 事件")
    
    build_midi(events, out_midi)
```

> 这个代码具体是什么意思呢？
> 
> 就是首先从我们 tshark 提取出来的数据中解析时间戳和 midi 时间
> 
> 然后我们设置一个时间间隔：0.01，只要是小于这个时间间隔的，我们就认为是同时按下去的
> 
> 其实可以认为就是乐理中的和弦，那么我们要怎么注意到这个规律的呢?
> 
> 我们可以直接去看 tshark 中提取出来的midi数据(一共三字节)：
> 
> 第一字节代表事件(note on/note off)，第二字节代表音符，第三字节代表力度
> 
> 然后我们可以看到音符有很多连续的段，但是中间有时候会缺几个
> 
> 这其实就对应到二维码中黑白像素的分布，连续的就是黑色像素的位置，缺失的则是白色像素

然后我们用 audacity 打开制作好的 mid 文件，稍微拉伸缩放一下，可以看到下图

![](imgs/image-20251118111440827.png)

发现是个倒置的二维码，但是很明显这样是没法扫描的，因此我们可以写个脚本把它保存到图片中

```python
import numpy as np
from PIL import Image
import mido

PPQ = 480  # 每四分音符的 tick 数
BPM = 120.0  # 节拍速度
MIN_DURATION_MS = 120.0  # 音符最小持续时间（毫秒）

def parse_midi_events(input_file):
    with open(input_file, "r") as f:
        data = f.read()

    lines = data.splitlines()
    # print(lines) # 1722159321.608646000\t904064
    events = []

    for line in lines:
        parts = line.split("\t")
        ts_str, hexdata = parts
        ts = float(ts_str)  # 时间戳
        b = bytes.fromhex(hexdata)
        status, note, velocity = b[0], b[1], b[2]
        if 0x90 <= status <= 0x9F and velocity > 0:
            events.append((ts, "note_on", note, velocity))
        elif 0x80 <= status <= 0x8F or (0x90 <= status <= 0x9F and velocity == 0):
            events.append((ts, "note_off", note, velocity))

    return events

def group_rows(events):
    rows = []
    current = []
    prev = None

    # 只使用 note_on 事件来分组行
    note_on_events = [ev for ev in events if ev[1] == "note_on"]
    
    for ts, event_type, note, velocity in note_on_events:
        # 如果大于阈值0.01s，就是下一行的数据
        if prev is not None and ts - prev > 0.01:
            rows.append(current)
            current = []
        current.append(note)  # 同一行的都加入
        prev = ts
        
    rows.append(current)  # 添加一整行的数据
    return rows

def render_matrix(rows):
    note_set = set()  # 利用集合去重
    for row in rows:
        for n in row:
            note_set.add(n)

    # print(note_set)
    all_notes = sorted(note_set)  # 从小到大排序
    # print(all_notes)
    note_to_idx = {}  # 音符对应到列
    for i, note in enumerate(all_notes):
        note_to_idx[note] = i

    H = len(rows)
    W = len(all_notes)
    matrix = np.zeros((H, W), dtype=np.uint8)

    for y, row in enumerate(rows):  # 填充矩阵
        for n in row:
            col = note_to_idx[n]
            matrix[y, col] = 1

    return matrix

def save_png(matrix, out_img):
    # 矩阵中大于 0 的置为 0（黑色），等于 0 的置为 255（白色）
    img = Image.fromarray(np.where(matrix > 0, 0, 255).astype("uint8"))
    H, W = matrix.shape
    img = img.resize((W * 20, H * 20), Image.NEAREST)  # 放大二维码
    img.save(out_img)
    print(f"[+] 图像已保存：{out_img}")

def enforce_min_note_duration(events):
    # 按需延长 Note Off 的时间，保证音符不少于 MIN_DURATION_MS
    min_duration = MIN_DURATION_MS / 1000.0
    active_notes = {}  # 记录活跃的 note_on 事件
    processed_events = []
    
    for event in events:
        ts, event_type, note, velocity = event
        if event_type == "note_on":
            key = note
            active_notes[key] = (ts, event_type, note, velocity)
            processed_events.append(event)
        elif event_type == "note_off":
            key = note
            if key in active_notes:
                start_ts, _, _, _ = active_notes[key]
                min_end = start_ts + min_duration
                # 如果持续时间太短，延长 Note Off 的时间戳
                if ts < min_end:
                    new_event = (min_end, event_type, note, velocity)
                    processed_events.append(new_event)
                else:
                    processed_events.append(event)
                del active_notes[key]
            else:
                processed_events.append(event)
    
    # 对处理后的事件按时间戳排序
    processed_events.sort(key=lambda x: x[0])
    return processed_events

def build_midi(events, output_midi):
    # 确保所有音符都有最小持续时间
    processed_events = enforce_min_note_duration(events)
    
    # 创建 MIDI 文件
    mid = mido.MidiFile(ticks_per_beat=PPQ)
    track = mido.MidiTrack()
    mid.tracks.append(track)
    
    # 设置曲速
    tempo_us = int(mido.bpm2tempo(BPM))
    track.append(mido.MetaMessage("set_tempo", tempo=tempo_us, time=0))
    
    # 将事件转换为MIDI消息
    prev_time = 0.0
    start_time = processed_events[0][0] if processed_events else 0
    
    for event in processed_events:
        ts, event_type, note, velocity = event
        rel_time = ts - start_time
        
        # 计算与前一个事件的时间差（秒）
        delta = max(0.0, rel_time - prev_time)
        
        # 将秒转换为 MIDI tick 数
        ticks = int(round(mido.second2tick(delta, PPQ, tempo_us)))
        
        # 创建MIDI消息
        if event_type == "note_on":
            msg = mido.Message("note_on", note=note, velocity=velocity, time=ticks)
        elif event_type == "note_off":
            msg = mido.Message("note_off", note=note, velocity=velocity, time=ticks)
        else:
            continue
            
        track.append(msg)
        prev_time = rel_time
    
    track.append(mido.MetaMessage("end_of_track", time=0))
    mid.save(output_midi)
    print(f"[+] MIDI 文件已保存：{output_midi}（共 {len(processed_events)} 个事件）")

if __name__ == "__main__":
    input_data = "1.txt"
    out_img = "1.png"
    out_midi = "1.mid"
    
    events = parse_midi_events(input_data)
    print(f"[+] 提取到 {len(events)} 个 MIDI 事件")
    
    build_midi(events, out_midi)
    
    # 生成图像（只使用 note_on 事件）
    note_on_events = [ev for ev in events if ev[1] == "note_on"]
    print(f"[+] 其中 {len(note_on_events)} 个 NOTE ON 事件")
    
    rows = group_rows(events)
    print(f"[+] 分成 {len(rows)} 行")
    
    matrix = render_matrix(rows)
    save_png(matrix, out_img)
```

运行以上图片后可以得到下图

![](imgs/image-20251118111659538.png)

发现左上角有个像素位置偏移了，不过问题不大，用工具或者手动处理一下也能扫出来

扫码后得到：`dac765079a6eb04a6a2a89a601c40c5f8e7c08e5f1b37bac6016e1c63f193d10`

然后我们再去看 velato.pcapng，前面的步骤是一样的，首先用 tshark 导出时间戳和 midi 事件

```bash
tshark -r velato.pcapng -T fields -Y 'usbaudio.midi.event' -e 'frame.time_epoch' -e 'usbaudio.midi.event' > 2.txt 
```

然后用上面那个脚本生成 mid 文件

```python
import mido


PPQ = 480  # 每四分音符的 tick 数
BPM = 120.0  # 节拍速度
MIN_DURATION_MS = 120.0  # 音符最小持续时间（毫秒）

def parse_midi_events(input_file):
    with open(input_file, "r") as f:
        data = f.read()

    lines = data.splitlines()
    # print(lines) # 1722159321.608646000\t904064
    events = []

    for line in lines:
        parts = line.split("\t")
        ts_str, hexdata = parts
        ts = float(ts_str)  # 时间戳
        b = bytes.fromhex(hexdata)
        status, note, velocity = b[0], b[1], b[2]
        if 0x90 <= status <= 0x9F and velocity > 0:
            events.append((ts, "note_on", note, velocity))
        elif 0x80 <= status <= 0x8F or (0x90 <= status <= 0x9F and velocity == 0):
            events.append((ts, "note_off", note, velocity))

    return events

def enforce_min_note_duration(events):
    # 按需延长 Note Off 的时间，保证音符不少于 MIN_DURATION_MS
    min_duration = MIN_DURATION_MS / 1000.0
    active_notes = {}  # 记录活跃的 note_on 事件
    processed_events = []
    
    for event in events:
        ts, event_type, note, velocity = event
        if event_type == "note_on":
            key = note
            active_notes[key] = (ts, event_type, note, velocity)
            processed_events.append(event)
        elif event_type == "note_off":
            key = note
            if key in active_notes:
                start_ts, _, _, _ = active_notes[key]
                min_end = start_ts + min_duration
                # 如果持续时间太短，延长 Note Off 的时间戳
                if ts < min_end:
                    new_event = (min_end, event_type, note, velocity)
                    processed_events.append(new_event)
                else:
                    processed_events.append(event)
                del active_notes[key]
            else:
                processed_events.append(event)
    
    # 对处理后的事件按时间戳排序
    processed_events.sort(key=lambda x: x[0])
    return processed_events

def build_midi(events, output_midi):
    # 确保所有音符都有最小持续时间
    processed_events = enforce_min_note_duration(events)
    
    # 创建 MIDI 文件
    mid = mido.MidiFile(ticks_per_beat=PPQ)
    track = mido.MidiTrack()
    mid.tracks.append(track)
    
    # 设置曲速
    tempo_us = int(mido.bpm2tempo(BPM))
    track.append(mido.MetaMessage("set_tempo", tempo=tempo_us, time=0))
    
    # 将事件转换为MIDI消息
    prev_time = 0.0
    start_time = processed_events[0][0] if processed_events else 0
    
    for event in processed_events:
        ts, event_type, note, velocity = event
        rel_time = ts - start_time
        
        # 计算与前一个事件的时间差（秒）
        delta = max(0.0, rel_time - prev_time)
        
        # 将秒转换为 MIDI tick 数
        ticks = int(round(mido.second2tick(delta, PPQ, tempo_us)))
        
        # 创建MIDI消息
        if event_type == "note_on":
            msg = mido.Message("note_on", note=note, velocity=velocity, time=ticks)
        elif event_type == "note_off":
            msg = mido.Message("note_off", note=note, velocity=velocity, time=ticks)
        else:
            continue
            
        track.append(msg)
        prev_time = rel_time
    
    track.append(mido.MetaMessage("end_of_track", time=0))
    mid.save(output_midi)
    print(f"[+] MIDI 文件已保存：{output_midi}（共 {len(processed_events)} 个事件）")

if __name__ == "__main__":
    input_data = "2.txt"
    out_midi = "2.mid"
    
    events = parse_midi_events(input_data)
    print(f"[+] 提取到 {len(events)} 个 MIDI 事件")
    
    build_midi(events, out_midi)
```

其实流量包的文件名给了我们提示：`velato`

`velato` 是一种编程语言，我们可以到官网上下载编译器：https://velato.net/

编译然后运行即可得到密钥：`Th1s1sAuSeFu1ke4`

![](imgs/image-20251118112434745.png)

最后解个 AES-ECB 即可得到 flag：`DASCTF{M1D1_C0Mp0s2r!!!}`

![](imgs/image-20251118112601443.png)

## 题目名称 Really Good Binaural Audio


---

> 作者: [Lunatic](https://goodlunatic.github.io)  
> URL: https://goodlunatic.github.io/posts/8582ff7/  

