import React from "react";
import { FirebaseContext } from "../../firebase";

import LinkItem from './LinkItem';

function LinkList(props) {
  const {firebase, user} = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);

//listner hook to check when firebase is mounted
  React.useEffect(() => {
    getLinks()
    //console.log("firebase user", firebase.user);
  })

  function getLinks() {
    firebase.db.collection('links').onSnapshot(handleSnapshot); //like .get() but its a listener so it pulls in new links as they are posted
    //.get() //gets returns a promise with all of our links from the collections, its async

  }

  function handleSnapshot(snapshot) {
    //snapshot is array of docs refes from the collection
    //iterate over the docs array to pull the data you want.
    //data stored in the document is accesible from the method .data()
    //below we just spread all the data in our return object. (WE WANT IT ALL)
    const links = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setLinks(links);
    //console.log(links);
  }


  if (!user && !localStorage.getItem('user')) {
    props.history.push('/login');
  }
  return (
    <div >LinkList
      {links.map((link, idx) => (
          <LinkItem key={link.id} showCount={true} link={link} index={idx+1}/>
        ))}

    </div>
  );
}

export default LinkList;
