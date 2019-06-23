import React from "react";
import { withRouter, NavLink } from 'react-router-dom';

function Footer(props) {

  function goToTerms() {
    props.history.push('/terms');
  }



  return (
    <div >
      <hr/>
      <div className="flex flex-column center" style={{textAlign: 'center'}}>
          <p> Copyright © {new Date().getFullYear()}</p>
          <br/>
          Use of this website constitutes agreement to the <a href="#"><span onClick={goToTerms}>terms and conditions</span></a>
      </div>
    </div>
     
  );
}

export default withRouter(Footer);
