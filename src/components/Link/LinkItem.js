import React from "react";
import {Link, withRouter} from 'react-router-dom'
import {getDomain} from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from "../../firebase";

function LinkItem({link, index, showCount, history}) {
  const {firebase, user} = React.useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      //updating a doc in firebase

      //1. we get the ref to the doc from firebase by its id in its collection
      const voteRef = firebase.db.collection('links').doc(link.id);
      
      //callback to get the doc the ref is for this is a async/callback function
      voteRef.get().then(doc => {
        //true if the doc was found
        if (doc.exists) {
          //we get the data for the previous votes
          //dont forget .data() has to be called as a method
          const previousVotes = doc.data().votes;
          const newVote = {
            votedBy: {id: user.uid, name: user.displayName}
          }
          //we put old and new votes together as one 
          const updatedVotes = [...previousVotes, newVote];
          //we post the update to firebase
          voteRef.update({votes: updatedVotes})
        }
      })
     
    }
  }

  function handleDeleteLink() {

      //1. we get the ref to the doc from firebase by its id in its collection
      const linkRef = firebase.db.collection('links').doc(link.id);

      //returns a promise
      linkRef.delete().then(() => {
        console.log(`doc with id ${link.id} deleted`);
      }).catch(err => {
        console.log("error deleting doc", err);
      })
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}</span>}
        <div className="vote-button" onClick={handleVote}>
          ⇧
        </div>
        <div className="ml1">
          {link.description} <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
       
          {link.votes.length} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 ?
              `${link.comments.length} Link comments`
              : "Discuss"
            }
          </Link>
          {postedByAuthUser && (
            <span className="delete-button" onClick={handleDeleteLink}>Delete</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(LinkItem);
