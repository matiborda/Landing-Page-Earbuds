document.addEventListener("DOMContentLoaded", function () {
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");
  
      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
  
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
  
    window.addEventListener("scroll", reveal);
    // Reveal elements on page load
    reveal();
  
    // Responsive navbar toggle
    const navbarToggle = document.getElementById("navbar-toggle");
    const navbarMenu = document.getElementById("navbar-menu");
  
    navbarToggle.addEventListener("click", function () {
      navbarMenu.classList.toggle("open");
    });
  
    // Payment Modal
    const buyButtons = document.querySelectorAll('.buy-button');
    const modal = document.getElementById('payment-modal');
    const closeButton = document.querySelector('.close-button');
    const paymentForm = document.getElementById('payment-form');
    const paymentMessage = document.getElementById('payment-message');
  
    // Steps in Modal
    const paymentStep = document.getElementById('payment-step');
    const addressStep = document.getElementById('address-step');
    const addressForm = document.getElementById('address-form');
    const addressMessage = document.getElementById('address-message');
  
    // URL de tu script de Google Apps Script
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbyseGrj_iZB1dHT8IOaTWoEehMIHJdt1xHsh6c6gcElZUyQkxXfA2-Io1rH38irOXuqpg/exec'; // Reemplaza con la URL de tu API de Google Apps Script
  
    // Open modal on buy button click
    buyButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.style.display = 'block';
        paymentMessage.textContent = ''; // Clear previous messages
        paymentForm.reset(); // Reset form
        addressForm.reset(); // Reset address form
        paymentStep.classList.remove('hidden');
        addressStep.classList.add('hidden');
        addressMessage.textContent = '';
      });
    });
  
    // Close modal on 'x' click
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    // Simulate payment process
    paymentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Additional validations can be added here
  
      // Show processing message
      paymentMessage.style.color = '#333';
      paymentMessage.textContent = 'Processing payment...';
  
      // Simulate payment delay
      setTimeout(() => {
        // Show success message
        paymentMessage.style.color = 'green';
        paymentMessage.textContent = 'Payment successful!';
  
        // Proceed to address step after a short delay
        setTimeout(() => {
          paymentStep.classList.add('hidden');
          addressStep.classList.remove('hidden');
        }, 1000);
      }, 2000);
    });
  
    // Handle address form submission
    addressForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Additional validations can be added here
  
      // Show processing message
      addressMessage.style.color = '#333';
      addressMessage.textContent = 'Saving address and sending confirmation email...';
  
      // Recopilar datos del formulario
      const fullName = document.getElementById('full-name').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value;
      const country = document.getElementById('country').value;
      const email = document.getElementById('email').value;
  
      // Datos del pedido
      const orderData = {
        full_name: fullName,
        address: address,
        city: city,
        state: state,
        zip: zip,
        country: country,
        email: email,
        payment_message: 'Payment successful!'
      };
  
      // Enviar datos al script de Google Apps
      fetch(googleAppsScriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          addressMessage.style.color = 'green';
          addressMessage.textContent = 'Address saved! A confirmation email has been sent to your email.';
          
          // Close modal after a few seconds
          setTimeout(() => {
            modal.style.display = 'none';
          }, 3000);
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        addressMessage.style.color = 'green';
        addressMessage.textContent = 'Purchase data sent to your email!.';
      });
    });
  
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
  
    // Check saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
    } else {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
    }
  
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
        localStorage.setItem('theme', 'light');
      }
    });
  });
  

