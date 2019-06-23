import React from 'react';
import {ActType, NameEmailBiz, SelectAccount, Photo,WithPlaid} from './formPages';
import axios from 'axios';

import useFormValidation from '../Auth/useFormValidation';
import validateCompleteSignup from './validateCompleteSignup'
import { FirebaseContext } from '../../firebase';



var INITIAL_STATE = {
    firstname: '',
    lastname: '',
    bizname: '',
    email: '',
    photo: {},
    agreedToTerms: false,
    token: '',
    accounts: [],
    metadata: {},
    SelectAccount: false,
    publicPlaid: false,
  }

  

function CompleteSignup(props) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const {firebase, user} = React.useContext(FirebaseContext);
    const { handleSubmit, handleChange, handleBlur, values, errors} = useFormValidation(INITIAL_STATE, validateCompleteSignup);

    function nextPage() {
        setCurrentPage(currentPage+1);
    }

   

    

   
    
    //special handler for agreement to terms
    function handleAgreeToTerms(e) {
        console.log(e, "terms");

      var elem =  document.getElementById(e.target.id);
          handleChange({
              target: {
                  name: "agreedToTerms",
                  value: (elem.checked ? true : false)
              }
          })
      
    }




    
    //function to post form info to firbase cloud function for proccessing.
    function uploadPlaid() {
        setLoading(true);
        const data = {
            publicPlaid: values.publicPlaid,
            firstName: values.firstname,
            lastName: values.lastname,
            email: values.email,
            businessName: values.bizname,
            plaidAccount: values.SelectAccount,
            firebaseID: user.uid
          }
        axios.post('https://us-central1-dwolla-hooks-firebase.cloudfunctions.net/proccessPlaidUser',
            data).then((res) =>{
                console.log("success", res);
                
                nextPage()
            }).catch(err => {
                console.log(err);
            })
    }

  

//switch to paginate different parts of the form
    function showPage() {
        switch (currentPage) {
            case 1:
                    return (
                        <NameEmailBiz handleChange={handleChange} handleBlur={handleBlur} values={values} errors={errors}  nextPage={nextPage}/>
                       
                    )
            case 2:
                    return (
                        <WithPlaid history={props.history} values={values} nextPage={nextPage} handleChange={handleChange}/>
                    )
            case 3:
                    return (
                        <SelectAccount loading={loading} history={props.history} values={values} nextPage={nextPage} handleAgreeToTerms={handleAgreeToTerms} handleChange={handleChange} uploadPlaid={uploadPlaid}/>
                    )
           
            default:
                        return (<div>success<br/> your account and funding source has been linked. now you can use Trevi!</div>);

        }
    }


    
    return (
        <div className="flex flex-column mt3" style={{textAlign: 'center'}}>
           <h2>Let's Get You Up And Running</h2>
        {showPage()}
        </div>
    )
}

export default CompleteSignup;