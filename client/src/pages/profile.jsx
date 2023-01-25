import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";

function Profile() {
  const location = useLocation();
  const msg = location.state?.mes;
  const [success, setSuccess] = useState(msg === undefined ? "" : msg);
  const [cancel, setCancel] = useState(msg === undefined ? "" : "X");
  const [name, setName] = useState(
    msg === undefined
      ? "h-0"
      : "h-10 flex justify-around items-center bg-green-200 text-black"
  );
  const { state, dispatch } = useContext(UserContext);

  function handleClick() {
    setSuccess("");
    setCancel("");
    setName("h-0");
  }
  return (
    <>
      <div className={name}>
        {success}
        <button onClick={handleClick}>{cancel}</button>
      </div>
      {state ? (
        "profile"
      ) : (
        <div className="h-96 bg-red-200 flex justify-center items-center text-3xl font-bold">
          <div>You need to login in order to view your profile!</div>
        </div>
      )}
    </>
  );
}

export default Profile;
