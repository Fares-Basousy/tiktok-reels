
$(document).ready(function () {
  // Play the first video by default (it will be muted, so autoplay will work)
  // $('video').first()[0].play();

  // Function to check if the video is in view
  function checkVideoInView() {
    $('video').each(function () {
      var video = $(this);
      var videoTop = video.offset().top;
      var videoBottom = videoTop + video.outerHeight();
      var windowTop = $(window).scrollTop();
      var windowBottom = windowTop + $(window).height();

      // Check if the video is fully visible in the viewport
      if (videoBottom >= windowTop && videoTop <= windowBottom) {
        video[0].play(); // Play video if in view
      } else {
        video[0].pause(); // Pause video if out of view
      }
    });
  }

  // Initial check
  checkVideoInView();

  // Check video position on scroll
  $('.reelsContainer').on('scroll', function () {
    checkVideoInView();
  });
});