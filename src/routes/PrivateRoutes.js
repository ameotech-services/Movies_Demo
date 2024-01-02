import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    let token = localStorage.getItem("token");
    const location = useLocation();
    if(token !== null) {
        return children;
    }else{
        return <Navigate to="/" state={{ from: location }} />
    }
}


export default PrivateRoute;