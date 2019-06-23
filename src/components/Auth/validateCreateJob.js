import {PAYPERHOUR, FLATERATE} from '../../constants';

export default function validateCreateJob(values) {
    let errors = {}

    //jobName errrors
    if (!values.jobName) {
        errors.jobName = "jobName required";
    } else if (values.jobName.length < 6) {
        errors.jobName = "jobName must be at least 10 characters";
    }

     //jobDesc errrors
     if (!values.jobDesc) {
        errors.jobDesc = "jobDesc required";
    } else if (values.jobDesc.length < 15) {
        errors.jobDesc = "jobDesc must be at least 15 characters";
    }

     //numOfWorkers errrors
     if (!values.numOfWorkers) {
        errors.numOfWorkers = "numOfWorkers required";
    } else if (!Number(values.numOfWorkers.length)) {
        errors.numOfWorkers = "numOfWorkers must be at least 1 characters";
    }

     //jobType errors

     //something is wrong with this it is true even where there is a jobType?
     /*if (values.jobType === '') {
         console.log(values.jobType, 'JIB TYOE ERRFOUND',  `bool ${values.jobType == ''}`);
        errors.jobType = "jobType required";
    } */

    //payType hourly errrors
    if (!values.payType) {
        errors.payType = "payType required";
    } else 
    
    //hourly errors
    if (!values.rate) {
        errors.rate = "rate required";
    } else if (!Number(values.rate)) {
        errors.rate = "rate must be a number (i.e. 10 or 16.75)"
    }

    //zip errors
    if (!values.zip) {
        errors.zip = "zip code required";
    } else if (values.zip.length != 5) {
        errors.zip = "zip code must be 5 digits long";
    } else if (!Number(values.zip)) {
        errors.zip = "zip code must be numbers";
    }

    //hours errors
    if (!values.hours) {
        errors.hours = "hours required";
    } else if (!Number(values.hours)) {
        errors.hours = "hours must be a number";
    } 


    return errors;
}
