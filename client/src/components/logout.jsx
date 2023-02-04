import { useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";

function Logout() {

const {state,dispatch} = useContext(UserContext);

  function handleClick() {
    
    axios
      .get("http://localhost:5000/user/logout")
      .then((res) =>{
        dispatch({type: "USER",payload: {logStatus: false, identity: {}}});
      console.log(res.data.user);
      }
      )
      .catch((err) => {
        console.log(`ERROR is ${err}`);
      });
  }
if(!state.logStatus){
    
    return <Navigate to="/" state={{mes: "You have logged out of your account!"}}/>
}

  return (
    
   <div className="h-auto w-3/4 border border-red-600 mx-auto rounded-2xl mt-3 ">
    <div className="px-16 "> 
           <div className="font-bold text-2xl text-center">Sign out of your account</div>
<div className="mt-5 mb-5 text-center font-bold">
    Warning: If you continue, your progress will no longer be saved.</div>

<p className="text-center font-semibold">This action will sign you out of your account on this device and browser session only. 
Please confirm if you would like to proceed.</p>
            <button onClick={handleClick}
              type="submit"
              className="mt-5 mb-5 text-red-600 font-semibold text-lg bg-red-100 border border-red-600 h-10 w-full py-2 rounded-md"
            >
              Yes, sign out of my account
            </button>
            </div>
          </div>
       
  );
}
  


export default Logout;
