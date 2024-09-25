document.addEventListener("DOMContentLoaded", function() {
  // Initialize Plyr.js for all videos
  const players = Array.from(document.querySelectorAll('video')).map(video => new Plyr(video));

  // Function to handle video playback based on intersection
  function handleVideoPlayback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
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
  document.querySelectorAll('video').forEach(video => {
    observer.observe(video);
  });

  // Play the first video by default
  window.addEventListener('load', function() {
    if (players.length > 0) {
      players[0].play();
    }
  });
});
