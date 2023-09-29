import "./App.css";
import AdminHome from "./AdminDashboard/page/AdminHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from "./SidebarActions/Users/page/UserTable";
import Logs from "./SidebarActions/Logs/page/Logs";
import Rules from "./SidebarActions/Rules/page/Rules";
import ProcessLogs from "./SidebarActions/Logs/page/ProcessLogs";
import ConfiquratorHome from "./ConfiquratorDashboard/page/ConfiquratorHome";
import ViewerHome from "./ViewerDashboard/page/ViewerHome";
import UploadHome from "./SidebarActions/UploadFile/page/UploadHome";
import ReportsHome from "./SidebarActions/Reports/page/ReportsHome";
import Landpage from "./Login/pages/landpage";

import LoginPage from "./Login/pages/LoginPage";
import NoPage from "./Login/pages/NoPage";
import ResetPassFirstLogin from "./Login/pages/ResetPassFirstLogin";
import UnauthorizedAccess from "./Login/pages/UnauthorizedAccess";
import MainPage from "./SidebarActions/AnalyzeFile/page/MainPage";
import AnalyzationPage from "./SidebarActions/AnalyzeFile/page/AnalyzationPage";
import DispatcherHome from "./SidebarActions/Dispatcher/page/DispatcherHome";
import ProtectRoute from "./Login/comp/ProtectedRoutes";
import { AuthProvider } from "react-auth-kit";
import JiraHome from "./SidebarActions/Jira/page/JiraHome";
import UserLogin from "./Login/pages/userLogin";
import UnauthenticatedAccess from "./Login/pages/UnauthenticatedAccess";
import ResetPass from "./Login/pages/resetPass";
import VerifyEmail from "./Login/pages/verifyEmail";
import SignUp from "./Login/pages/SignUpPage";
import Processing from "./Login/pages/Processing";
import ForgotPassword from "./Login/pages/ForgetPass";

//<AdminHome openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <Routes>
          {/*     <Route path="/" element={<ReportsHome />} />*/}
          <Route path="*" element={<NoPage />} />


          <Route path="/" element={<Landpage />} />

          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/resetPassFirstLogin/:username" element={<ResetPassFirstLogin />} />
          <Route path="/noPermssion" element={<UnauthorizedAccess />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/unauthenticated" element={<UnauthenticatedAccess />} />
          <Route path="/resetPass/:id/:token" element={<ResetPass />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/processing" element={<Processing  />}/>
          <Route path="/signup" element={<SignUp/>} />

          <Route path="/admin/dashboard" element={
            <ProtectRoute allowedRoles={['admin']}  PageComp ={AdminHome} />} />
          <Route
            path="/admin"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp ={AdminHome} />}
          />
          <Route
            path="/admin/uploadfile"
            element={ <ProtectRoute allowedRoles={['admin']} PageComp={UploadHome}  />}
          />
          <Route
            path="/admin/analyzefile"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={MainPage}  />}
          />
          <Route
            path="/admin/analyzefile/analyze"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={AnalyzationPage}  />}
          />
          <Route
            path="/admin/users"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={UserTable} />}
          />
          <Route
            path="/admin/logs"
            element={ <ProtectRoute allowedRoles={['admin']} PageComp={Logs}/>}
          />
          <Route
            path="/admin/process-logs/:file_name"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={ProcessLogs} />}
          />
          <Route
            path="/admin/rules"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={Rules}  />}
          />
          <Route
            path="/admin/reports"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={ReportsHome}  />}
          />
          <Route
            path="/admin/dispatcher"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={DispatcherHome}  />}
          />
          <Route
            path="/admin/jira"
            element={ <ProtectRoute allowedRoles={['admin']}  PageComp={JiraHome}  />}
          />

          <Route
            path="/Configurator"
            element={<ProtectRoute PageComp={ConfiquratorHome} />}
          />
          <Route
            path="/Configurator/uploadfile"
            element={<ProtectRoute PageComp={UploadHome} role="Configurator" />}
          />
          <Route
            path="/Configurator/analyzefile"
            element={<ProtectRoute PageComp={MainPage} role="Configurator" />}
          />
          <Route
            path="/Configurator/analyzefile/analyze"
            element={
              <ProtectRoute PageComp={AnalyzationPage} role="Configurator" />
            }
          />
          <Route
            path="/Configurator/logs"
            element={<ProtectRoute PageComp={Logs} role="Configurator" />}
          />
          <Route
            path="/Configurator/process-logs/:file_name"
            element={
              <ProtectRoute PageComp={ProcessLogs} role="Configurator" />
            }
          />
          <Route
            path="/Configurator/rules"
            element={<ProtectRoute PageComp={Rules} role="Configurator" />}
          />
          <Route
            path="/Configurator/reports"
            element={
              <ProtectRoute PageComp={ReportsHome} role="Configurator" />
            }
          />
          <Route
            path="/Configurator/dispatcher"
            element={
              <ProtectRoute PageComp={DispatcherHome} role="Configurator" />
            }
          />

          <Route
            path="/viewer"
            element={ <ProtectRoute allowedRoles={['viewer']}  PageComp={ViewerHome} />}
          />
          <Route
            path="/viewer/reports"
            element={<ProtectRoute PageComp={ReportsHome}  allowedRoles={['viewer']}  />}
          />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
