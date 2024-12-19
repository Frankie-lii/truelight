// Activity Navigation Functionality
document.addEventListener("DOMContentLoaded", function() {
    const activityNavLinks = document.querySelectorAll('.activity-nav a');
    const activitySections = document.querySelectorAll('.activity-section');

    activityNavLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Hide all sections
            activitySections.forEach(section => section.style.display = 'none');

            // Show the clicked section
            activitySections[index].style.display = 'block';

            // Update active link
            activityNavLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Show the first activity section by default
    if (activitySections.length > 0) {
        activitySections[0].style.display = 'block';
        activityNavLinks[0].classList.add('active');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const contactMethodInput = document.getElementById('contactMethod');
    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');

    // Simple form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting traditionally

        // Clear previous response message
        responseMessage.innerHTML = '';

        // Validate fields
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            responseMessage.innerHTML = '<p class="error">All fields are required!</p>';
            return;
        }

        const contactMethod = contactMethodInput.value;

        // AJAX Form Submission (You can integrate this with Flask later)
        const formData = new FormData(contactForm);
        formData.append('contactMethod', contactMethod);

        fetch('/contact', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    responseMessage.innerHTML = '<p class="success">Thank you for reaching out! We will get back to you soon.</p>';
                    contactForm.reset(); // Reset the form
                } else {
                    responseMessage.innerHTML = '<p class="error">Something went wrong. Please try again later.</p>';
                }
            })
            .catch(error => {
                responseMessage.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
            });
    });
});
// JavaScript for Program Section Navigation

let currentIndex = 0;
const programs = document.querySelectorAll('.program');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Function to update the program container position
function updateProgramPosition() {
    const offset = -currentIndex * (programs[0].offsetWidth + 20); // 20px is the margin between programs
    document.querySelector('.program-container').style.transform = `translateX(${offset}px)`;
}

// Event listeners for the navigation buttons
nextBtn.addEventListener('click', () => {
    if (currentIndex < programs.length - 1) {
        currentIndex++;
        updateProgramPosition();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateProgramPosition();
    }
});

// Make the programs scrollable on smaller devices
if (window.innerWidth <= 768) {
    const programContainer = document.querySelector('.program-container');
    programContainer.addEventListener('scroll', () => {
        const scrollLeft = programContainer.scrollLeft;
        const programWidth = programs[0].offsetWidth + 20; // 20px is the margin between programs
        currentIndex = Math.round(scrollLeft / programWidth);
    });
}