import React from "react";
import ride from "../apis/ride";
import Table from "./Table";

class App extends React.Component {
  state = { rides: [] };

  componentDidMount() {
    this.fetchRides();
  }

  fetchRides = async () => {
    const response = await ride.get(
      "/rides"
      // {
      //   params: {
      //     maxResults: 20,
      //   },
      //}
    );

    console.log(response.data);

    this.setState({ rides: response.data });
  };

  render() {
    return (
      <div
        className="ui container"
        style={{ paddingTop: 30, paddingBottom: 30 }}
      >
        <Table rides={this.state.rides} />
      </div>
    );
  }
}

export default App;
