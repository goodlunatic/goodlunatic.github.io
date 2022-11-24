(function(){
  $(".widget-wrap.toc .widget").html($(".toc-article").html());
  var position = $('.widget-wrap.toc').position().top;
  $(window).scroll(function(){
    $(".widget-wrap.toc").css({
      "position":"relative",
      "top":($("body,html").scrollTop() - position > 0) ? $("body,html").scrollTop() - position : 0
    });
  });
})();