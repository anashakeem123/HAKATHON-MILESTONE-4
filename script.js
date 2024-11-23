var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var editButton;
var saveButton;
var shareButton;

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get input values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var education = document.getElementById('education').value.trim();
    var experience = document.getElementById('experience').value.trim();
    var skills = document.getElementById('skills').value.trim();
    var profilePicInput = document.getElementById('profilePic');

    // Basic validation
    if (!name || !email || !phone || !education || !experience || !skills) {
        alert("Please fill in all the fields.");
        return;
    }

    // Get profile picture (if uploaded)
    var profilePicURL = '';
    if (profilePicInput.files && profilePicInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            profilePicURL = e.target.result; // Store the image URL
            generateResume(name, email, phone, education, experience, skills, profilePicURL);
        };
        reader.readAsDataURL(profilePicInput.files[0]); // Read image file
    } else {
        // If no profile picture uploaded, call the function with an empty string
        generateResume(name, email, phone, education, experience, skills, profilePicURL);
    }
});

function generateResume(name, email, phone, education, experience, skills, profilePicURL) {
    // Generate resume HTML
    var resumeHTML = `
        <h2><b>Resume</b></h2>
        <h3>Personal Information</h3>
        ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">` : ''}
        <p><b>Name:</b><span id="name-span" contenteditable="false">${name}</span></p>
        <p><b>Email:</b><span id="email-span" contenteditable="false">${email}</span></p>
        <p><b>Phone:</b><span id="phone-span" contenteditable="false">${phone}</span></p>

        <h3>Education</h3>
        <p id="education-span" contenteditable="false">${education}</p>

        <h3>Experience</h3>
        <p id="experience-span" contenteditable="false">${experience}</p>

        <h3>Skills</h3>
        <p id="skills-span" contenteditable="false">${skills}</p>

        <button id="edit-resume">Edit</button>
        <button id="save-resume" style="display: none;">Save</button>
        <button id="share-resume">Share Resume</button> <!-- Share Resume button -->
    `;

    // Display the resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    } else {
        console.error('The resume display element is missing');
    }

    // Show the "Edit" button and handle editing
    editButton = document.getElementById('edit-resume');
    saveButton = document.getElementById('save-resume');
    shareButton = document.getElementById('share-resume'); // Add reference to share button

    editButton.style.display = 'block'; // Show "Edit" button
    saveButton.style.display = 'none'; // Hide "Save" button initially
    shareButton.style.display = 'block'; // Show the "Share" button

    editButton.addEventListener('click', function () {
        // Make resume editable
        document.querySelectorAll('[contenteditable="false"]').forEach(function (element) {
            element.contentEditable = "true"; // Make the content editable
        });
        editButton.style.display = 'none'; // Hide "Edit" button after clicking it
        saveButton.style.display = 'block'; // Show "Save" button
    });

    saveButton.addEventListener('click', function () {
        // Make the resume content non-editable after saving
        document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
            element.contentEditable = "false"; // Make the content non-editable
        });
        editButton.style.display = 'block'; // Show "Edit" button again
        saveButton.style.display = 'none'; // Hide "Save" button after saving
    });

    // Share Resume functionality
    shareButton.addEventListener('click', function () {
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
            profilePicURL: profilePicURL
        };

        // Convert resumeData to JSON and encode it in the URL
        var resumeDataURL = encodeURIComponent(JSON.stringify(resumeData));

        // Share URL (for example, you can share it through social media or email)
        var shareURL = window.location.href.split('?')[0] + '?resume=' + resumeDataURL;

        alert('Share this link to view the resume: ' + shareURL);
    });
}
