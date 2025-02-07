import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div id="navbar" className="navbar">
      NavBar:
      <Link to="/">All-Players</Link>
      <Link to="/new-player">ADD NEW PLAYER</Link>
    </div>
  );
}
//<Link to="/players/:id">SINGLE PLAYER</Link>

export default NavBar;

//
//function Nav() {
//  return (
//    <div id="navbar" className="navbar">
//      <Link to="/">HOME</Link>
//      <Link to="/blue">BLUE</Link>
//      <Link to="/red">RED</Link>
//    </div>
//  );
//}
//
//export default Nav;
