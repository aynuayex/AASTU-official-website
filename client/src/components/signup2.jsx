import React, { useContext, useState } from "react";
import { useLocation, Link,Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../App";

function SignUpFinal() {
  const [batch, setBatch] = useState(1);
  const [sex, setSex] = useState("Male");
  const [age, setAge] = useState(18);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(<FaEye />);
  const [success, setSuccess] = useState("");

  const {state,dispatch} = useContext(UserContext);

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

  function handleSubmit(e) {
    e.preventDefault();
    const { fullName, email, id, department, stream } = location.state;
    const user = {
      fullName,
      email,
      id,
      department,
      stream,
      batch,
      sex,
      age,
      phoneNumber,
      password,
    };
    console.log(
      `fullName: ${fullName},email: ${email},id: ${id},department: ${department},stream: ${stream},batch: ${batch}, sex: ${sex}, age: ${age}, phoneNumber: ${phoneNumber}, password: ${password}`
    );
    axios
      .post("http://localhost:5000/student/register", user)
      .then((res) => {
        dispatch({type: "USER",payload: true});
        setSuccess(`welcome ${res.data.user} you are successfully registered`);
      })
      .catch((err) => {;
        setSuccess(`ERROR is ${err}`);
      });
  }

  if (state) {
    return <Navigate to="/profile" state={{ mes: success }} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center text-lg text-red-500 font-semibold">{success}</div>
      <div className="h-auto w-5/12 border mx-auto rounded-2xl mt-3 mb-3">
        <div className="h-2 bg-indigo-400 rounded-t-2xl mb-5 "></div>
        <div className="font-bold text-2xl text-center">Sign Up</div>
        <div className="px-16">
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

          <div className="mb-3">
            <label htmlFor="sex" className="block font-semibold  ">
              Sex
            </label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="border h-10 w-full px-3 rounded-md focus:outline-2 focus:outline-blue-600"
              required
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="block font-semibold  ">
              Age
            </label>
            <input
              type="number"
              id="age"
              min="18"
              max="70"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              placeholder="Enter your Age"
              required
            />
          </div>

          <div className="mb-3">
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
