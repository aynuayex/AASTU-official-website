import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";
import ProfileView from "./profileView";

function Profile() {
  const location = useLocation();
  const msg = location.state?.mes;

  const { state, dispatch } = useContext(UserContext);
  const res = (state.logStatus && state.identity.id === "Admin" && state.identity.approved === false) ;
  return (
    <>{
      console.log(res)}
      {state.logStatus &&
      state.identity.id === "Admin" &&
      state.identity.approved === false ? (
        <div className="h-96 bg-yellow-200 flex justify-center items-center text-3xl font-bold">
          <div className="text-center">{msg?msg:"please wait for the Admins to approve your account!"}</div>
        </div>
      ) : state.logStatus ? (
        <ProfileView msg={msg} />
      ) : (
        <div className="h-96 bg-red-200 flex justify-center items-center text-3xl font-bold">
          <div>You need to login in order to view your profile!</div>
        </div>
      )}
    </>
  );
}

export default Profile;
