import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRides } from "../actions";
import useSortableData from "../hooks/useSortableData";
import FilterPanel from "./FilterPanel";
import history from "../history";
import "./Table.css";

const Table = ({ allItems, filteredItems, fetchRides }) => {
  const { items, requestSort, sortConfig } = useSortableData(filteredItems);
  const headers = [
    { title: "Id", key: "id" },
    { title: "Vehicle Name", key: "vehicle_name" },
    { title: "Location", key: "location" },
    { title: "Date", key: "date" },
    { title: "Lightning Conditions", key: "lightning_conditions" },
    { title: "Objective", key: "objective" },
    { title: "Recordings Path", key: "recordings_path" },
    { title: "Road Conditions", key: "road_conditions" },
    { title: "Road Topology", key: "road_topology" },
    { title: "Scenario Name", key: "scenario_name" },
    { title: "Weather", key: "weather" },
  ];

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  const renderHeader = (title, key) => {
    return (
      <th
        className={sortClassName(key)}
        key={key}
        onClick={() => requestSort(key)}
      >
        {truncateString(title, 10)}
        <FilterPanel filterKey={key} />
      </th>
    );
  };

  const renderRow = (ride) => {
    return (
      <tr onClick={() => history.push(`/rides/${ride.id}`)} key={ride.id}>
        {headers.map((header, i) => {
          return renderColumn(ride.id + i, header.title, ride[header.key]);
        })}
      </tr>
    );
  };

  const renderColumn = (id, label, content) => {
    return (
      <td key={id} data-label={label}>
        {content.length > 10 ? (
          <div data-title={content}>{truncateString(content, 10)}</div>
        ) : (
          content
        )}
      </td>
    );
  };

  const sortClassName = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name
      ? `sorted ${sortConfig.direction}`
      : undefined;
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  if (!Array.isArray(allItems) || !allItems.length) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading Table</div>
      </div>
    );
  }

  return (
    <div>
      <table className="ui compact sortable stackable celled table">
        <thead>
          <tr>
            {headers.map((header) => renderHeader(header.title, header.key))}
          </tr>
        </thead>
        <tbody>{items.map((item) => renderRow(item))}</tbody>
      </table>
      {items.length === 0 ? (
        <div className="ui center aligned segment">No items found</div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allItems: state.items,
    filteredItems: state.filteredItems,
  };
};

export default connect(mapStateToProps, { fetchRides })(Table);
