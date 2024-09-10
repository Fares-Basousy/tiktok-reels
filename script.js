$(document).ready(function() {
  // Initialize Plyr.js for all videos
  const players = $('video').map(function() {
    return new Plyr(this);
  }).get();

  // Function to handle video playback based on intersection
  function handleVideoPlayback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).get(0).play();
      } else {
        $(entry.target).get(0).pause();
      }
    });
  }

  // Create an IntersectionObserver to monitor the videos
  const observer = new IntersectionObserver(handleVideoPlayback, {
    root: null, // Use the viewport
    rootMargin: '0px',
    threshold: 0.5 // Play video when it is 50% visible
  });

  // Observe each video element
  $('video').each(function() {
    observer.observe(this);
  });

  // Play the first video by default
  $(window).on('load', function() {
    if (players.length > 0) {
      players[0].play();
    }
  });
});
