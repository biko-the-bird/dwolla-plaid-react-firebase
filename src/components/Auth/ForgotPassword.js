import React from "react";
import { FirebaseContext } from "../../firebase";


function ForgotPassword() {
  const {firebase} = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    console.log("atept reset");
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch(err) {
      console.error("error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }
  return (
  <div>
    <input 
    type="email" 
    className="input" 
    placeholder="provide your email"
    onChange={event => setResetPasswordEmail(event.target.value)}
    />
    <div>
    <button className="buttton" onClick={handleResetPassword}>
      Reset Password
    </button>
   </div>
   {isPasswordReset && <p>Check Email to reset password</p>}
   {passwordResetError && <p className="error-text">{passwordResetError}</p>}

    </div>);
}

export default ForgotPassword;
