window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// ===== Results Carousel =====
(function() {
    var track = document.getElementById('resultsTrack');
    if (!track) return;
    var viewport = document.querySelector('.carousel-viewport');
    var slides = track.querySelectorAll('.carousel-slide');
    var totalSlides = slides.length;
    var currentSlide = 0;

    var prevBtn = document.getElementById('carouselPrev');
    var nextBtn = document.getElementById('carouselNext');
    var dotsContainer = document.getElementById('resultsDots');
    var counterCurrent = document.getElementById('counterCurrent');
    var counterTotal = document.getElementById('counterTotal');
    var slideLabel = document.getElementById('slideLabel');

    var slideLabels = [];
    slides.forEach(function(slide) {
        var caption = slide.querySelector('.figure-title');
        slideLabels.push(caption ? caption.textContent.trim().replace('.', '') : '');
    });

    if (counterTotal) counterTotal.textContent = totalSlides;

    // Build dots
    for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }

    function getSlideWidth() {
        return viewport.offsetWidth;
    }

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        // Use pixel-based translation: each slide = viewport width
        var offset = -(currentSlide * getSlideWidth());
        track.style.transform = 'translateX(' + offset + 'px)';
        // Update dots
        var dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(function(d, i) {
            d.classList.toggle('active', i === currentSlide);
        });
        // Update counter
        if (counterCurrent) counterCurrent.textContent = currentSlide + 1;
        // Update label
        if (slideLabel && slideLabels[currentSlide]) {
            slideLabel.textContent = slideLabels[currentSlide];
        }
    }

    prevBtn.addEventListener('click', function() { goToSlide(currentSlide - 1); });
    nextBtn.addEventListener('click', function() { goToSlide(currentSlide + 1); });
    dotsContainer.addEventListener('click', function(e) {
        var dot = e.target.closest('.dot');
        if (dot) goToSlide(parseInt(dot.dataset.index));
    });

    // Recalculate on window resize
    window.addEventListener('resize', function() { goToSlide(currentSlide); });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only handle when results section is roughly in view
        var rect = track.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        if (e.key === 'ArrowLeft') { goToSlide(currentSlide - 1); e.preventDefault(); }
        if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); e.preventDefault(); }
    });

    // Touch / Swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    viewport.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        viewport.classList.add('swiping');
    }, { passive: true });

    viewport.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        viewport.classList.remove('swiping');
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToSlide(currentSlide + 1);
            else goToSlide(currentSlide - 1);
        }
    }, { passive: true });

    // Init
    goToSlide(0);
})();

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})
