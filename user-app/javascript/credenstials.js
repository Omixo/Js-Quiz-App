
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
