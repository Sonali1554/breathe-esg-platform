import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";

function App() {

  const [stats, setStats] = useState(null);

  const [records, setRecords] = useState([]);

  const fetchDashboardData = () => {

    fetch("http://127.0.0.1:8000/api/dashboard/stats/")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });

    fetch("http://127.0.0.1:8000/api/records/recent/")
      .then((response) => response.json())
      .then((data) => {
        setRecords(data);
      });
  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const updateStatus = async (id, status) => {

    try {

      await fetch(
        `http://127.0.0.1:8000/api/records/${id}/status/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: status,
          }),
        }
      );

      fetchDashboardData();

    } catch (error) {

      console.error(error);

      alert("Failed to update status");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Breathe ESG Dashboard
      </h1>

      {stats && (

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "40px",
          }}
        >

          <div style={cardStyle}>
            <h2>Total Records</h2>
            <h1>{stats.total_records}</h1>
          </div>

          <div style={cardStyle}>
            <h2>Flagged Records</h2>
            <h1>{stats.flagged_records}</h1>
          </div>

          <div style={cardStyle}>
            <h2>Scope 1</h2>
            <h1>{stats.scope1}</h1>
          </div>

          <div style={cardStyle}>
            <h2>Scope 2</h2>
            <h1>{stats.scope2}</h1>
          </div>

          <div style={cardStyle}>
            <h2>Scope 3</h2>
            <h1>{stats.scope3}</h1>
          </div>

        </div>
      )}

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >

        <UploadForm />

      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2>Recent Records</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>

            <tr>

              <th style={tableHeader}>Category</th>

              <th style={tableHeader}>Quantity</th>

              <th style={tableHeader}>Scope</th>

              <th style={tableHeader}>Status</th>

              <th style={tableHeader}>Action</th>

            </tr>

          </thead>

          <tbody>

            {records.map((record, index) => (

              <tr key={record.id || index}>

                <td style={tableCell}>
                  {record.category}
                </td>

                <td style={tableCell}>
                  {record.quantity}
                </td>

                <td style={tableCell}>
                  {record.scope}
                </td>

                <td style={tableCell}>
                  {record.status}
                </td>

                <td style={tableCell}>

                  <button
                    onClick={() =>
                      updateStatus(
                        record.id,
                        "APPROVED"
                      )
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        record.id,
                        "REJECTED"
                      )
                    }
                  >
                    Reject
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const tableHeader = {
  border: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#f0f0f0",
};

const tableCell = {
  border: "1px solid #ddd",
  padding: "12px",
};

export default App;