import { Component, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import TeacherProfile from "./teacherProfile";

function ProfileView({ msg }) {
  const { state, dispatch } = useContext(UserContext);

  return (
    <div className="h-full">
      {state.identity.id === "Admin" ? (
        <Navigate to="admin/request" state={{ msg }} />
      ) : state.identity.id === "Teacher" ? (
        <TeacherProfile />
      ) : (
        <Navigate to="Student" state={{ msg }} />
      )}
    </div>
  );
}

export default ProfileView;
