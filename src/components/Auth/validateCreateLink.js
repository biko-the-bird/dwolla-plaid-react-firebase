export default function validateCreateLink(values) {
    let errors = {}

    //description errrors
    if (!values.description) {
        errors.description = "description required";
    } else if (values.description.length < 10) {
        errors.description = "Description must be at least 10 characters";
    }

    //url errors
    if (!values.url) {
        errors.url = "url required" 
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "Url must be valid"
    }

    return errors;
}
