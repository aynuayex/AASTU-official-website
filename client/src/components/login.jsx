import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(<FaEye />);
  const [success, setSuccess] = useState("");

const {state, dispatch} = useContext(UserContext);

  function handleToggle(e) {
    if (inputType === "password") {
      setInputType("text");
      setIcon(FaEyeSlash);
    } else {
      setInputType("password");
      setIcon(FaEye);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const user = { email, password };
    console.log(`email: ${email}, password: ${password}`);
    axios
      .post("http://localhost:5000/student/login", user)
      .then((res) =>{
        dispatch({type: "USER",payload: true});
      setSuccess(`welcome ${res.data.user} you are successfully Logged in!`);
      }
      )
      .catch((err) => {
        //console.log(`ERROR is ${err}`);
        setSuccess("Incorrect password or email");
      });
  }

  if(state){
   return <Navigate to="/profile" state={{mes: success }} />
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <div className="text-center text-lg text-red-500 font-semibold">{success}</div>
      <div className="h-auto w-5/12 border mx-auto rounded-2xl mt-3 ">
        <div className="h-2 bg-indigo-400 rounded-t-2xl mb-5 "></div>
        <div className="font-bold text-2xl text-center">Sign In</div>
        <div className="px-16">
          <div className="mt-5 ">
            <label htmlFor="email" className="block font-semibold  ">
              Email address
            </label>
            <input
              type="email"
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              id="email"
              required
            />
          </div>

          <div className="relative ">
            <label
              htmlFor="pass"
              className="block font-semibold mt-5"
            >
              Password
            </label>
            <input
              type={inputType}
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              id="pass"
              required
            />
            <span className="absolute top-9 right-6" onClick={handleToggle}>
              {icon}
            </span>
          </div>

          <div className="">
            <button
              type="submit"
              className="mt-5 text-white bg-blue-600 border h-10 w-full py-2 rounded-md"
            >
              Submit
            </button>
          </div>
          <div className="flex justify-around">
            <p className="mb-5 mt-3 text-left">
              New here?
              <Link to="/sign-up" className="text-blue-600">
                Register
              </Link>
            </p>
            <p className="mb-5 mt-3 text-right ">
              Forgot
              <Link to="/password-reset" className="text-blue-600">
                password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
  


export default Login;
