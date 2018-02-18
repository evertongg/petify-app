$('.like-box').click(() => {
  $('.logo-toggle').toggleClass('hidden');
  $('.like-box').addClass('transform-box');
  setTimeout(function() {
    $('.like-box').removeClass('transform-box');
  }, 300);
});

document.getElementById('pic-select').onchange = function() {
    document.getElementById('pic-upload').submit();
};

document.getElementById('attachment').onchange = function () {
    let path = this.value;
    var filename = path.replace(/^.*\\/, '');

    document.getElementById('filename').innerHTML = filename;
};
