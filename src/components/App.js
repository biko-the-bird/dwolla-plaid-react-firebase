import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//stripe provider for cc form
import { StripeProvider } from 'react-stripe-elements';

import {STRIPE_KEY} from '../utils/constants';

import CreateLink from './Link/CreateLink';
import Login from './Auth/Login';
import ForgotPassword from "./Auth/ForgotPassword";
import CompleteSignup from './CompleteSignUp';

//static routes
import Terms from './Static/terms';
import Landing from './Static/landing';



import Header from './Header';

import useAuth from './Auth/useAuth';
import firebase,{FirebaseContext} from '../firebase';
import Footer from "./Footer";


function App({history}) {



  const user = useAuth();

  function authListener() {
    //console.log(user, "app user");
    const user = localStorage.getItem('user');
    if (!user){
      return false;

    }
    if (user === undefined || user === 'undefined') {
      return false;
    }
    
    return true;
  }


  const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rest, "rest");
    
    return (
    
    <Route {...rest} render={(props) => (
      authListener() === true
        ? <Component {...props} />
        : <Redirect to={`/login?forward=${rest.location.pathname}`} />
    )} />
  )}
      console.log("loaded trevi 0.1");
  return (
    <BrowserRouter>

  <StripeProvider apiKey={STRIPE_KEY}>
    <FirebaseContext.Provider value={{user, firebase}}>
      <div className="app-container">
        <Header />
        <div className="route-container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/landing" />} />
            <PrivateRoute path="/create" component={CreateLink} />
            <Route path="/login" component={Login} />
            <Route path="/landing" component={Landing}/>
            <PrivateRoute path="/completeSignup" component={CompleteSignup} />
            <Route path="/terms" component={Terms}/>
            <PrivateRoute path="*" component={() => (<div>Not found</div>)} />
          </Switch>
        </div>
        <Footer/>
      </div>
      </FirebaseContext.Provider>
      </StripeProvider>
    </BrowserRouter>
  )
}

export default App;
