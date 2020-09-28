import React from "react";
import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import history from "../history";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoidm5vdmlrb3Y3NDYiLCJhIjoiY2pramN1bDl1MDY3YjNwcGp3Y2hrazl2NSJ9.ViTSaLLZHr7QxF8zi-SwjA";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the PathLayer
const data = [
  {
    path: [
      [-122.4, 37.7],
      [-122.5, 37.8],
      [-122.6, 37.85],
    ],
    name: "Richmond - Millbrae",
    color: "#ed1c24",
  },
];

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

const renderContent = () => {
  const pathLayer = new PathLayer({
    id: "path-layer",
    data,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: (d) => d.path,
    getColor: (d) => hexToRgb(d.color),
    getWidth: (d) => 5,
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
