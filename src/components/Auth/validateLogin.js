import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default function validateLogin(values) {
    let errors = {}

    //email errrors
    if (!values.phone) {
        errors.phone = "phone required"
    } else if (!parsePhoneNumberFromString(values.phone, 'US')) {
        errors.phone = "invalid phone number"
    }

    //name errors
    if (!values.name) {
        errors.name = "name required" 
    } else if (values.name.length < 3) {
        errors.name = "name must be at least 3 characters"
    }

    //zip errors
    if (!values.zip) {
        errors.zip = "zip code required" 
    } else if (values.zip.length !== 5) {
        errors.zip = "zip code must be at least 5 digits long"
    }

    return errors;

}
