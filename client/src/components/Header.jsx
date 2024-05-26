import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div>Mern-auth</div>
        </Link>
        <ul className="flex gap-3 items-center">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>

          {currentUser ? (
            <Link to="/private">
              <img
                src={currentUser.profilePicture}
                alt="image"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <li>SignIn</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
