import React from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

function Header(props) {
  const { user, firebase } = React.useContext(FirebaseContext);
  user && console.log(user, "disp");
  const [actType, setActType] = React.useState('HIRER');

  if (user) {
    firebase.getUserData(user.uid).then(res => {
      console.log(res);
      setActType(res.data.actType);
    })
  }
  

  function handleLogout() {
    firebase.logout();
    localStorage.setItem('user', undefined);
    props.history.push('/login');
  }

  function headerLinks() {
    return (<div></div>);
   
  }

  
  return (
    <div className="header">
      <div className="flex flex-column">
        <div className="flex flex-row">
          <img src="/logo.png" alt="Work2Day Logo" className="logo" />
          <NavLink to="/" className="header-title">
            Starter
          </NavLink>

          {user &&
            <>
              <div className="divider "> | </div>
              {
                user
                &&
                <div className="flex flex-row">
                  <NavLink to={`/user/${user.uid}`} className="header-link">
                  Welcome {user.displayName}
                  </NavLink>
                </div>
              }
            </>
          }

        </div>
        <div className="flex flex-row">
          {user ?
            (headerLinks())
            :

            (<div className="flex flex-row">
              <div className="divider">|</div>
              <NavLink to="/login" className="header-link">
                Login
      </NavLink></div>)
          }

          {user &&
            <>
              <div className="divider ">|</div>
              {
                user
                &&
                <>

                  <div className="header-button" onClick={() => handleLogout()}>
                    Logout
                    </div>
                </>
              }

            </>
          }
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
