import React from "react";
import cx from "classnames";
import classes from "./Modal.module.css";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? cx(classes.modal, classes.bodyOfContainer)
    : cx(classes.modal, classes.display_none);

  return (
    <div className={showHideClassName}>
      <div className={classes.cookiesContent}>
        <button className={classes.button_close} onClick={handleClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
