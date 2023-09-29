import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import Select from "react-select";
import "./Loading.css";
import { useNavigate } from "react-router-dom";

import {useAuthHeader, useAuthUser} from "react-auth-kit";

const MainPage = (props) => {
  const authHeader = useAuthHeader()
  const [ruleOptions, setRuleOptions] = useState([]);
  const [documentOptions, setDocumentOptions] = useState([]);

  const [selectedRules, setSelectedRules] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useHistory to navigate to the second page
  const navigate = useNavigate();
  const [analyzation, setAnalyzation] = useState(null);

  const handleRuleSelectChange = (selectedRules) => {
    setSelectedRules(selectedRules);
  };

  const handleDocumentSelectChange = (selectedOption) => {
    setSelectedDocument(selectedOption); // Set the selected document
  };

  //useEffect to get the log files and rules from the backend
  useEffect(
    () =>
      async function () {

        await fetch("http://localhost:5000/admin/filesList", {
          method: "GET",
          headers: {

            Authorization:  authHeader(),
          },
        })
            .then((response) => response.json())
            .then((data) =>
                setDocumentOptions(
                    data.map((file) => ({ value: file, label: file }))
                )
            );

        //GET http request to get all the avaiable rules and files
        await fetch("http://localhost:5000/admin/rule", {
          method: "GET",
          headers: {
            Authorization: authHeader(),
            },
        })
          .then((response) => response.json())
          .then((data) => {
            setRuleOptions(
              data.map((rule) => ({
                value: rule.ruleName,
                label: rule.ruleName,
              }))
            );
          });


      },
    []
  );

  const handleSubmit = () => {
    if (selectedRules.length === 0) {
      alert("You should choose at least one rule");
      return;
    }

    if (!selectedDocument) {
      alert("Please choose a document");
      return;
    }

    setIsLoading(true);

    const dataToSend = {
      selectedRules: selectedRules.map((option) => option.value),
      selectedDocument: selectedDocument.value, // Use the selected document value
    };
    console.log(dataToSend);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader()
      },
      body: JSON.stringify(dataToSend)
    };

    if (dataToSend) {
      fetch("http://localhost:5000/admin/analyze", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setAnalyzation(data);
          setTimeout(() => {
            console.log("Data to send to the backend:", dataToSend);
            setIsLoading(false);
            navigate("/admin/analyzefile/analyze", { state: { data } });
          }, 2000);
        });
    }
  };

  const handleCancel = () => {
    setSelectedRules([]);
    setSelectedDocument(null); // Reset selected document
  };
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
            <h3>Analyze File</h3>
            <br />
          </div>
          <hr />
          <div>
            <br/>
            <h1>Select Rules and Document</h1>
            <div>
              <label>Rules:</label>
              <br/>
              <br/>
              <Select className="select-analyze"
                isMulti
                options={ruleOptions}
                value={selectedRules}
                onChange={handleRuleSelectChange}
              />
              <br/>
              <br/>
            </div>
            <div>
              <label>Files:</label>
              <br/>
              <br/>
              <Select className="select-analyze"
                options={documentOptions}
                value={selectedDocument}
                onChange={handleDocumentSelectChange}
              />
            </div>
            <br />
            <button className="analize-btn" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <div className="loading-overlay">
                  <div className="loading-bars">
                    <div className="loading-bar">L</div>
                    <div className="loading-bar">o</div>
                    <div className="loading-bar">a</div>
                    <div className="loading-bar">d</div>
                    <div className="loading-bar">i</div>
                    <div className="loading-bar">n</div>
                    <div className="loading-bar">g</div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
            <button className="analize-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
