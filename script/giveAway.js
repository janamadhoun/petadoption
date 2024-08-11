document.getElementById('giveawayForm').addEventListener('submit', function(event) {
    const dogFields = document.querySelectorAll('#dog-giveaway input, #dog-giveaway select');
    const catFields = document.querySelectorAll('#cat-giveaway input, #cat-giveaway select');
    
    let isDogForm = false;
    let isCatForm = false;
    
    // Check if dog fields are filled
    dogFields.forEach(field => {
        if (field.value && field.value !== 'Doesnt Matter' && field.type !== 'checkbox') {
            isDogForm = true;
        }
    });
    
    // Check if cat fields are filled
    catFields.forEach(field => {
        if (field.value && field.value !== 'Doesnt Matter' && field.type !== 'checkbox') {
            isCatForm = true;
        }
    });
    
    if (isDogForm && !isCatForm) {
        petTypeInput.value = 'Dog';
    } else if (isCatForm && !isDogForm) {
        petTypeInput.value = 'Cat';
    } else {
        event.preventDefault();
        alert('Please fill out either the dog or cat details.');
    }
});