import React, { createContext, useReducer } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import SignUpFinal from "./components/signup2";
import Reset from "./components/resetPassword";
import ResetFinal from "./components/resetPasswordFinal";
import HomePage from "./pages/homePage";
import Profile from "./pages/profile";
import About from "./pages/about";
import News from "./pages/news";
import Navbar from "./components/navbar";
import {reducer, initialState} from "./reducer/UseReducer";
import Logout from "./components/logout";

export const UserContext = createContext();

const Routing = () => {
  return(

  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/news" element={<News />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />
    <Route path="/sign-in" element={<Login />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/sign-up2" element={<SignUpFinal />} />
    <Route path="/sign-out" element={<Logout />} />
    <Route path="/password-reset" element={<Reset />} />
    <Route path="/user/password-reset/:id/:token" element={<ResetFinal />} />
  </Routes>
  );
};

function App() {
  const [state,dispatch] =useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routing />
    </UserContext.Provider>
  );
}
export default App;
