import { RequireAuth,useAuthUser,useIsAuthenticated} from "react-auth-kit"
import {Navigate, Outlet, Route} from "react-router-dom";


const ProtectRoute = ({allowedRoles, PageComp }) =>{
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
  // const userRole = auth().role
        console.log( auth()?.role)
    return (
        allowedRoles.includes(auth()?.role) ?
            <RequireAuth loginPath={"/unauthenticated"}><PageComp/></RequireAuth>
            : auth() ?
                <Navigate to="/noPermssion"/>  //logged in but dont have access
            : <Navigate to="/unauthenticated"/> //not logged at all


     )
};

export default  ProtectRoute