import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Modal from "./Modal";

const renderActions = () => {
  return (
    <React.Fragment>
      <Link to="/" className="ui button">
        Close
      </Link>
    </React.Fragment>
  );
};

const renderContent = () => {
  return <div>"Are you sure you want to delete this stream?";</div>;
};

const RidePreview = () => {
  return (
    <Modal
      title="Ride Preview"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

export default RidePreview;
