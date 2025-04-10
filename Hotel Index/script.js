document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navigation menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.add('active');
    });

    menuClose.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });

    // Sub Menu
    // For mobile dropdown toggle
document.querySelectorAll('.has-submenu > a').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('active');
            this.querySelector('.fa-chevron-down').classList.toggle('fa-rotate-180');
        }
    });
});

    // Promo slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const indicators = document.querySelector('.slide-indicators');
    let currentSlide = 0;

    // Create indicators
    slides.forEach((slide, index) => {
        const indicator = document.createElement('span');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });

    const indicatorDots = document.querySelectorAll('.slide-indicators span');

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            indicatorDots[index].classList.remove('active');
        });

        slides[currentSlide].classList.add('active');
        indicatorDots[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.promo-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize slider
    updateSlider();

    // Book now button functionality
    const bookNowBtn = document.querySelector('.book-now-btn');
    bookNowBtn.addEventListener('click', function() {
        alert('Booking system will open in a new window.');
        // In a real implementation, this would open a booking modal or page
    });

    // Explore button functionality
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', function() {
        // Scroll to next section or navigate to rooms page
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
});

















// About Us Animation
const aboutSection = document.querySelector('.about-section');
const aboutImage = document.querySelector('.about-image img');

window.addEventListener('scroll', function() {
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
        aboutImage.style.animation = 'fadeIn 1s ease-in-out forwards';
    }
});


// Outlets 
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('.view-all-btn');
    const outletsContainer = document.querySelector('.outlets-container');
    
    if (viewAllBtn && outletsContainer) {
        viewAllBtn.addEventListener('click', function() {
            // Toggle the 'show-all' class on the container
            outletsContainer.classList.toggle('show-all');
            
            // Change button text based on state
            if (outletsContainer.classList.contains('show-all')) {
                viewAllBtn.textContent = 'Show Less Outlets';
            } else {
                viewAllBtn.textContent = 'View All Outlets';
            }
        });
    }
});

// Facilities Tab Functionality
const facilityTabs = document.querySelectorAll('.facility-tab');
const facilityContents = document.querySelectorAll('.facility-content');

facilityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        facilityTabs.forEach(t => t.classList.remove('active'));
        facilityContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});






// COMENTAR
// COMENTAR
document.addEventListener('DOMContentLoaded', function() {
    // API endpoint (simulated with localStorage for demo)
    const API_URL = 'https://your-api-endpoint.com/comments';
    const APPROVED_COMMENTS_KEY = 'approved_comments';
    
    // Load comments from localStorage (simulated API)
    let approvedComments = JSON.parse(localStorage.getItem(APPROVED_COMMENTS_KEY)) || [];
    
    // DOM Elements
    const commentsScroller = document.querySelector('.comments-scroller');
    const commentForm = document.getElementById('commentForm');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const modal = document.getElementById('commentsModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const starRating = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('commentRating');
    const overallRatingEl = document.getElementById('overallRating');
    const overallStarsEl = document.getElementById('overallStars');
    const totalReviewsEl = document.getElementById('totalReviews');
    const modalRatingEl = document.getElementById('modalRating');
    const modalStarsEl = document.getElementById('modalStars');
    
    // Initialize star rating
    starRating.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            starRating.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Render comments in scroller
    function renderScrollingComments() {
        commentsScroller.innerHTML = '';
        
        // Only show approved comments
        const approved = approvedComments.filter(c => c.approved);
        
        // Duplicate comments to create seamless scrolling effect
        const duplicatedComments = [...approved, ...approved];
        
        duplicatedComments.forEach(comment => {
            commentsScroller.appendChild(createCommentCard(comment));
        });
        
        // Calculate total width and adjust animation duration
        const cardWidth = 300 + 20; // width + margin
        const totalWidth = cardWidth * duplicatedComments.length;
        const duration = Math.max(30, totalWidth / 100); // Adjust speed
        
        // Update animation
        commentsScroller.style.animation = `scrollComments ${duration}s linear infinite`;
        
        // Update overall rating
        updateOverallRating();
    }
    
    // Render comments in modal
    function renderModalComments() {
        modalContent.innerHTML = '';
        
        const approved = approvedComments.filter(c => c.approved);
        
        if (approved.length === 0) {
            modalContent.innerHTML = '<p>No comments yet.</p>';
            return;
        }
        
        approved.forEach(comment => {
            const commentElement = createCommentCard(comment, true);
            modalContent.appendChild(commentElement);
        });
        
        // Update modal rating display
        updateModalRating();
    }
    
    // Create comment card element
    function createCommentCard(comment, isModal = false) {
        const commentCard = document.createElement('div');
        commentCard.className = isModal ? 'modal-comment' : 'comment-card';
        
        // Create stars
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= comment.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        // Create photo if exists
        const photoHtml = comment.photo 
            ? `<img src="${comment.photo}" alt="Guest photo" class="comment-photo">` 
            : '';
        
        // Create reply if exists
        const replyHtml = comment.reply 
            ? `<div class="comment-reply">
                  <p>${comment.reply.text}</p>
                  <p class="reply-author">- ${comment.reply.author} (${comment.reply.date})</p>
               </div>` 
            : '';
        
        commentCard.innerHTML = `
            <div class="comment-rating">${stars}</div>
            <p class="comment-text">"${comment.text}"</p>
            ${photoHtml}
            <div class="comment-author">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=random" alt="${comment.name}">
                <div class="author-info">
                    <h4>${comment.name}</h4>
                    <p>From ${comment.location}</p>
                </div>
            </div>
            <div class="comment-date">${comment.date}</div>
            ${replyHtml}
        `;
        
        return commentCard;
    }
    
    // Calculate and update overall rating
    function updateOverallRating() {
        const approved = approvedComments.filter(c => c.approved);
        
        if (approved.length === 0) {
            overallRatingEl.textContent = '0.0';
            overallStarsEl.innerHTML = '<i class="far fa-star"></i>'.repeat(5);
            totalReviewsEl.textContent = '0';
            return;
        }
        
        const totalRating = approved.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = (totalRating / approved.length).toFixed(1);
        
        overallRatingEl.textContent = averageRating;
        totalReviewsEl.textContent = approved.length;
        
        // Update stars
        overallStarsEl.innerHTML = '';
        const fullStars = Math.floor(averageRating);
        const hasHalfStar = averageRating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            if (i <= fullStars) {
                star.className = 'fas fa-star';
            } else if (i === fullStars + 1 && hasHalfStar) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
            overallStarsEl.appendChild(star);
        }
    }
    
    // Update modal rating display
    function updateModalRating() {
        const approved = approvedComments.filter(c => c.approved);
        
        if (approved.length === 0) {
            modalRatingEl.textContent = '0.0';
            modalStarsEl.innerHTML = '<i class="far fa-star"></i>'.repeat(5);
            return;
        }
        
        const totalRating = approved.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = (totalRating / approved.length).toFixed(1);
        
        modalRatingEl.textContent = averageRating;
        
        // Update stars
        modalStarsEl.innerHTML = '';
        const fullStars = Math.floor(averageRating);
        const hasHalfStar = averageRating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            if (i <= fullStars) {
                star.className = 'fas fa-star';
            } else if (i === fullStars + 1 && hasHalfStar) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
            modalStarsEl.appendChild(star);
        }
    }
    
    // Handle form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('commentName').value;
        const email = document.getElementById('commentEmail').value;
        const rating = parseInt(document.getElementById('commentRating').value);
        const text = document.getElementById('commentText').value;
        const photoFile = document.getElementById('commentPhoto').files[0];
        
        if (!rating || rating < 1 || rating > 5) {
            alert('Please select a rating');
            return;
        }
        
        // In a real app, you would upload the photo to a server
        let photoUrl = null;
        if (photoFile) {
            photoUrl = URL.createObjectURL(photoFile);
        }
        
        const newComment = {
            id: Date.now(),
            name,
            email,
            rating,
            text,
            photo: photoUrl,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            location: "Unknown",
            reply: null,
            approved: false // New comments need admin approval
        };
        
        // In a real app, you would send this to your API
        // For demo, we'll store it in localStorage
        const allComments = [...approvedComments, newComment];
        localStorage.setItem(APPROVED_COMMENTS_KEY, JSON.stringify(allComments));
        approvedComments = allComments;
        
        // Reset form
        commentForm.reset();
        starRating.forEach(star => {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        });
        ratingInput.value = 0;
        
        alert('Thank you for your review! Your comment will be visible after approval.');
    });
    
    // View All functionality
    viewAllBtn.addEventListener('click', function() {
        renderModalComments();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Pause animation on hover
    commentsScroller.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    commentsScroller.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
    
    // Initial render
    renderScrollingComments();
});







// Contact Form Submission
// Contact Form Submission
// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // In a real implementation, you would send this data to your server
    console.log({ name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // In a real implementation, you would send this data to your server
    console.log({ email });
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    newsletterForm.reset();
});



// ATRACTIONS
// Efek animasi saat hover titik merah
document.querySelectorAll('.map-point').forEach(point => {
    point.addEventListener('mouseenter', () => {
      point.style.transition = 'all 0.3s ease';
    });
  });
  
  // Custom Scrollbar Logic
  const carousel = document.querySelector('.attractions-carousel');
  const scrollThumb = document.querySelector('.scroll-thumb');
  const scrollTrack = document.querySelector('.custom-scrollbar');
  
  // Set initial thumb position
  updateScrollThumb();
  
  // Update thumb position on scroll
  carousel.addEventListener('scroll', updateScrollThumb);
  
  // Make scrollbar draggable
  scrollTrack.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const thumbPosition = scrollThumb.offsetLeft;
    const maxThumbPosition = scrollTrack.offsetWidth - scrollThumb.offsetWidth;
    
    function moveThumb(e) {
      const deltaX = e.clientX - startX;
      let newThumbPosition = thumbPosition + deltaX;
      
      // Constrain within track
      newThumbPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      
      // Update thumb position
      scrollThumb.style.transform = `translateX(${newThumbPosition}px)`;
      
      // Calculate corresponding carousel scroll
      const scrollRatio = newThumbPosition / maxThumbPosition;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      carousel.scrollLeft = scrollRatio * maxScroll;
    }
    
    function stopDrag() {
      document.removeEventListener('mousemove', moveThumb);
      document.removeEventListener('mouseup', stopDrag);
    }
    
    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('mouseup', stopDrag);
  });
  
  function updateScrollThumb() {
    const scrollRatio = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
    const maxThumbPosition = scrollTrack.offsetWidth - scrollThumb.offsetWidth;
    scrollThumb.style.transform = `translateX(${scrollRatio * maxThumbPosition}px)`;
  }
  
  // Touch support for mobile
  let isDragging = false;
  let startX;
  let scrollLeft;
  
  carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  
  carousel.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
    updateScrollThumb();
  });


// Outlet and Package Button Functionality




// Outlets
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('.packages-section .view-all-btn');
    const packagesContainer = document.querySelector('.packages-container');
    
    if (viewAllBtn && packagesContainer) {
        viewAllBtn.addEventListener('click', function() {
            // Toggle the 'show-all-packages' class on the container
            packagesContainer.classList.toggle('show-all-packages');
            
            // Change button text based on state
            if (packagesContainer.classList.contains('show-all-packages')) {
                viewAllBtn.textContent = 'Show Less Packages';
            } else {
                viewAllBtn.textContent = 'View All Packages';
            }
        });
    }
});


const outletButtons = document.querySelectorAll('.outlet-btn, .package-btn, .attraction-btn');
outletButtons.forEach(button => {
    button.addEventListener('click', function() {
        // In a real implementation, this would navigate to booking page
        alert('Booking system will open in a new window.');
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate about section on load if already in view
    const aboutSectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (aboutSectionPos < screenPos) {
        aboutImage.style.animation = 'fadeIn 1s ease-in-out forwards';
    }
});

// INI UNTUK ABOUT US
document.addEventListener('DOMContentLoaded', function() {
    // About Villa Slider Functionality
    const aboutSlides = document.querySelectorAll('.about-slide');
    const aboutPrevBtn = document.querySelector('.about-prev-slide');
    const aboutNextBtn = document.querySelector('.about-next-slide');
    const aboutIndicators = document.querySelector('.about-slide-indicators');
    let currentAboutSlide = 0;
    let aboutSlideInterval;

    // Create indicators if they exist
    if (aboutIndicators) {
        aboutSlides.forEach((slide, index) => {
            const indicator = document.createElement('span');
            indicator.addEventListener('click', () => goToAboutSlide(index));
            aboutIndicators.appendChild(indicator);
        });
    }

    const aboutIndicatorDots = document.querySelectorAll('.about-slide-indicators span');

    function updateAboutSlider() {
        aboutSlides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (aboutIndicatorDots[index]) {
                aboutIndicatorDots[index].classList.remove('active');
            }
        });

        aboutSlides[currentAboutSlide].classList.add('active');
        if (aboutIndicatorDots[currentAboutSlide]) {
            aboutIndicatorDots[currentAboutSlide].classList.add('active');
        }
    }

    function goToAboutSlide(index) {
        currentAboutSlide = index;
        updateAboutSlider();
        resetAboutSliderTimer();
    }

    function nextAboutSlide() {
        currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
        updateAboutSlider();
        resetAboutSliderTimer();
    }

    function prevAboutSlide() {
        currentAboutSlide = (currentAboutSlide - 1 + aboutSlides.length) % aboutSlides.length;
        updateAboutSlider();
        resetAboutSliderTimer();
    }

    function resetAboutSliderTimer() {
        clearInterval(aboutSlideInterval);
        aboutSlideInterval = setInterval(nextAboutSlide, 5000);
    }

    // Event listeners for buttons if they exist
    if (aboutNextBtn) {
        aboutNextBtn.addEventListener('click', nextAboutSlide);
    }
    
    if (aboutPrevBtn) {
        aboutPrevBtn.addEventListener('click', prevAboutSlide);
    }

    // Auto slide change
    aboutSlideInterval = setInterval(nextAboutSlide, 5000);

    // Pause on hover
    const aboutSliderContainer = document.querySelector('.about-villa-slider');
    if (aboutSliderContainer) {
        aboutSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(aboutSlideInterval);
        });

        aboutSliderContainer.addEventListener('mouseleave', () => {
            aboutSlideInterval = setInterval(nextAboutSlide, 5000);
        });
    }

    // Initialize
    updateAboutSlider();
});