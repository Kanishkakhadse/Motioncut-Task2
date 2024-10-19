let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pagination = document.getElementById('pagination');
let slideInterval;

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    updatePagination(index);
}

// Function to update pagination
function updatePagination(index) {
    pagination.innerHTML = ''; // Clear previous pagination
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.toggle('active', i === index);
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = i;
            showSlide(currentSlide);
            startSlideShow(3000); // Restart auto-scrolling
        });
        pagination.appendChild(dot);
    }
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-scrolling function
function startSlideShow(speed) {
    slideInterval = setInterval(nextSlide, speed);
}

// Event listeners for navigation buttons
nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    startSlideShow(3000); // Restart auto-scrolling
});

prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    startSlideShow(3000); // Restart auto-scrolling
});

// Pause autoplay on hover
const sliderContainer = document.getElementById('sliderContainer');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startSlideShow(3000); // Restart auto-scrolling
});

// Start the slideshow with a customizable speed
startSlideShow(3000); // Change this value for different speeds
showSlide(currentSlide); // Initial call to show the first slide