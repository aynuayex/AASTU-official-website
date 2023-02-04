import { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

function TeacherClass() {
    const location = useLocation();
    const { setMsg } = useOutletContext();
    useEffect(() => {
      setMsg(location.state?.msg);
    }, [location.state?.msg]);
  
    return <div className="w-full text-center">TeacherClass</div>;
}

export default TeacherClass;