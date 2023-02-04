import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetFinal() {
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(<FaEye />);
  const [success, setSuccess] = useState("");
  const [cancel, setCancel] = useState("");
  const [name, setName] = useState("h-0");

  function handleClick() {
    setSuccess("");
    setCancel("");
    setName("h-0");
  }

  const { id, token } = useParams();
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

    const user = { password };
    console.log(`password: ${password}`);
    axios
      .post(`http://localhost:5000/user/password-reset/${id}/${token}`, user)
      .then((res) => {
        setSuccess(res.data.user);
        setCancel("X");
        setName(
          "h-10 flex justify-around items-center bg-green-200 text-black"
        );
      })
      .catch((err) => {
        console.log(`ERROR is ${err}`);
        console.log("password reset not successful");
      });
  }

  return (
    <>
      <div className={name}>
        {success}
        <button onClick={handleClick}>{cancel}</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="h-auto w-5/12 border mx-auto rounded-2xl mt-3 ">
          <div className="h-2 bg-indigo-400 rounded-t-2xl mb-5 "></div>
          <div className="font-bold text-2xl text-center">Change Password</div>
          <div className="px-16">
            <div className="relative ">
              <label htmlFor="pass" className="block font-semibold mt-5">
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
                className="mt-5 mb-5 text-white bg-blue-600 border h-10 w-full py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResetFinal;
