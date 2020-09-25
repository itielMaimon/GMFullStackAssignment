import React, { useState, useEffect } from "react";
import "./Table.css";

const Table = ({ rides }) => {
  const itemsPerPage = 140;

  const [ridesIndex, setRidesIndex] = useState(0);
  const [currentRides, setCurrentRides] = useState([]);
  const [sortOrder, setSortOrder] = useState(false);

  useEffect(() => {
    console.log(ridesIndex);
    console.log(currentRides);
  }, [currentRides]);

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

  const onSortClick = (property) => {
    if (!sortOrder) {
      property = "-" + property;
    }
    setCurrentRides([...currentRides.sort(dynamicSort(property))]);
    setSortOrder(!sortOrder);
  };

  const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  return (
    <div>
      <table className="ui celled padded table">
        <thead>
          <tr>
            <th>
              <div className="ui column grid">
                <div className="column">Id</div>
                <i
                  onClick={() => onSortClick("id")}
                  className={`${sortOrder ? "up" : "down"} chevron icon column`}
                ></i>
              </div>
            </th>
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
        <tbody>{currentRides.map((ride) => renderRow(ride))}</tbody>
        <tfoot>
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
                      rides.slice(newIndex, newIndex + itemsPerPage)
                    );
                  }}
                >
                  <i className="left chevron icon"></i>
                </a>
                <a
                  className="icon item"
                  onClick={() => {
                    let newIndex = ridesIndex;
                    if (ridesIndex < rides.length - itemsPerPage) {
                      newIndex += itemsPerPage;
                      setRidesIndex(newIndex);
                    }

                    // I case of rides lengtn not divided by itemsPerPage
                    if (newIndex + itemsPerPage > rides.length) {
                      setCurrentRides(rides.slice(newIndex, rides.length));
                    } else {
                      setCurrentRides(
                        rides.slice(newIndex, newIndex + itemsPerPage)
                      );
                    }
                  }}
                >
                  <i className="right chevron icon"></i>
                </a>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
