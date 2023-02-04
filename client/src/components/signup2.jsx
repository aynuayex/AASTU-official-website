import React, { useContext, useState, useEffect } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../App";

function StudentDetails({ userType, id, batch, setId, setBatch }) {
  useEffect(() => {
    if (userType !== "Student") {
      setId("none");
      setBatch(0);
    }
  }, []);

  if (userType !== "Student") {
    return null;
  }

  return (
    <>
      <div className="mt-5">
        <label htmlFor="ide" className="block font-semibold  ">
          ID
        </label>
        <input
          type="text"
          id="ide"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
          placeholder="ETS0168/11"
          required
        />
      </div>
      <div className="mt-5">
        <label htmlFor="bat" className="block font-semibold  ">
          Batch
        </label>
        <select
          id="bat"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="border h-10 w-full px-3 rounded-md focus:outline-2 focus:outline-blue-600"
          required
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
    </>
  );
}

function SignUpFinal() {
  const [id, setId] = useState("");
  const [batch, setBatch] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(<FaEye />);
  const [success, setSuccess] = useState("");

  const { state, dispatch } = useContext(UserContext);

  function handleToggle(e) {
    if (inputType === "password") {
      setInputType("text");
      setIcon(FaEyeSlash);
    } else {
      setInputType("password");
      setIcon(FaEye);
    }
  }

  const location = useLocation();
  const { fullName, email, userType, department, stream } = location.state;

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      fullName,
      email,
      userType,
      department,
      stream,
      id,
      batch,
      phoneNumber,
      password,
    };
    console.log(
      `fullName: ${fullName},email: ${email},userType: ${userType},department: ${department},stream: ${stream}, id:${id}, batch: ${batch}, phoneNumber: ${phoneNumber}, password: ${password}`
    );
    axios
      .post("http://localhost:5000/user/register", user)
      .then((res) => {
        dispatch({
          type: "USER",
          payload: { logStatus: true, identity: res.data.identity },
        });
        if ((userType === "Admin") && (res.data.identity.approved === false)){
          setSuccess(
            `${res.data.user},your account has been saved successfully please wait for the Admins to approve!`
            );
        }else{
            setSuccess(
              `welcome ${res.data.user} you are successfully registered`
            );
        }
      })
      .catch((err) => {
        setSuccess(`ERROR is ${err}`);
      });
  }

  if (state.logStatus) {
    return <Navigate to="/profile" state={{ mes: success }} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center text-lg text-red-500 font-semibold">
        {success}
      </div>
      <div className="h-auto w-5/12 border mx-auto rounded-2xl mt-3 mb-3">
        <div className="h-2 bg-indigo-400 rounded-t-2xl mb-5 "></div>
        <div className="font-bold text-2xl text-center">Sign Up</div>
        <div className="px-16">
          <StudentDetails
            userType={userType}
            id={id}
            batch={batch}
            setId={setId}
            setBatch={setBatch}
          />
          <div className="mt-5 mb-3">
            <label htmlFor="num" className="block font-semibold  ">
              Phone Number
            </label>
            <input
              type="tel"
              id="num"
              pattern="[0]{1}[97]{1}[0-9]{8}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              placeholder="0984678119 or 0719377416"
              required
            />
          </div>

          <div className="relative ">
            <label htmlFor="pass" className="block font-semibold  ">
              Password
            </label>
            <input
              type={inputType}
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              placeholder="Enter your password"
              required
            />
            <span className="absolute top-9 right-6" onClick={handleToggle}>
              {icon}
            </span>
          </div>

          <div className="flex justify-around">
            <Link
              to="/sign-up"
              className="mt-5 text-white bg-blue-600 border h-10 w-1/3 text-center py-2 rounded-md"
            >
              Back
            </Link>
            <button
              type="submit"
              className="mt-5 text-white bg-blue-600 border h-10 w-1/2 py-2 rounded-md"
            >
              Submit
            </button>
          </div>

          <p className="mb-5 mt-3 text-right ">
            Already registered{" "}
            <Link to="/sign-in" className="text-blue-600">
              sign in?
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default SignUpFinal;
