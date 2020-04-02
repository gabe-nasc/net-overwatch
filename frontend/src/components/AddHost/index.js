import React, { useState } from "react";
import axios from "axios";
import arrow from "./arrow.svg";

import "./styles.css";

function AddHost() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ipAddress: url,
      name: name,
      description: desc
    };
    const response = await axios.post("http://localhost:3001/api/hosts", data);
    console.log(response.data);
    setUrl("");
    setName("");
    setDesc("");
  }
  return (
    <div id="form-container">
      <h1>Add a new IP Address: </h1>
      <form onSubmit={handleSubmit}>
        <div id="upper-form-row">
          <input
            type="text"
            name="hostUrl"
            id="inputHost"
            placeholder="IP Address"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <input
            type="text"
            name="hostName"
            id="inputName"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div id="lower-form-row">
          <input
            type="text"
            name="hostDesc"
            id="inputDescription"
            placeholder="Description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <input
          type="image"
          src={arrow}
          border="0"
          alt="Submit"
          id="submitArrow"
        />
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
}

export default AddHost;
