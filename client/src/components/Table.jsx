import React from "react";
import "./Table.css";

const Table = ({ rides }) => {
  const renderRow = (ride) => {
    return (
      <tr key={ride.id}>
        {renderColumn("Id", ride.id)}
        {renderColumn("Vehicle Name", ride.vehicle_name)}
        {renderColumn("Location", ride.location)}
        {renderColumn("Date", ride.date)}
        {renderColumn("Ligtning Conditions", ride.lightning_conditions)}
        {renderColumn("Objective", ride.objective)}
        {renderColumn("Recordings Path", ride.recordings_path)}
        {renderColumn("Road Conditions", ride.road_conditions)}
        {renderColumn("Road Topology", ride.road_topology)}
        {renderColumn("Secenario Name", ride.scenario_name)}
        {renderColumn("Weather", ride.weather)}
      </tr>
    );
  };

  const renderColumn = (label, content) => {
    return (
      <td data-label={label}>
        {content.length > 15 ? (
          <div data-title={content}>{truncate(content)}</div>
        ) : (
          content
        )}
      </td>
    );
  };

  const truncate = (str) => {
    return str.length > 15 ? str.substring(0, 12) + "..." : str;
  };

  return (
    <div className="ui segment">
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Vehicle Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Ligtning Conditions</th>
            <th>Objective</th>
            <th>Recordings Path</th>
            <th>Road Conditions</th>
            <th>Road Topology</th>
            <th>Secenario Name</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>{rides.map((ride) => renderRow(ride))}</tbody>
      </table>
    </div>
  );
};

export default Table;
