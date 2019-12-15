$('.input-wrap').each(function() {
  $(this).click(function() {
    $(this).find('svg').css('fill', '#00cc99');
    $('.input-wrap').not(this).find('svg').css('fill', '#b3b3b3');
  });
});