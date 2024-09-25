document.addEventListener("DOMContentLoaded", () => {
  const reelsContainer = document.querySelector(".reelsContainer");
  const reels = document.querySelectorAll(".reel");
  let isScrolling = false;
  let timeoutId;

  // Function to check if a reel is in view
  function checkVisibleReels() {
    reels.forEach((reel) => {
      const reelRect = reel.getBoundingClientRect();
      const containerRect = reelsContainer.getBoundingClientRect();

      // Check if the reel is fully visible within the container
      if (
        reelRect.top >= containerRect.top &&
        reelRect.bottom <= containerRect.bottom
      ) {
        reel.classList.add("visible"); // Add the visible class
      } else {
        reel.classList.remove("visible"); // Remove the visible class if out of view
      }
    });
  }

  reelsContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (isScrolling) return;

    isScrolling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const scrollAmount = reelsContainer.clientHeight;

    const newScrollPosition =
      reelsContainer.scrollTop + scrollAmount * direction;

    reelsContainer.scrollTo({
      top: newScrollPosition,
      behavior: "smooth",
    });

    // After scrolling, check which reels are visible
    setTimeout(() => {
      checkVisibleReels(); // Check visibility after scroll
    }, 500); // Adjust delay as needed
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => {
      isScrolling = false;
    }, 800); // Adjust delay as needed
  });

  // Initially check visibility on page load
  checkVisibleReels();
});
