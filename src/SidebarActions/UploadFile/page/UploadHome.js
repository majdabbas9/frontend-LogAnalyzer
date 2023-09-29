import React from "react";
import "../../../styles/Table.css";
//import "../style/style.css";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";

import FileServer from "./FileServer";
import FileWatcher from "./FileListener";
import FolderWatcher from "./gDriveListener";
import {useAuthUser} from "react-auth-kit";

const UploadHome = () => {
  const auth = useAuthUser()
  const role = auth().role
  return (
    <div className="App">
      {role === "admin" ? <AdminSidebar /> : <ConfiquratorSidebar />}
      <div className="App2">
        {role === "admin" ? (
          <AdminHeader role="Admin" />
        ) : (
          <AdminHeader role="Configurator" />
        )}
        <main className="main-content">
          <div className="main-title">
            <h3>Upload File</h3>
            <br/>
          </div>
          <hr />
          <div className="logs-page">
            <FileServer />
            <hr/>
            
            <FileWatcher />
            <hr/>
            <FolderWatcher />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadHome;
