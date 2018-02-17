$('.like-box').click(() => {
  $('.logo-toggle').toggleClass('hidden');
  $('.like-box').addClass('transform-box');
  setTimeout(function() {
    $('.like-box').removeClass('transform-box');
  }, 300);
});
