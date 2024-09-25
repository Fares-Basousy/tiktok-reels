import {useEffect, useState} from 'react'
import React from 'react';
import Plyr from 'plyr';
import './App.css';

function App() {
  const [videos, setVideos] = useState([
    { id: 0, src: '/reel0.mp4' },
   
  ]);

  useEffect(() => {
    const ReelScroll = ()=>{
    const reelsContainer = document.querySelector('.reelsContainer');
    let isScrolling = false;  // Flag to prevent multiple scrolls at once
    let timeoutId;

    if (!reelsContainer) return; // Safety check in case reelsContainer isn't available

    const handleScroll = (e) => {
      e.preventDefault();  // Prevent default scroll behavior

      if (isScrolling) return;  // Exit if already scrolling

      isScrolling = true;  // Lock scrolling

      const direction = e.deltaY > 0 ? 1 : -1;  // Determine scroll direction (up/down)
      const scrollAmount = reelsContainer.clientHeight;  // Scroll by container height

      // Calculate new scroll position based on direction
      const newScrollPosition = reelsContainer.scrollTop + scrollAmount * direction;

      // Smoothly scroll to the new position
      reelsContainer.scrollTo({
        top: newScrollPosition,
        behavior: 'smooth',
      });

      // Add a delay before allowing the next scroll
      timeoutId = setTimeout(() => {
        isScrolling = false;  // Unlock scrolling
      }, 500);  // Set delay time here
    };

    // Attach the event listener for wheel scroll
    reelsContainer.addEventListener('wheel', handleScroll);
}
    ReelScroll()
    
  }, []);// Hook to handle scroll behavior
  useEffect(() => {
    const scrollTransition = ()=>{
    const reelsContainer = document.querySelector('.reelsContainer');
    const reels = document.querySelectorAll('.reel');
    let isScrolling = false;
    let timeoutId;

    // Function to check if a reel is in view
    const checkVisibleReels = () => {
      reels.forEach((reel) => {
        const reelRect = reel.getBoundingClientRect();
        const containerRect = reelsContainer.getBoundingClientRect();

        // Check if the reel is fully visible within the container
        if (
          reelRect.top >= containerRect.top &&
          reelRect.bottom <= containerRect.bottom
        ) {
          reel.classList.add('visible'); // Add the visible class
        } else {
          reel.classList.remove('visible'); // Remove the visible class if out of view
        }
      });
    };

    // Event listener for the scroll wheel
    const handleWheelScroll = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      isScrolling = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      const scrollAmount = reelsContainer.clientHeight;
      const newScrollPosition =
        reelsContainer.scrollTop + scrollAmount * direction;

      reelsContainer.scrollTo({
        top: newScrollPosition,
        behavior: 'smooth',
      });

      // After scrolling, check which reels are visible
      setTimeout(() => {
        checkVisibleReels(); // Check visibility after scroll
      }, 500); // Adjust delay as needed

      clearInterval(timeoutId);
      timeoutId = setTimeout(() => {
        isScrolling = false;
      }, 800); // Adjust delay as needed
    };

    // Initially check visibility on page load
    checkVisibleReels();

    if (reelsContainer) {
      reelsContainer.addEventListener('wheel', handleWheelScroll);
    }
    }
    scrollTransition()
  }, [videos.length]); // Hook to handle visibility transitions
  useEffect(() => {
   const initializePlayer = ()=>{// Initialize Plyr.js for all videos
    const players = Array.from(document.querySelectorAll('video')).map(
      (video) => new Plyr(video,{
        controls:['progress' , 'fullscreen']
      })
    );

    // Function to handle video playback based on intersection
    const handleVideoPlayback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    };

    // Create an IntersectionObserver to monitor the videos
    const observer = new IntersectionObserver(handleVideoPlayback, {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.5, // Play video when it is 50% visible
    });

    // Observe each video element
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => observer.observe(video));

    // Play the first video by default when the page loads
    window.addEventListener('load', () => {
      if (players.length > 0) {
        players[0].play();
      }
    });

  }
  initializePlayer()
   
  }, [videos.length]); // Empty dependency array to run once after the component mounts; // Hook to handle video playback control

  // Function to dynamically add a new video
  const addNewVideo = () => {
    // const newVideoId = videos.length;
    // const newVideoSrc = `/reel${newVideoId}.mp4`;
    setVideos((prevVideos) => [...prevVideos, { id: 0, src: '/reel0.mp4'}]);
  };
  console.log(videos)
  return (
<>   
 
  <body>
    <div className="main-wrapper pt-5">
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className="reelsContainer">
          {videos.map((video) => (
              <div className="reel" key={video.id}>
                <video id={`video${video.id}`} loop controls>
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={addNewVideo}>add video</button>
   { /* <div className="mouse-scroll">
        <img src="/scroll-mouse.gif" alt="">
      </div> */
   } </div>
  {/* jQuery */}
 { /* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></?script> */}
 { /* Plyr.js JS */}
    {/* <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
    <script src="script.js" type="text/javascript"></script>
  {/* additional script 
    <script src="scroll.js" type="text/javascript"></script>
    <script src="transition-scroll.js" type="text/javascript"></script> */}
  </body>
</>
  );
}

export default App;
