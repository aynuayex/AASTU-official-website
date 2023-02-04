import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Student");
  const [department, setDepartment] = useState(
    "Electrical and Computer Engineering"
  );
  const [stream, setStream] = useState("None");

  const deps = {
    ElectricalandComputerEngineering: [
      "None",
      "Computer Engineering",
      "Control Engineering",
      "Power Engineering",
      "Communication Engineering",
    ],
    ChemicalEngineering: ["None"],
    MinningEngineering: ["None", "e", "f", "g", "h"],
    CivilEngineering: ["None", "i", "j", "k", "l"],
    MechanicalEngineering: [
      "None",
      "Automotive Engineering",
      "Manufacture Engineering",
      "Design Engineering",
      "Thermal Engineering",
    ],
    SoftwareEngineering: ["None", "p", "q", "r", "s"],
    ElectromechanicalEngineering: ["None"],
    EnvironmentalEngineering: ["None"],
  };

  function handleDep(e) {
    setDepartment(e.target.value);
    const dep = department.split(" ").join("");
    const str = deps[dep][0];
    setStream(str);
  }

  const dep = department.split(" ").join("");
  const streams = deps[dep];

  useEffect(() => {
    if (userType !== "Student") {
      setDepartment("none");
      setStream("none");
    }
    else{
      setDepartment("Electrical and Computer Engineering");
      setStream("None");
    }
  }, [userType]);

  return (
    <form>
      <div className="h-auto w-5/12 border mx-auto rounded-2xl mt-3 mb-3">
        <div className="h-2 bg-indigo-400 rounded-t-2xl mb-5 "></div>
        <div className="font-bold text-2xl text-center">Sign Up</div>
        <div className="px-16">
          <div className="mt-5">
            <label htmlFor="name" className="block font-semibold  ">
              Full name
            </label>
            <input
              type="text"
              id="name"
              pattern="^[a-zA-z]+\s+[a-zA-z]+\s+[a-zA-z]+$"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              placeholder="yosef temesegen abreham"
              required
            />
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="block font-semibold  ">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border h-5 w-full px-3 py-5 rounded-md focus:outline-2 focus:outline-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-5 mb-3">
            <label htmlFor="user" className="block font-semibold  ">
              userType
            </label>
            <select
              id="user"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border h-10 w-full px-3 rounded-md focus:outline-2 focus:outline-blue-600"
              required
            >
              <option>Student</option>
              <option>Teacher</option>
              <option>Admin</option>
            </select>
          </div>

          {userType === "Student" ? (
            <>
              <div className="mt-5">
                <label htmlFor="dep" className="block font-semibold  ">
                  Department
                </label>
                <select
                  id="dep"
                  value={department}
                  onChange={handleDep}
                  className="border h-10 w-full px-3 rounded-md focus:outline-2 focus:outline-blue-600"
                  required
                >
                  <option>Electrical and Computer Engineering</option>
                  <option>Chemical Engineering</option>
                  <option>Mining Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Software Engineering</option>
                  <option>Electromechanical Engineering</option>
                  <option>Environmental Engineering</option>
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="str" className="block font-semibold  ">
                  Stream
                </label>
                <select
                  id="str"
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="border h-10 w-full px-3 rounded-md focus:outline-2 focus:outline-blue-600"
                  required
                >
                  {streams &&
                    streams.map((st) => <option key={st}>{st}</option>)}
                </select>
              </div>
            </>
          ) : (<>
              
              </>
          )}

          <div className="">
            <Link
              to="/sign-up2"
              state={{ fullName, email, userType, department, stream }}
            >
              <button
                type="submit"
                className="mt-5 text-white bg-blue-600 border h-10 w-full py-2 rounded-md"
              >
                Next
              </button>
            </Link>
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

export default SignUp;
