import React from "react";
import Fileselector from "./Fileselector";
import "./page.css";
function page() {
  return (
    <>
      <div className="maindiv">
        <div className="header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="fileselector">
          <Fileselector></Fileselector>
        </div>

      </div>
      <div className="footer">Footer Section</div>
    </>
  );
}

export default page;
