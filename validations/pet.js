const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePetInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.species = validText(data.species) ? data.species : '';
    data.color = validText(data.color) ? data.color : '';

    if (Validator.isEmpty(data.name)) {
      errors.name = 'Please provide the name of your pet!'
    }

    if (Validator.isEmpty(data.species)) {
      errors.species = 'Please provide the species of your pet!';
    }

    if (Validator.isEmpty(data.color)) {
      errors.color = 'Please provide the color of your pet!';
    }

    if (Validator.isEmpty(data.sex)) {
      errors.sex = 'Please provide the sex of your pet!';
    }

    if (Validator.isEmpty(data.weight)) {
      errors.weight = 'Please provide the weight of your pet!';
    } 

    if (!Validator.isCurrency(data.price)) {
      errors.price = 'Please provide a valid currency value i.e. "20.50"'
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    }
}