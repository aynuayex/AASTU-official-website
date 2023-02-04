import { GiTeacher } from "react-icons/gi";
import { FaHouseUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, useResolvedPath, useMatch, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const side = [
  { title: "Teacher class request", icon: <GiTeacher />, link: "/profile/admin/request" },
  { title: "New admin request", icon: <MdAdminPanelSettings />, link: "/profile/admin/request/new/admin" },
  {
    title: "Dormitory placement",
    icon: <FaHouseUser />,
    link: "/profile/admin/request/placement/dormitory",
  },
  {
    title: "Add student to class",
    icon: <SiGoogleclassroom />,
    link: "/profile/admin/request/add/student/to/class",
  },
];

function AdminProfileLayout() {
  const [msg, setMsg] = useState("");
  const [cancel, setCancel] = useState("");
  const [name, setName] = useState("");

  const resolvedPath = useResolvedPath(side.map((val) => val.link));

  function handleClick() {
    setMsg("");
  }

  useEffect(() => {
    if (msg) {
      setCancel("X");
      setName("h-10 flex justify-around items-center bg-green-200 text-black");
    } else {
      setCancel("");
      setName("h-0");
    }
  }, [msg]);

  return (
    <>
      <div className={name}>
        {msg}
        <button onClick={handleClick}>{cancel}</button>
      </div>
      <div className="flex ">
        <div
          className={
            cancel === ""
              ? "bg-[#2f4050] text-white box-border w-1/5 h-[393px]  "
              : "bg-[#2f4050] text-white box-border w-1/5 h-[353px]  "
          }
        >
          {side.map((val, index) => {
            return (
              <Link
                to={val.link}
                key={index}
                className={`flex justify-center items-center font-sans h-14  
                 ${
                   val.link === resolvedPath.pathname
                     ? "bg-[#394045] border-2 border-[#293846] border-l-4 border-l-green-600"
                     : "hover:bg-[#293846]"
                 }`}
              >
                <div className="w-1/3 grid place-items-center">{val.icon}</div>
                <div className="w-2/3">{val.title}</div>
              </Link>
            );
          })}
        </div>
        <Outlet context={{ setMsg }} className="w-4/5 text-center" />
      </div>
    </>
  );
}

export default AdminProfileLayout;
