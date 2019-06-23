import React from "react";
import { withRouter} from 'react-router-dom';
import {HIRER, WORKER, BRANDCOLOR} from '../../../constants';


//for adding spinner for loading
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 

function ActTypes(props) {

  function takeClick(act) {
   props.handleChange({
    target: {
        name: 'SelectAccount',
        value: act
    }
})
  }

  function chunkArray(arr, per) {
    var newA = [[]];
    for (var x = 0; x < arr.length; x++){
      var chunk = newA[newA.length - 1];
      if (chunk.length <= per) {
        newA[newA.length -1].push(arr[x]);
      } else {
        newA.push([arr[x]]);
      }
    }
    return newA;
  }

  const rows = chunkArray(props.values.accounts, 3);
  return (
    <div className="flex flex-column mt2" style={{ textAlign: 'center' }}>
      <h2>Select Account To Link</h2>
      {rows.map((row, idx) => {
        return (
          <div  
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            textAlign: 'center'
          }}>
            {row.map(act => {
               return (


            <div class="card" style={{
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              transition: '0.3s',
              width: '40%',
              flex: '0 0 200px',
              margin: '10px',
              border: '1px solid #ccc',
              backgroundColor: (props.values.SelectAccount.name === act.name ? {BRANDCOLOR} : 'white') 
              }}  onClick={() => {takeClick(act)}}>
              <div class="container" style={{padding: '2px 16px'}}>
                <h4><b>{act.name}</b></h4> 
                <p>{act.type}</p> 
              </div>
            </div>
             
                )
            })}
          </div>
        )
        
       
      })}
    </div>
  )
}



function SelectAccount(props) {
  const { values, jobTypeHandler, handleAgreeToTerms, checkLastStep, setLoading } = props;

  console.log(values, values.accounts);

  

  return (
    <div className="flex flex-column" style={{ textAlign: 'center' }}>Last Step
  
        <ActTypes values={values}  handleChange={props.handleChange}/>

{props.values.SelectAccount &&
  (
    <p>You've selected: <br/>
    <b>{props.values.SelectAccount.name}</b>
    </p>
  )}

      <p>____________________</p>
      <div style={{ margin: '10px' }} >
        <input type="checkbox" value='agreedToTerms' name='agreedToTerms' id='agreedToTerms' onClick={(e) => handleAgreeToTerms(e)} />
        <label for='agreedToTerms'>I agree to the <a href="#" onClick={() => window.open(
          '/terms',
          '_blank'
        )}>Terms and Conditions</a></label>
      </div>
      

        <div>
        {(props.values.SelectAccount && props.values.agreedToTerms) &&

          (props.loading ?
            <div>
               <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={BRANDCOLOR}
                loading={props.loading}
              />
            </div>
            :
            <button onClick={() => props.uploadPlaid()}>Submit</button>

            )
          }    
          </div>
      
    </div>
  );
}

export default withRouter(SelectAccount);
