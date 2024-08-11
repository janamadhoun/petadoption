document.addEventListener('DOMContentLoaded', function() {

    function validateFindForm(form) {
        const selects = form.querySelectorAll('select');
        let isValid = true;
        let errorMessage = '';

        // Validate selects
        selects.forEach(select => {
            if (select.value.trim() === '' || select.value === 'Doesnt Matter') {
                isValid = false;
                errorMessage += `Please select an option for ${select.previousElementSibling.textContent}.\n`;
            }
        });

        // Validate gender checkboxes
        const genderCheckboxes = form.querySelectorAll('input[name="catGender"], input[name="dogGender"]');
        if (![...genderCheckboxes].some(checkbox => checkbox.checked)) {
            isValid = false;
            errorMessage += 'Please select at least one gender preference.\n';
        }

        // Validate preferences checkboxes
        const preferencesCheckboxes = form.querySelectorAll('input[name="catGetAlong[]"], input[name="dogGetAlong[]"]');
        if (![...preferencesCheckboxes].some(checkbox => checkbox.checked)) {
            isValid = false;
            errorMessage += 'Please select at least one preference for getting along with.\n';
        }

        if (!isValid) {
            alert(errorMessage);
        }

        return isValid;
    }

    // Attach event listeners to find forms
    const findCatForm = document.getElementById('findCatForm');
    const findDogForm = document.getElementById('findDogForm');

    if (findCatForm) {
        findCatForm.addEventListener('submit', function(event) {
            if (!validateFindForm(findCatForm)) {
                event.preventDefault();
            }
        });
    }

    if (findDogForm) {
        findDogForm.addEventListener('submit', function(event) {
            if (!validateFindForm(findDogForm)) {
                event.preventDefault();
            }
        });
    }
});
