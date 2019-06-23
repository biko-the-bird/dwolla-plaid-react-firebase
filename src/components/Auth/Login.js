import React from "react";
import { Link } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';

import firebase from '../../firebase';
import useAuth from '../Auth/useAuth';

const INITIAL_STATE = {
  name: "",
  phone: "",
  zip: ""
}

//register form
//login form
function Login(props) {
  const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { name, phone, zip } = values;
   /* try {
      login
        ? await firebase.login(zip)
        : await firebase.register(name, phone, zip);
      props.history.push("/");
    } catch (err) {
      console.log("auth err", err);
      setFirebaseError(err.message);
    }*/

  }

  //redirect user away from login page if they come here while logged in
  function notLoggedIn(view) {

    const user = useAuth();
    if (user) {
      

      console.log("props seac", props.location.search);
      if (props.location.search){
        var f = props.location.search.split("?forward=/");
        console.log(f[1], typeof(f[1]));
        var re = f[1];
        if (!user.displayName) {

        props.history.push('/completeSignup');
        } else {

        props.history.push(re);
        }
      } else {
        if (!user.displayName) {

          props.history.push('/completeSignup');
          } else {

        props.history.push('/');
          }
      }
      return false;
    }
    return true;
  }
  
    console.log(firebase.getUIConfig());
    if (notLoggedIn()) {
      return (
        <div style={{textAlign: 'center'}} className="flex flex-column">
          <h1>Log In</h1>
          <StyledFirebaseAuth uiConfig={firebase.getUIConfig()} firebaseAuth={firebase.auth}/>
          
        </div>
      );
    } else {
      return <></>
    }
  
}

export default Login;