// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION =====
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the section to show
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // ===== EVENT HANDLING SECTION =====
    
    // 1. Mouse Events
    const mousePositionElement = document.getElementById('mouse-position');
    const clickCounterElement = document.getElementById('click-counter');
    const clickButton = document.getElementById('click-button');
    const hoverElement = document.getElementById('hover-element');
    
    let clickCount = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mousePositionElement.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
    });
    
    // Click counter
    clickButton.addEventListener('click', function() {
        clickCount++;
        clickCounterElement.textContent = clickCount;
    });
    
    // 2. Keyboard Events
    const keyDisplayElement = document.getElementById('key-display');
    
    document.addEventListener('keydown', function(e) {
        keyDisplayElement.textContent = e.key;
    });
    
    // 3. Timer Events
    const timerDisplayElement = document.getElementById('timer-display');
    const resetTimerButton = document.getElementById('reset-timer');
    
    let timeElapsed = 0;
    let timerInterval;
    
    // Start the timer
    function startTimer() {
        timerInterval = setInterval(function() {
            timeElapsed++;
            timerDisplayElement.textContent = `${timeElapsed}s`;
        }, 1000);
    }
    
    // Reset the timer
    resetTimerButton.addEventListener('click', function() {
        clearInterval(timerInterval);
        timeElapsed = 0;
        timerDisplayElement.textContent = '0s';
        startTimer();
    });
    
    // Initialize timer
    startTimer();
    
    // 4. Secret Actions
    const doubleClickButton = document.getElementById('double-click-button');
    const longPressButton = document.getElementById('long-press-button');
    const secretMessageElement = document.getElementById('secret-message');
    
    let longPressTimer;
    
    // Double-click event
    doubleClickButton.addEventListener('dblclick', function() {
        secretMessageElement.textContent = '🌟 Double-click secret activated! 🌟';
        secretMessageElement.classList.remove('hidden');
        
        // Hide the message after 3 seconds
        setTimeout(function() {
            secretMessageElement.classList.add('hidden');
        }, 3000);
    });
    
    // Long press event
    longPressButton.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            secretMessageElement.textContent = '🎉 You discovered the secret long press! 🎉';
            secretMessageElement.classList.remove('hidden');
            longPressButton.style.backgroundColor = '#28a745';
            
            // Hide the message after 3 seconds
            setTimeout(function() {
                secretMessageElement.classList.add('hidden');
                longPressButton.style.backgroundColor = '';
            }, 3000);
        }, 1000); // 1 second for long press
    });
    
    // Clear the timer if mouse is released or leaves the button
    longPressButton.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    longPressButton.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // 5. Scroll Events
    const scrollPositionElement = document.getElementById('scroll-position');
    
    window.addEventListener('scroll', function() {
        scrollPositionElement.textContent = `${window.scrollY}px`;
    });
    
    // ===== INTERACTIVE COMPONENTS SECTION =====
    
    // 1. Color/Text Changing Button
    const changeButton = document.getElementById('change-button');
    
    changeButton.addEventListener('click', function() {
        // Array of possible colors and texts
        const colors = ['#4a6cf7', '#28a745', '#dc3545', '#fd7e14', '#6f42c1'];
        const texts = ['Amazing!', 'Fantastic!', 'Incredible!', 'Awesome!', 'Wow!'];
        
        // Get random color and text
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        
        // Apply changes
        this.style.backgroundColor = randomColor;
        this.textContent = randomText;
        
        // Add animation
        this.classList.add('slide-in');
        setTimeout(() => {
            this.classList.remove('slide-in');
        }, 500);
    });
    
    // 2. Toggle Switch
    const toggleElement = document.getElementById('toggle');
    const toggleStatusElement = document.getElementById('toggle-status');
    const toggleDisplayElement = document.getElementById('toggle-display');
    
    toggleElement.addEventListener('change', function() {
        if (this.checked) {
            toggleStatusElement.textContent = 'ON';
            toggleDisplayElement.textContent = 'Feature is enabled!';
            toggleDisplayElement.style.backgroundColor = '#e0f2fe';
            toggleDisplayElement.style.transform = 'translateY(-5px)';
            toggleDisplayElement.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        } else {
            toggleStatusElement.textContent = 'OFF';
            toggleDisplayElement.textContent = 'Feature is disabled';
            toggleDisplayElement.style.backgroundColor = '#f8f9fa';
            toggleDisplayElement.style.transform = 'translateY(0)';
            toggleDisplayElement.style.boxShadow = 'none';
        }
    });
    
    // 3. Image Gallery
    const gallery = document.getElementById('gallery');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const galleryDotsContainer = document.getElementById('gallery-dots');
    
    let currentImageIndex = 0;
    
    // Create dots for each image
    galleryImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            showImage(index);
        });
        galleryDotsContainer.appendChild(dot);
    });
    
    const galleryDots = document.querySelectorAll('.gallery-dot');
    
    // Show specific image
    function showImage(index) {
        // Remove active class from all images and dots
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current image and dot
        galleryImages[index].classList.add('active');
        galleryDots[index].classList.add('active');
        
        // Update current index
        currentImageIndex = index;
    }
    
    // Previous image
    prevButton.addEventListener('click', function() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) {
            newIndex = galleryImages.length - 1;
        }
        showImage(newIndex);
    });
    
    // Next image
    nextButton.addEventListener('click', function() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= galleryImages.length) {
            newIndex = 0;
        }
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(function() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= galleryImages.length) {
            newIndex = 0;
        }
        showImage(newIndex);
    }, 5000);
    
    // 4. Accordion Component
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the header
            this.classList.toggle('active');
            
            // Get the content panel
            const content = this.nextElementSibling;
            
            // Toggle active class on the content
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        });
    });
    
    // 5. Canvas Drawing
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const clearCanvasButton = document.getElementById('clear-canvas');
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set up canvas
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000';
    
    // Start drawing
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        
        // Get the canvas position relative to the viewport
        const rect = canvas.getBoundingClientRect();
        
        // Calculate the mouse position relative to the canvas
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });
    
    // Draw
    canvas.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        
        // Get the canvas position relative to the viewport
        const rect = canvas.getBoundingClientRect();
        
        // Calculate the mouse position relative to the canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Draw a line
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Update last position
        lastX = x;
        lastY = y;
    });
    
    // Stop drawing
    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });
    
    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
    });
    
    // Clear canvas
    clearCanvasButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // ===== FORM VALIDATION SECTION =====
    const form = document.getElementById('validation-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const messageInput = document.getElementById('message');
    
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const messageError = document.getElementById('message-error');
    
    const formSuccess = document.getElementById('form-success');
    const successMessage = document.getElementById('success-message');
    
    // Password strength elements
    const passwordStrengthContainer = document.getElementById('password-strength-container');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('strength-text');
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Show password strength container if there's input
        if (password.length > 0) {
            passwordStrengthContainer.classList.remove('hidden');
        } else {
            passwordStrengthContainer.classList.add('hidden');
            return;
        }
        
        // Calculate password strength
        let strength = 0;
        let strengthClass = '';
        
        // Check requirements
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        // Update requirement indicators
        toggleRequirement(reqLength, hasLength);
        toggleRequirement(reqUppercase, hasUppercase);
        toggleRequirement(reqNumber, hasNumber);
        toggleRequirement(reqSpecial, hasSpecial);
        
        // Calculate strength percentage
        if (hasLength) strength += 25;
        if (hasUppercase) strength += 25;
        if (hasNumber) strength += 25;
        if (hasSpecial) strength += 25;
        
        // Update strength meter
        strengthMeter.style.width = `${strength}%`;
        
        // Set color based on strength
        if (strength <= 25) {
            strengthClass = 'bg-red-500';
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#dc3545';
        } else if (strength <= 50) {
            strengthClass = 'bg-yellow-500';
            strengthText.textContent = 'Fair';
            strengthText.style.color = '#fd7e14';
        } else if (strength <= 75) {
            strengthClass = 'bg-blue-500';
            strengthText.textContent = 'Good';
            strengthText.style.color = '#0d6efd';
        } else {
            strengthClass = 'bg-green-500';
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#28a745';
        }
        
        // Remove all color classes and add the current one
        strengthMeter.className = 'strength-meter';
        strengthMeter.classList.add(strengthClass);
        
        // Validate password
        if (!hasLength) {
            passwordError.textContent = 'Password must be at least 8 characters';
        } else if (!hasUppercase) {
            passwordError.textContent = 'Password must contain at least one uppercase letter';
        } else if (!hasNumber) {
            passwordError.textContent = 'Password must contain at least one number';
        } else if (!hasSpecial) {
            passwordError.textContent = 'Password must contain at least one special character';
        } else {
            passwordError.textContent = '';
        }
    });
    
    // Helper function to toggle requirement class
    function toggleRequirement(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    }
    
    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
        } else {
            confirmPasswordError.textContent = '';
        }
    });
    
    // Real-time validation for username
    usernameInput.addEventListener('input', function() {
        if (!this.value.trim()) {
            usernameError.textContent = 'Username is required';
        } else if (this.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
        } else {
            usernameError.textContent = '';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.value.trim()) {
            emailError.textContent = 'Email is required';
        } else if (!emailRegex.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    // Real-time validation for message
    messageInput.addEventListener('input', function() {
        if (this.value.trim() && this.value.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
        } else {
            messageError.textContent = '';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        
        // Username validation
        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Username is required';
            isValid = false;
        } else if (usernameInput.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        const password = passwordInput.value;
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        if (!password) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (!hasLength) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else if (!hasUppercase) {
            passwordError.textContent = 'Password must contain at least one uppercase letter';
            isValid = false;
        } else if (!hasNumber) {
            passwordError.textContent = 'Password must contain at least one number';
            isValid = false;
        } else if (!hasSpecial) {
            passwordError.textContent = 'Password must contain at least one special character';
            isValid = false;
        }
        
        // Confirm password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }
        
        // Message validation (optional)
        if (messageInput.value.trim() && messageInput.value.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            form.style.display = 'none';
            formSuccess.classList.remove('hidden');
            successMessage.textContent = `Thank you for your submission, ${usernameInput.value}.`;
            
            // Reset form after 3 seconds
            setTimeout(function() {
                form.reset();
                form.style.display = 'block';
                formSuccess.classList.add('hidden');
                passwordStrengthContainer.classList.add('hidden');
            }, 3000);
        }
    });
});