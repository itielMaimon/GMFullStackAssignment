import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div
      onClick={onDismiss}
      className="ui dimmer modals visible active"
      style={{ position: "fixed" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <i onClick={onDismiss} className="close icon"></i>
        <div className="header">{title}</div>
        <div className="scrolling content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
