$(document).ready(function() {
  // Initialize Plyr.js for all videos
  const players = $('video').map(function() {
      return new Plyr(this);
  }).get();

  // Function to handle video playback based on intersection
  function handleVideoPlayback(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              $(entry.target).get(0).play().catch(error => {
                  console.log('Error playing video:', error);
              });
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

  // Optional: Automatically start playback if required (ensure it is user-initiated)
  $(window).on('load', function() {
      // Example: Triggering button click programmatically to simulate user interaction
      $('#startButton').click();
  });
});
console.log('done');
