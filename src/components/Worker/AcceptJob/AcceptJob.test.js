import React from 'react';
import AcceptJob from './AcceptJob';
import renderer from 'react-test-renderer';


import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { FirebaseContext } from '../../../firebase';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    
    <BrowserRouter>
<AcceptJob/></BrowserRouter>,
  );
  let {user} = React.useContext(FirebaseContext);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  console.log("user test");
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
