import React from "react";

const styles = {
  inputDiv: {
    margin: "10px"
  },
  requiredErr: {
    float: "left",
    color: "grey"
  }
};

function NameEmailBiz(props) {
  function hasBoth() {
    const hasProps =
      props.values.lastname &&
      props.values.email &&
      props.values.firstname &&
      props.values.bizname;
    const hasErrors =
      props.errors.lastname ||
      props.errors.email ||
      props.errors.firstname ||
      props.errors.bizname;
    if (hasProps && !hasErrors) {
      return true;
    }
    return false;
  }

  return (
    <div className="flex flex-column center">
      {" "}
      <h3>Name And Email</h3>
      <br />
      <div style={styles.inputDiv}>
        <input
          type="text"
          placeholder="firstname"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          name="firstname"
        />

        {props.errors.firstname &&
          (props.errors.firstname.length > 1 ? (
            <>
              <br />
              <p className="error-text">{props.errors.firstname}</p>
            </>
          ) : (
            <p className="error-text" style={styles.requiredErr}>
              {props.errors.firstname}
            </p>
          ))}
      </div>
      <div style={styles.inputDiv}>
        <input
          type="text"
          placeholder="lastname"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          name="lastname"
        />

        {props.errors.lastname &&
          (props.errors.lastname.length > 1 ? (
            <>
              <br />
              <p className="error-text">{props.errors.lastname}</p>
            </>
          ) : (
            <p className="error-text" style={styles.requiredErr}>
              {props.errors.lastname}
            </p>
          ))}
      </div>
      <div style={styles.inputDiv}>
        <input
          type="email"
          placeholder="email"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          name="email"
        />

        {props.errors.email &&
          (props.errors.email.length > 1 ? (
            <>
              <br />
              <p className="error-text">{props.errors.email}</p>
            </>
          ) : (
            <p className="error-text" style={styles.requiredErr}>
              {props.errors.email}
            </p>
          ))}
      </div>
      <div style={styles.inputDiv}>
        <input
          type="text"
          placeholder="business name"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          name="bizname"
        />

        {props.errors.bizname &&
          (props.errors.bizname.length > 1 ? (
            <>
              <br />
              <p className="error-text">{props.errors.bizname}</p>
            </>
          ) : (
            <p className="error-text" style={styles.requiredErr}>
              {props.errors.bizname}
            </p>
          ))}
      </div>
      {hasBoth() && <button onClick={() => props.nextPage()}>Next</button>}
    </div>
  );
}

export default NameEmailBiz;
