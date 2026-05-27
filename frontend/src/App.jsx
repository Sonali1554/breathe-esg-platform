import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);

  const [records, setRecords] = useState([]);

  const [stats, setStats] = useState({
    total_records: 0,
    flagged_records: 0,
    scope1: 0,
    scope2: 0,
    scope3: 0,
  });

  const API_BASE =
    "https://breathe-esg-backend-m7vp.onrender.com";

  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        `${API_BASE}/api/records/recent/`
      );

      setRecords(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchStats = async () => {

    try {

      const response = await axios.get(
        `${API_BASE}/api/dashboard/stats/`
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchRecords();
    fetchStats();

  }, []);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        `${API_BASE}/api/upload/sap/`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Upload successful");

      fetchRecords();
      fetchStats();

    } catch (error) {

      console.error(error);

      alert("Upload failed");
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.patch(
        `${API_BASE}/api/records/${id}/`,
        {
          status: status,
        }
      );

      fetchRecords();
      fetchStats();

    } catch (error) {

      console.error(error);
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
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

      <div style={sectionStyle}>

        <h2>Upload SAP CSV</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br /><br />

        <button
          onClick={handleUpload}
        >
          Upload
        </button>

      </div>

      <div style={sectionStyle}>

        <h2>Recent Records</h2>

        <table
          border="1"
          cellPadding="10"
          width="100%"
          style={{
            borderCollapse:
              "collapse",
          }}
        >

          <thead>

            <tr>
              <th>Category</th>
              <th>Quantity</th>
              <th>Scope</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <tr key={record.id}>

                <td>{record.category}</td>

                <td>{record.quantity}</td>

                <td>{record.scope}</td>

                <td>{record.status}</td>

                <td>

                  <button
                    onClick={() =>
                      updateStatus(
                        record.id,
                        "APPROVED"
                      )
                    }
                  >
                    Approve
                  </button>

                  {" "}

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
  padding: "30px",
  borderRadius: "10px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const sectionStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.1)",
  marginBottom: "40px",
};

export default App;