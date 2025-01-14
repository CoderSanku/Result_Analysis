import React from "react";
import './Navbar.css';
import Link from "next/link";
function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="clg logo">Logo</div>

        <div className="navcomponents">
          <ul>

            <Link href="./"><li>Home</li></Link>
            <Link href="./AdminDashboard"><li>AdminDashboard</li></Link>
            
            
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
