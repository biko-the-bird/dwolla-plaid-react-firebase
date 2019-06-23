export default function validateCompleteSignup(values) {
    let errors = {}

    //firstname errors
    if (!values.firstname) {
        errors.firstname = "*" 
    } else if (values.firstname.length < 3) {
        errors.firstname = "firstname must be at least 3 characters"
    }
      //lastname errors
      if (!values.lastname) {
        errors.lastname = "*" 
    } else if (values.lastname.length < 3) {
        errors.lastname = "lastname must be at least 3 characters"
    }

    //bizname errors
    if (!values.bizname) {
        errors.bizname = "*" 
    } else if (values.bizname.length < 3) {
        errors.bizname = "bizname must be at least 3 characters"
    }

    //email errors
    if (!values.email) {
        errors.email = "*" 
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "a valid email is required"
    }

    return errors;
}
