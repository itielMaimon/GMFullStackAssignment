import React from "react";
import { connect } from "react-redux";
import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { fetchCoordinates } from "../actions";
import history from "../history";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoidm5vdmlrb3Y3NDYiLCJhIjoiY2pramN1bDl1MDY3YjNwcGp3Y2hrazl2NSJ9.ViTSaLLZHr7QxF8zi-SwjA";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -83.06553,
  latitude: 42.5167,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

const renderContent = (coordinates, id) => {
  if (coordinates.length === 0) {
    return (
      <div style={{ height: "50vh" }} class="ui segment">
        <div class="ui active dimmer">
          <div class="ui loader"></div>
        </div>
      </div>
    );
  }

  // Data to be used by the PathLayer
  const data = [
    {
      path: coordinates,
      name: `Ride ${id}`,
      color: "#4f551a",
    },
  ];

  const pathLayer = new PathLayer({
    id: "path-layer",
    data,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: (d) => d.path,
    getColor: (d) => hexToRgb(d.color),
    getWidth: (d) => 2,
  });

  return (
    <div style={{ height: "100vh" }}>
      <DeckGL
        style={{ top: "60px" }}
        height="78%"
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[pathLayer]}
        getTooltip={({ object }) => object && object.name}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </div>
  );
};

const renderActions = () => {
  return (
    <React.Fragment>
      <Link to="/" className="ui button">
        Close
      </Link>
    </React.Fragment>
  );
};

const RidePreview = ({ coordinates, match, fetchCoordinates }) => {
  // Getting the id from the url params.
  const { id } = match.params;

  // Check if the coordinates have already been fetched (same coordinates for all rides).
  if (!Array.isArray(coordinates) || !coordinates.length) {
    fetchCoordinates(id);
  }

  return (
    <Modal
      title="Ride Preview"
      content={renderContent(coordinates, id)}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
  };
};

export default connect(mapStateToProps, { fetchCoordinates })(RidePreview);
