import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


import firebaseConfig from './config';



class Firebase { 
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.authVar = app.auth;
        this.storage = app.storage;
        this.db = app.firestore();
        this.user = {};

        this.handleAuthResult = this.handleAuthResult.bind(this);
    }

    /*async register(name, phone, zip) {
        //this function may not actually be in use????
      
          
        const newUser = this.auth.signInWithPhoneNumber()
        console.log("got new user", newUser);
        //const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        return await newUser.user.updateProfile({
            displayName: name,
            zip: zip
        });
    }*/

    //get the data for a user by uid
    async getJobData(uid) {
        return await this.db.collection('Jobs')
        .doc(uid)
        .get()
        .then(doc => {
            console.log("got doc", doc, doc.data());
            if (doc.exists) {
                return {'success': true, data: {...doc.data()}};
            } else {
                return {'success' : false, error: {'message': 'user doc not found'}};
            }
    
        })
        .catch(err => {

            return {'success' : false, error: err};
        })
    }

    //get the data for a user by uid
    async getUserData(uid) {
        return await this.db.collection('Users')
        .doc(uid)
        .get()
        .then(doc => {
            console.log("got doc", doc, doc.data());
            if (doc.exists) {
                return {'success': true, data: {...doc.data()}};
            } else {
                return {'success' : false, error: {'message': 'user doc not found'}};
            }
    
        })
        .catch(err => {

            return {'success' : false, error: err};
        })
    }

    //get a users photo by uid
    async getUserPhoto(uid) {
        console.log('getting photo for', uid);
        var storage = firebase.storage();
        var storageRef = storage.ref(`/`);
        var url = await storageRef.child(uid).getDownloadURL();
        console.log(url, "url");
        return url;
        /*.then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'
            console.log("got url", url, "got url");
            return ({'success': true, url});
            // This can be downloaded directly:
            /*var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
          
          }).catch(function(error) {
              console.log(error, "error getting photos");
              return ({'success': false, error})
            // Handle any errors
          });*/
          

    }


    async login(phone) {
        return await this.auth.signInWithPhoneNumber(phone);
        //return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }

    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }

    handleAuthResult(e) {
        this.user = e.user;
        if (!this.user.displayName) {
           // history.pushState('/completeSignUp');
           window.location.pathname = '/CompleteSignUp';
        } else {
            if (this.props.location.query.forward){
                window.location.pathname = `${this.props.location.query.forward}`;
            } else {
            window.location.pathname = '/';
            }
        }
    }

    getUIConfig() {
        return {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // We will display phone as auth providers.
            signInOptions: [
                this.authVar.PhoneAuthProvider.PROVIDER_ID//.PhoneAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                // Avoid redirects after sign-in.
                signInSuccessWithAuthResult:  this.handleAuthResult
              }
          };
    }

   
}
/*
 
*/


const firebase = new Firebase();

export default firebase;