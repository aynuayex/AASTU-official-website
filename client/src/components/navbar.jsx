import { useContext } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import logo1 from "../AASTU Logo 1.jpg";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  return (
    <nav className="bg-white ">
      <img src={logo1} alt="" className="h-48 w-full  " />
      <div className="flex justify-around w-full h-10 bg-gray-200">
        <CustomLink to="/">Home</CustomLink>

        <CustomLink to="/news">News</CustomLink>

        <CustomLink to="/profile">Profile</CustomLink>

        <CustomLink to="/about">About</CustomLink>
        {state ? (
          <CustomLink to="/sign-out">Logout</CustomLink>
        ) : (
          <>
            <CustomLink to="/sign-in">Login</CustomLink>
            <CustomLink to="/sign-up">Register</CustomLink>
          </>
        )}
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <div
      className={
        isActive
          ? "flex justify-center items-center w-16  bg-gray-300"
          : "flex justify-center items-center w-16  bg-gray-400 hover:bg-gray-200"
      }
    >
      <Link
        className="no-underline text-black font-semibold"
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default Navbar;
