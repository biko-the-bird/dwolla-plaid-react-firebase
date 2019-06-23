import React from 'react'
import PlaidLink from 'react-plaid-link';
import { BRANDCOLOR } from '../../../constants';

function WithPlaid(props) {

  function handleOnSuccess(token, metadata) {
    // send token to values
    console.log("got token", token, "and met", metadata);
    const data = {
      publicPlaid: token,
      firstName: props.values.firstname,
      lastName: props.values.lastname,
      email: props.values.email,
      businessName: props.values.bizname
    }
    props.handleChange({
      target: {
          name: 'accounts',
          value: metadata.accounts
      }
  })
  props.handleChange({
    target: {
        name: 'publicPlaid',
        value: token
    }
})
    props.nextPage();
    
    //props.history.push('');
  }
  function handleOnExit() {
    // handle the case when your user exits Link
    console.log("exit");
  }

    return (
   <PlaidLink
          clientName="trevi"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="47d8e1a13918b11a85c53b27581a1e"
          onExit={handleOnExit}
          onSuccess={handleOnSuccess}>
          Open Link and connect your bank!
      </PlaidLink>
    
    )
  
}
export default WithPlaid;