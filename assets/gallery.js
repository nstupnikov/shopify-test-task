//Checks if Displaysize is bigger than 769 pixel (Desktop-resolution)
if (window.matchMedia('(min-width: 769px)').matches) {
  let activeImage = 'A';

  function fadeToImage(newSrc) {
    const imgA = $('#fadeA');
    const imgB = $('#fadeB');

    const visible = imgA.css('display') !== 'none' ? imgA : imgB;
    const hidden = visible.is(imgA) ? imgB : imgA;

    hidden
      .css({ opacity: 0, display: 'block' })
      .attr('src', newSrc)
      .off('load') 
      .on('load', () => {
        requestAnimationFrame(() => {
          hidden.stop().animate({ opacity: 1 }, 100, 'linear', () => {
            visible.hide();
            activeImage = hidden.is(imgA) ? 'A' : 'B';
          });
        });
      });
  }

  class ImageGallery {
    constructor(config) {
      this.focusedImage = document.querySelector(config.focusedImageSelector);
      this.thumbnails = Array.from(document.querySelectorAll(config.thumbnailSelector));
      this.prevBtn = document.querySelector(config.prevButtonSelector);
      this.nextBtn = document.querySelector(config.nextButtonSelector);
      this.galleryWrapper = document.querySelector(config.galleryContainerSelector);

      this.imageSources = [...this.thumbnails.map(t => t.src)];
      Object.freeze(this.imageSources);

      this.currentIndex = 0;

      this.bindEvents();
      this.updateImage(this.currentIndex);
    }

    //Functionality for the image-buttons
    bindEvents() {
      this.prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.updateImage(this.currentIndex - 1);
        }
      });

      this.nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.imageSources.length - 1) {
          this.updateImage(this.currentIndex + 1);
        }
      });

      this.galleryWrapper.addEventListener('click', (event) => {
        const thumbnail = event.target.closest('.thumbnail');
        if (!thumbnail) return;

        const clickedIndex = this.imageSources.indexOf(thumbnail.src);
        if (clickedIndex !== -1) {
          this.updateImage(clickedIndex);
        }
      });
    }

    updateImage(index) {

      this.currentIndex = index;
      fadeToImage(this.imageSources[this.currentIndex]);

      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.imageSources.length - 1;

      this.prevBtn.classList.toggle('inactive', this.currentIndex === 0);
      this.nextBtn.classList.toggle('inactive', this.currentIndex === this.imageSources.length - 1);

      this.thumbnails.forEach(thumb => {
        thumb.classList.remove('non-clickable');
      });

      const activeSrc = this.imageSources[this.currentIndex];
      const matchingThumb = this.thumbnails.find(thumb => thumb.src === activeSrc);
      
      if (matchingThumb) {
        matchingThumb.classList.add('non-clickable');
        matchingThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const gallery = new ImageGallery({
      focusedImageSelector: '.product-focused-image',
      thumbnailSelector: '.thumbnail',
      prevButtonSelector: '.arrow-left',
      nextButtonSelector: '.arrow-right',
      galleryContainerSelector: '.product-gallery'
    });
  });
}