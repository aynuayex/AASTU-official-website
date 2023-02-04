import axios from "axios";
import { useEffect, useState } from "react";

function NewAdmin() {

    const [data,setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/user/admin/request/newAdmin")
        .then(res => console.log(res.data.users))
        .catch(err => console.log(err))
    },[])
    return ( <div className="w-full text-center">NewAdmin</div> );
}

export default NewAdmin;