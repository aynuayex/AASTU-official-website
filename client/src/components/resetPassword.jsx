import { useState } from "react";
import axios from "axios";

function Reset() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [cancel, setCancel] = useState("");
  const [name, setName] = useState("h-0");

  function handleClick() {
    setSuccess("");
    setCancel("");
    setName("h-0");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const user = { email };
    console.log(`email: ${email}`);
    axios
      .post("http://localhost:5000/user/forgot-password", user)
      .then((res) => {
        setSuccess(res.data.user);
        setCancel("X");
        setName(
          "h-10 flex justify-around items-center bg-green-200 text-black"
        );
      })
      .catch((err) => {
        console.log(`ERROR is ${err}`);
        console.log("user with that email does not exist!");
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
          <div className="font-bold text-2xl text-center">Forgot Password</div>
          <div className="px-16">
            <div className="mt-5">
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

export default Reset;
