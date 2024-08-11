document.addEventListener('DOMContentLoaded', function() {

     //check the give away forms
     function validateGiveAwayForm(form) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // valid email format
        let isValid = true;
        let errorMessage = '';
      
        // check if either dog or cat details are filled out
        const dogFieldset = form.querySelector('#dog-giveaway');
        const catFieldset = form.querySelector('#cat-giveaway');
      
        const dogSelects = dogFieldset.querySelectorAll('select');
        const dogGenderRadios = dogFieldset.querySelectorAll('input[name="dogGender"]');
        const dogSuitableRadios = dogFieldset.querySelectorAll('input[name="dog_suitable"]');
        const dogTextInputs = dogFieldset.querySelectorAll('input[type="text"]');
        const dogCheckboxes = dogFieldset.querySelectorAll('input[type="checkbox"]');
        const dogDetailsFilled = Array.from(dogTextInputs).some(input => input.value.trim() !== '');
      
        const catSelects = catFieldset.querySelectorAll('select');
        const catGenderRadios = catFieldset.querySelectorAll('input[name="catGender"]');
        const catSuitableRadios = catFieldset.querySelectorAll('input[name="cat_suitable"]');
        const catTextInputs = catFieldset.querySelectorAll('input[type="text"]');
        const catCheckboxes = catFieldset.querySelectorAll('input[type="checkbox"]');
        const catDetailsFilled = Array.from(catTextInputs).some(input => input.value.trim() !== '');
      
        // check if either dog or cat details are filled out
        if (!dogDetailsFilled && !catDetailsFilled) {
          isValid = false;
          errorMessage += 'Please provide details for either the dog or the cat.\n';
        }
      
        // check if all fields are filled if dog is filled
        if (dogDetailsFilled) {
          dogSelects.forEach(select => {
            if (select.value.trim() === '') {
              isValid = false;
              errorMessage += `Please select an option for ${select.previousElementSibling.textContent.trim()} (Dog).\n`;
            }
          });
      
          if (![...dogGenderRadios].some(radio => radio.checked)) {
            isValid = false;
            errorMessage += 'Please select a gender for the dog.\n';
          }
      
          if (![...dogSuitableRadios].some(radio => radio.checked)) {
            isValid = false;
            errorMessage += 'Please indicate if the dog is suitable for a family with children.\n';
          }
      
          if (![...dogCheckboxes].some(checkbox => checkbox.checked)) {
            isValid = false;
            errorMessage += 'Please select at least one option for "Gets along with" (Dog).\n';
          }
      
          dogTextInputs.forEach(input => {
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (input.value.trim() === '') {
              isValid = false;
              errorMessage += `Please provide details for ${label ? label.textContent.trim() : 'the input'} (Dog).\n`;
            }
          });
        }
      
        // check if all fields are filled if cat is filled
        if (catDetailsFilled) {
          catSelects.forEach(select => {
            if (select.value.trim() === '') {
              isValid = false;
              errorMessage += `Please select an option for ${select.previousElementSibling.textContent.trim()} (Cat).\n`;
            }
          });
      
          if (![...catGenderRadios].some(radio => radio.checked)) {
            isValid = false;
            errorMessage += 'Please select a gender for the cat.\n';
          }
      
          if (![...catSuitableRadios].some(radio => radio.checked)) {
            isValid = false;
            errorMessage += 'Please indicate if the cat is suitable for a family with children.\n';
          }
      
          if (![...catCheckboxes].some(checkbox => checkbox.checked)) {
            isValid = false;
            errorMessage += 'Please select at least one option for "Gets along with" (Cat).\n';
          }
      
          catTextInputs.forEach(input => {
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (input.value.trim() === '') {
              isValid = false;
              errorMessage += `Please provide details for ${label ? label.textContent.trim() : 'the input'} (Cat).\n`;
            }
          });
        }
      
        // check contact info fields
        const contactFieldset = form.querySelector('#contactinfo');
        const contactInputs = contactFieldset.querySelectorAll('input[type="text"]');
        contactInputs.forEach(input => {
          const label = form.querySelector(`label[for="${input.id}"]`);
          if (input.value.trim() === '') {
            isValid = false;
            errorMessage += `Please provide your ${label ? label.textContent.trim() : 'contact information'}.\n`;
          }
        });
      
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput && !emailPattern.test(emailInput.value.trim())) {
          isValid = false;
          errorMessage += 'Please enter a valid email address.\n';
        }
      
        if (!isValid) {
          alert(errorMessage);
        }
      
        return isValid;
      }
      

    // attach event listeners to the giveaway form
    const giveawayForm = document.getElementById('giveaway');
    if (giveawayForm) {
        giveawayForm.addEventListener('submit', function(event) {
            if (!validateGiveAwayForm(giveawayForm)) {
                event.preventDefault(); 
            }
        });
    }

});
// document.addEventListener('DOMContentLoaded', function() {

//   // Check the give away forms
//   function validateGiveAwayForm(form) {
//       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
//       let isValid = true;
//       let errorMessage = '';

//       // Check if either dog or cat details are filled out
//       const dogFieldset = form.querySelector('#dog-giveaway');
//       const catFieldset = form.querySelector('#cat-giveaway');
//       const petTypeInput = form.querySelector('#petType');

//       const dogSelects = dogFieldset.querySelectorAll('select');
//       const dogGenderRadios = dogFieldset.querySelectorAll('input[name="dogGender"]');
//       const dogSuitableRadios = dogFieldset.querySelectorAll('input[name="dog_suitable"]');
//       const dogTextInputs = dogFieldset.querySelectorAll('input[type="text"]');
//       const dogCheckboxes = dogFieldset.querySelectorAll('input[type="checkbox"]');
//       const dogDetailsFilled = Array.from(dogTextInputs).some(input => input.value.trim() !== '');

//       const catSelects = catFieldset.querySelectorAll('select');
//       const catGenderRadios = catFieldset.querySelectorAll('input[name="catGender"]');
//       const catSuitableRadios = catFieldset.querySelectorAll('input[name="cat_suitable"]');
//       const catTextInputs = catFieldset.querySelectorAll('input[type="text"]');
//       const catCheckboxes = catFieldset.querySelectorAll('input[type="checkbox"]');
//       const catDetailsFilled = Array.from(catTextInputs).some(input => input.value.trim() !== '');

//       // Check if either dog or cat details are filled out
//       if (!dogDetailsFilled && !catDetailsFilled) {
//           isValid = false;
//           errorMessage += 'Please provide details for either the dog or the cat.\n';
//       }

//       // Check if all fields are filled if dog is filled
//       if (dogDetailsFilled) {
//           petTypeInput.value = 'Dog';
//           dogSelects.forEach(select => {
//               if (select.value.trim() === '') {
//                   isValid = false;
//                   errorMessage += `Please select an option for ${select.previousElementSibling.textContent.trim()} (Dog).\n`;
//               }
//           });

//           if (![...dogGenderRadios].some(radio => radio.checked)) {
//               isValid = false;
//               errorMessage += 'Please select a gender for the dog.\n';
//           }

//           if (![...dogSuitableRadios].some(radio => radio.checked)) {
//               isValid = false;
//               errorMessage += 'Please indicate if the dog is suitable for a family with children.\n';
//           }

//           if (![...dogCheckboxes].some(checkbox => checkbox.checked)) {
//               isValid = false;
//               errorMessage += 'Please select at least one option for "Gets along with" (Dog).\n';
//           }

//           dogTextInputs.forEach(input => {
//               const label = form.querySelector(`label[for="${input.id}"]`);
//               if (input.value.trim() === '') {
//                   isValid = false;
//                   errorMessage += `Please provide details for ${label ? label.textContent.trim() : 'the input'} (Dog).\n`;
//               }
//           });
//       }

//       // Check if all fields are filled if cat is filled
//       if (catDetailsFilled) {
//           petTypeInput.value = 'Cat';
//           catSelects.forEach(select => {
//               if (select.value.trim() === '') {
//                   isValid = false;
//                   errorMessage += `Please select an option for ${select.previousElementSibling.textContent.trim()} (Cat).\n`;
//               }
//           });

//           if (![...catGenderRadios].some(radio => radio.checked)) {
//               isValid = false;
//               errorMessage += 'Please select a gender for the cat.\n';
//           }

//           if (![...catSuitableRadios].some(radio => radio.checked)) {
//               isValid = false;
//               errorMessage += 'Please indicate if the cat is suitable for a family with children.\n';
//           }

//           if (![...catCheckboxes].some(checkbox => checkbox.checked)) {
//               isValid = false;
//               errorMessage += 'Please select at least one option for "Gets along with" (Cat).\n';
//           }

//           catTextInputs.forEach(input => {
//               const label = form.querySelector(`label[for="${input.id}"]`);
//               if (input.value.trim() === '') {
//                   isValid = false;
//                   errorMessage += `Please provide details for ${label ? label.textContent.trim() : 'the input'} (Cat).\n`;
//               }
//           });
//       }

//       // Check contact info fields
//       const contactFieldset = form.querySelector('#contactinfo');
//       const contactInputs = contactFieldset.querySelectorAll('input[type="text"]');
//       contactInputs.forEach(input => {
//           const label = form.querySelector(`label[for="${input.id}"]`);
//           if (input.value.trim() === '') {
//               isValid = false;
//               errorMessage += `Please provide your ${label ? label.textContent.trim() : 'contact information'}.\n`;
//           }
//       });

//       const emailInput = form.querySelector('input[name="ownerEmail"]');
//       if (emailInput && !emailPattern.test(emailInput.value.trim())) {
//           isValid = false;
//           errorMessage += 'Please enter a valid email address.\n';
//       }

//       if (!isValid) {
//           alert(errorMessage);
//       }

//       return isValid;
//   }

//   // Attach event listeners to the giveaway form
//   const giveawayForm = document.getElementById('giveawayForm');
//   if (giveawayForm) {
//       giveawayForm.addEventListener('submit', function(event) {
//           if (!validateGiveAwayForm(giveawayForm)) {
//               event.preventDefault(); 
//           }
//       });
//   }

// });
