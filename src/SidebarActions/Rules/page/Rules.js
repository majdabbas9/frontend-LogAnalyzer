import React, { useState, useEffect } from "react";
import "../../../styles/Table.css";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import RuleAdd from "../comp/RuleAdd";
import RuleUpdate from "../comp/RuleUpdate";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import {useAuthHeader, useAuthUser} from "react-auth-kit";


const Rules = (props) => {

  const auth = useAuthUser()
  const role = auth().role

  const authHeader = useAuthHeader()
  const [data, setData] = useState([]);

  useEffect(() => {
  

    fetchData();
  }, [role]);

  async function fetchData() {
    try {
      let response;

      response = await fetch("http://localhost:5000/admin/rule/", {
        method: "GET",
        headers: {
          Authorization: authHeader(),

          "Content-Type": "application/json",
        },
      });
      console.log('response: ',response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json(); // Parse the JSON response
      // const jsonArray = JSON.parse(jsonData);
      console.log('jsondata: ', jsonData)
      //console.log('jsonArray: ', jsonArray)
      // Parse the JSON string into a JavaScript array

      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //for open adduser comp
  const [compAddRules, setCompAddRules] = useState(false);
  const [compEditRules, setCompEditRules] = useState(false);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDelete = (idx) => {
    console.log(`idx  ${idx}`);
    fetch(`http://localhost:5000/admin/rule/${idx}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Rule deleted successfully");
        fetchData()
      })
      .catch((error) => {
        console.error("Error deleting rule:", error);
      });
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setCompEditRules(true);
  };

  //for the number of page
  const [currentpage, setcurrentpage] = useState(1);
  const recordsperPage = 5;
  const lastIndex = currentpage * recordsperPage;
  const firstIndex = lastIndex - recordsperPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsperPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
            <h3>Rules Table</h3>
            <br/>
          </div>
          <hr />

          <div className="logs-page">
            <table className="logs-table">
              <tr>
          
                <th>Rule Name</th>
                <th>Rule KeyWords</th>
                <th>Actions</th>
              </tr>

              {records.length &&
                records.map((d, i) => (
                  <tr className="rowbody" key={i}>
                    
                    <td>{d.ruleName}</td>
                    <td>
                      {" "}
                      {d.keywords.map((keyword, j) => (
                        <div key={j}>{keyword}</div>
                      ))}
                    </td>

                    <td>
                      <i
                        class="fa-regular fa-pen-to-square editbtn"
                        onClick={() => handleEditRow(i)}
                      ></i>{" "}
                      <i
                        class="fa-solid fa-trash deletebtn  "
                        onClick={() => handleDelete(d.ruleName)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </table>

            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prePage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentpage === n ? "active" : ""}`}
                    key={i}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a href="#" className="page-link" onClick={nextPage}>
                    Next
                  </a>
                </li>
                <button
                  className="AddTable"
                  onClick={() => setCompAddRules(true)}
                >
                  Add
                </button>
              </ul>
            </nav>
          </div>

          <div>
            {compAddRules && (
              <RuleAdd
                closeAddRule={() => {
                  setCompAddRules(false);
                  fetchData()
                }}
              />
            )}
          </div>

          <div>
            {compEditRules && (
              <RuleUpdate
                closeEditRule={() => {
                  setCompEditRules(false);
                  setRowToEdit(null);
                  fetchData()
                }}
                defaultValue={rowToEdit !== null && data[rowToEdit]}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );

  function nextPage() {
    if (currentpage !== npage) {
      setcurrentpage(currentpage + 1);
    }
  }

  function prePage() {
    if (currentpage !== 1) {
      setcurrentpage(currentpage - 1);
    }
  }

  function changeCPage(id) {
    setcurrentpage(id);
  }
};

export default Rules;
