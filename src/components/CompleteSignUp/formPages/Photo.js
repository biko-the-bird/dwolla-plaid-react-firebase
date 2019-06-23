import React from "react";
import {BRANDCOLOR} from '../../../constants';

const styles = {
  div: {
    backgroundColor: BRANDCOLOR,
    color: 'white',
    borderStyle: 'dotted',
    borderColor: 'black',
    border: '20px',
    height: '55px',
    borderRadius: '10px'
  },
  p: {
    margin: '5px',
    textAlign: 'center',
  },
  img: {
    width: '200px',
    height: '200px'
  }
};

function Photo(props) {

  function fileInputClick() {
    document.getElementById("photoFileInput").click();
  }
  const {values, fileHandler, nextPage} = props;
  return (
    <div className="flex flex-column center">
      <input style={{ display: 'none' }} type="file" accept="image/*"
        onChange={fileHandler} id="photoFileInput" />
      <div style={styles.div} className="center" onClick={() => { fileInputClick() }}><p>📂<br />{values.photo.name ? values.photo.name : 'Click To Add Image'}</p></div>
      {values.photo.name && <img
        src={props.values.photo.data}
        style={styles.img}
        alt="Error uploading Image"
      />
      }
      <br />
      {values.photo.name &&
        <button onClick={() => nextPage()}>Next</button>
      }
    </div>
  )



}

export default Photo;
