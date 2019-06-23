import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import ValidateCreateLink from '../Auth/validateCreateLink';

import {FirebaseContext} from '../../firebase';

const INITAL_STATE = {
  description: '',
  url: ''
}

function CreateLink(props) {
  const {firebase, user} = React.useContext(FirebaseContext);
  const {handleSubmit, handleChange, handleBlur, values, errors} = useFormValidation(INITAL_STATE, ValidateCreateLink, handleCreateLink);
  
  function handleCreateLink() {
    if (!user) {
      props.history.push('/login');
    } else {
      //user is authed
      const {url, description} = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        votes: [],
        comments: [],
        created: Date.now()
      }
      //push the newLink obj to firebase
      firebase.db.collection('links').add(newLink);
      props.history.push('/');
    }
  }

  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input 
      onChange={handleChange}
      value={values.description}
      onBlur={handleBlur}
      name="description" 
      placeholder="a description for your link"
      autoComplete="off"
      type="text"
      className= { errors.description && 'error-input'}
      />
      {errors.description && <p className='error-text'>{errors.description}</p>}
      <input 
      onChange={handleChange}
      value={values.url}
      onBlur={handleBlur}
      name="url" 
      placeholder="this is the url for your link"
      autoComplete="off"
      type="url"
      className= { errors.url && 'error-input'}
      />
      {errors.url && <p className='error-text'>{errors.url}</p>}
      <button type="submit"
      className="button"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
