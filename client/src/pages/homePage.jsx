import { useState } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const msg = location.state?.mes;
  const [logout, setLogout] = useState(msg === undefined ? "" : msg);
  const [cancel, setCancel] = useState(msg === undefined ? "" : "X");
  const [name, setName] = useState(
    msg === undefined
      ? "h-0"
      : "h-10 flex justify-around items-center bg-green-200 text-black"
  );

  function handleClick() {
    setLogout("");
    setCancel("");
    setName("h-0");
  }

  return (
    <>
      <div className={name}>
        {logout}
        <button onClick={handleClick}>{cancel}</button>
      </div>
      homepage
    </>
  );
}

export default HomePage;
