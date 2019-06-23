import React from "react";
import firebase from '../../firebase';
function useAuth() {
    const [authUser, setAuthUser] = React.useState(null);
    //listener 
    React.useEffect(() => {
        //this is a firebase listener
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {

            if (user) {
                setAuthUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                setAuthUser(null);
            }
        })
        //unmounting the auth listener
        return () => unsubscribe();
    }, []);

    return authUser;
}

export default useAuth;
