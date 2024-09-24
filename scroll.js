document.addEventListener('DOMContentLoaded', () => {
  const reelsContainer = document.querySelector('.reelsContainer');
  let isScrolling = false;  // Flag to prevent multiple scrolls at once
  let timeoutId;

  reelsContainer.addEventListener('wheel', (e) => {
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

    // Add a delay (e.g., 500ms) before allowing the next scroll
    timeoutId = setTimeout(() => {
      isScrolling = false;  // Unlock scrolling
    }, 500);  // Set delay time here
  });
});