import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const API =
    "https://breathe-esg-backend-m7vp.onrender.com";

  const [file, setFile] = useState(null);

  const [records, setRecords] = useState([]);

  const [stats, setStats] = useState({
    total_records: 0,
    flagged_records: 0,
    scope1: 0,
    scope2: 0,
    scope3: 0,
  });

  useEffect(() => {
    fetchRecords();
    fetchStats();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        `${API}/api/records/recent/`
      );

      setRecords(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {

      const res = await axios.get(
        `${API}/api/dashboard/stats/`
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Choose file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        `${API}/api/upload/sap/`,
        formData
      );

      alert("Upload successful");

      fetchRecords();
      fetchStats();

    } catch (err) {

      console.log(err);

      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7fa",
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
            "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        <div style={card}>
          <h2>Total Records</h2>
          <h1>{stats.total_records}</h1>
        </div>

        <div style={card}>
          <h2>Flagged Records</h2>
          <h1>{stats.flagged_records}</h1>
        </div>

        <div style={card}>
          <h2>Scope 1</h2>
          <h1>{stats.scope1}</h1>
        </div>

        <div style={card}>
          <h2>Scope 2</h2>
          <h1>{stats.scope2}</h1>
        </div>

        <div style={card}>
          <h2>Scope 3</h2>
          <h1>{stats.scope3}</h1>
        </div>

      </div>

      <div style={section}>

        <h2>Upload SAP CSV</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        <button onClick={handleUpload}>
          Upload
        </button>

      </div>

      <div style={section}>

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
            </tr>

          </thead>

          <tbody>

            {records.map((r, index) => (

              <tr key={index}>
                <td>{r.category}</td>
                <td>{r.quantity}</td>
                <td>{r.scope}</td>
                <td>{r.status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const section = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  marginBottom: "40px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.1)",
};

export default App;