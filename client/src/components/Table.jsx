import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRides } from "../actions";
import useSortableData from "../hooks/useSortableData";
import FilterPanel from "./FilterPanel";
import "./Table.css";

const Table = ({ filteredItems, fetchRides }) => {
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

  // const itemsPerPage = 140;

  // const [ridesIndex, setRidesIndex] = useState(0);
  // const [currentRides, setCurrentRides] = useState([]);

  const renderHeader = (title, key) => {
    return (
      <th
        className={sortClassName(key)}
        key={key}
        onClick={() => requestSort(key)}
      >
        {truncateString(title, 12)}
        <FilterPanel filterKey={key} />
      </th>
    );
  };

  const renderRow = (ride) => {
    return (
      <tr key={ride.id}>
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

  return (
    <div>
      <table className="ui compact sortable stackable celled table">
        <thead>
          <tr>
            {headers.map((header) => renderHeader(header.title, header.key))}
          </tr>
        </thead>
        <tbody>{items.map((item) => renderRow(item))}</tbody>
        {/* <tfoot> 
          <tr>
            <th colSpan="11">
              <div className="ui right floated pagination menu">
                <a
                  className="icon item"
                  onClick={() => {
                    let newIndex = ridesIndex;
                    if (ridesIndex > 0) {
                      newIndex -= itemsPerPage;
                      setRidesIndex(newIndex);
                    }

                    setCurrentRides(
                      items.slice(newIndex, newIndex + itemsPerPage)
                    );
                  }}
                >
                  <i className="left chevron icon"></i>
                </a>
                <a
                  className="icon item"
                  onClick={() => {
                    let newIndex = ridesIndex;
                    if (ridesIndex < items.length - itemsPerPage) {
                      newIndex += itemsPerPage;
                      setRidesIndex(newIndex);
                    }

                    // I case of rides lengtn not divided by itemsPerPage
                    if (newIndex + itemsPerPage > items.length) {
                      setCurrentRides(items.slice(newIndex, items.length));
                    } else {
                      setCurrentRides(
                        items.slice(newIndex, newIndex + itemsPerPage)
                      );
                    }
                  }}
                >
                  <i className="right chevron icon"></i>
                </a>
              </div>
            </th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filteredItems: state.filteredItems,
  };
};

export default connect(mapStateToProps, { fetchRides })(Table);
