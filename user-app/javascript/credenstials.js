// function signup() {
//   // Get input values
//   const fullName = document.getElementById('fullName').value;
//   const emailId = document.getElementById('emailId').value;
//   const password = document.getElementById('password').value;
//   const termsCheckbox = document.getElementById('terms');

//   // Clear previous error messages
//   clearErrors();

//   // Basic input validation
//   if (!fullName || !emailId || !password) {
//     displayError('fullName', 'Please fill in all fields.');
//     displayError('emailId', 'Please fill in all fields.');
//     displayError('password', 'Please fill in all fields.');
//     return;
//   }

//   // Email validation
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(emailId)) {
//     displayError('emailId', 'Please enter a valid email address.');
//     return;
//   }

//   // Password validation (simplified)
//   if (password.length < 8) {
//     displayError('password', 'Password must be at least 8 characters long.');
//     return;
//   }

//   // Check if terms are accepted
//   if (!termsCheckbox.checked) {
//     alert('Please accept the Terms and Conditions.');
//     return;
//   }

//   // Check if email is already registered
//   let users = JSON.parse(localStorage.getItem('users')) || [];
//   if (users.some(user => user.emailId === emailId)) {
//     displayError('emailId', 'Email is already registered. Please log in.');
//     return;
//   }

//   // Create new user object
//   const newUser = {
//     id: Date.now(),
//     fullName: fullName,
//     emailId: emailId,
//     password: password,
//     role: "user" // Default role
//   };

//   // Add new user to localStorage
//   users.push(newUser);
//   localStorage.setItem('users', JSON.stringify(users));

//   alert('Signup successful! You can now log in.');
//   window.location.href = 'index.html';
// }

// function login() {
//   // Get input values
//   const emailId = document.getElementById('emailId').value;
//   const password = document.getElementById('password').value;

//   // Clear previous error messages
//   clearErrors();

//   // Basic input validation
//   if (!emailId || !password) {
//     if (!emailId) displayError('emailId', 'Please fill in this field.');
//     if (!password) displayError('password', 'Please fill in this field.');
//     return;
//   }

//   // Email validation
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(emailId)) {
//     displayError('emailId', 'Please enter a valid email address.');
//     return;
//   }

//   // Admin credentials (Modify as needed)
// const adminEmail = "Romanadmin5@example.com";
// const adminPassword = "admin@123wwe";

// function loginAsAdmin(email, password) {
//     if (email === adminEmail && password === adminPassword) {
//         const adminUser = {
//             emailId: adminEmail,
//             role: "admin"
//         };

//         localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
//         alert('Admin login successful!');
//         window.location.assign('/admin-panel/dashboard-admin.html');
//     } else {
//         alert('Invalid admin credentials!');
//     }
// }

// // // Example usage:
// // loginAsAdmin("Romanadmin5@example.com", "admin@123wwe");

// // Example usage:
// loginAsAdmin(emailId, password);

//   // Retrieve users from localStorage
//   const users = JSON.parse(localStorage.getItem('users')) || [];

//   // Find user
//   const user = users.find(u => u.emailId === emailId && u.password === password);

//   if (user) {
//     // Store logged-in user
//     localStorage.setItem('loggedInUser', JSON.stringify(user));

//     alert('Login successful!');
//     window.location.href = 'dashboard.html';
//   } else {
//     displayError('emailId', 'Invalid email or password. Please try again.');
//   }
// }

// // Function to display error messages
// function displayError(inputId, message) {
//   const inputElement = document.getElementById(inputId);
//   const errorElement = document.createElement('div');
//   errorElement.className = 'error-message';
//   errorElement.style.color = 'red';
//   errorElement.innerText = message;

//   // Insert error message below input field
//   inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
// }

// // Function to clear previous error messages
// function clearErrors() {
//   const errorMessages = document.querySelectorAll('.error-message');
//   errorMessages.forEach(error => error.remove());
// }
function signup() {
  const fullName = document.getElementById('fullName').value.trim();
  const emailId = document.getElementById('emailId').value.trim();
  const password = document.getElementById('password').value.trim();
  const termsCheckbox = document.getElementById('terms');

  clearErrors();

  if (!fullName || !emailId || !password) {
    ['fullName', 'emailId', 'password'].forEach(id => displayError(id, 'Please fill in this field.'));
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailId)) {
    displayError('emailId', 'Please enter a valid email address.');
    return;
  }

  if (password.length < 8) {
    displayError('password', 'Password must be at least 8 characters long.');
    return;
  }

  if (!termsCheckbox.checked) {
    alert('Please accept the Terms and Conditions.');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(user => user.emailId === emailId)) {
    displayError('emailId', 'Email is already registered. Please log in.');
    return;
  }

  users.push({ id: Date.now(), fullName, emailId, password, role: "user" });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Signup successful! You can now log in.');
  window.location.href = 'index.html';
}

function login() {
  const emailId = document.getElementById('emailId').value.trim();
  const password = document.getElementById('password').value.trim();

  clearErrors();

  if (!emailId || !password) {
    if (!emailId) displayError('emailId', 'Please fill in this field.');
    if (!password) displayError('password', 'Please fill in this field.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailId)) {
    displayError('emailId', 'Please enter a valid email address.');
    return;
  }

  // ✅ If admin login is successful, stop execution immediately
  if (loginAsAdmin(emailId, password)) {
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.emailId === emailId && u.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    displayError('emailId', 'Invalid email or password. Please try again.');
  }
}

// ✅ Fixed Admin Login Function
function loginAsAdmin(email, password) {
  const adminEmail = "Romanadmin5@example.com";
  const adminPassword = "admin@123wwe";

  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem('loggedInUser', JSON.stringify({ emailId: adminEmail, role: "admin" }));
    alert('Admin login successful!');
    window.location.assign('/admin-panel/dashboard-admin.html');
    return true;  // ✅ Stops execution after successful admin login
  }
  
  return false;  // ✅ Ensures function only returns true if admin login is correct
}

// Function to display error messages
function displayError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.style.color = 'red';
  errorElement.innerText = message;
  inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}

// Function to clear previous error messages
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(error => error.remove());
}
