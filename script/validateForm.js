document.addEventListener('DOMContentLoaded', function() {

    function validateForm(event) {
      var user = document.getElementById('user').value;
      var pass = document.getElementById('pass').value;
    
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;
    
      if (!usernameRegex.test(user)) {
        alert('Invalid username.');
      } else if (!passwordRegex.test(pass)) {
        alert('Invalid password. Make your password only consists of letters and numbers and contains at least 1 digit and letter.');
        event.preventDefault();
      } 
    }
    document.getElementById('signup').addEventListener('submit', validateForm);
});