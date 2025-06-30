
function makeDraggable(container) {
  let isDragging = false;
  let startY;
  let scrollTop;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.pageY;
    scrollTop = container.scrollTop;
    container.classList.add('dragging');
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('dragging');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const y = e.pageY;
    const delta = y - startY;
    const direction = Math.sign(delta);
    const walk = direction * Math.pow(Math.abs(delta), 1.15);
    container.scrollTop = scrollTop - walk;
  });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    scrollTop = container.scrollTop;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const y = e.touches[0].clientY;
    const delta = y - startY;
    const direction = Math.sign(delta);
    const walk = direction * Math.pow(Math.abs(delta), 1.15); 
    container.scrollTop = scrollTop - walk;
  });

  container.addEventListener('dragstart', (e) => e.preventDefault());
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.thumbnail-scrollable');
  if (scrollContainer) {
    makeDraggable(scrollContainer);
  }
});
