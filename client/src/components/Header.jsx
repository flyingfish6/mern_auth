import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="bg-slate-200">
      <div className=" flex justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <div>Mern-auth</div>
        </Link>
        <ul className="flex gap-3">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
