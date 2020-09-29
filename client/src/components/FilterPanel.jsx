import React from "react";
import { connect } from "react-redux";
import { addFilter, removeFilter } from "../actions";
import { Dropdown } from "semantic-ui-react";

const FilterPanel = ({ filterKey, items, addFilter, removeFilter }) => {
  const handleChange = ({ target }, key, value) => {
    if (target.checked) {
      target.removeAttribute("checked");
      removeFilter(key, value);
    } else {
      target.setAttribute("checked", true);
      addFilter(key, value);
    }
  };

  const getItemsByKey = (items, key) => {
    return items.map((item) => item[key]);
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return (
    <Dropdown style={{ padding: 0, paddingLeft: 5 }} multiple icon="filter">
      <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
        {/* <Input icon="search" iconPosition="left" className="search" /> */}
        <Dropdown.Divider />
        <Dropdown.Header icon="tags" content={filterKey} />
        <Dropdown.Menu scrolling>
          {[...new Set(getItemsByKey(items, filterKey))].map((item, i) => (
            <Dropdown.Item key={i}>
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  name={item}
                  onClick={(event) => handleChange(event, filterKey, item)}
                />
                <label>{truncateString(item, 15)}</label>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, { addFilter, removeFilter })(
  FilterPanel
);
