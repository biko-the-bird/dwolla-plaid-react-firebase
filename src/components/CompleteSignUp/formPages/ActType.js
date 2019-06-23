import React from "react";
import { user } from "firebase-functions/lib/providers/auth";
import {WORKER, HIRER } from '../../../constants';

function ActType(props) {

  function typeDescriptions() {
    if (props.values.actType === WORKER) {
      return (
        <div className="flex flex-column center">
          <h4>{WORKER}</h4>
          <ul>
            <li>Get Jobs On Your Scedule</li>
            <li>Get Notified Of New Jobs By Text</li>
            <li>Choose The Categories You Want To Work In</li>
          </ul>
        </div>
      )
    } else if (props.values.actType === HIRER) {
      return (
        <div className="flex flex-column center">
          <h4>{HIRER}</h4>
          <ul>
            <li>Hire People To Work For You</li>
            <li>Read Reviews Of Potential Workers</li>
            <li>Select The Workers You Want</li>
          </ul>
        </div>
      )
    }
  }
  return <div className='flex flex-column'> <h3>Account Type</h3>
  <br />
    <button onClick={() => props.setType(WORKER)}>{WORKER}</button>
    <button onClick={() => props.setType(HIRER)}>{HIRER}</button>
    <br/>

    {props.values.actType != '' && typeDescriptions()}
    {props.values.actType != '' && <button onClick={() => props.nextPage()}>Next</button>}
  </div>;
}

export default ActType;
