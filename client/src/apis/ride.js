import axios from "axios";

export default axios.create({
  baseURL: "https://shielded-hamlet-92028.herokuapp.com",
  //baseURL: "http://localhost:8000",
});
