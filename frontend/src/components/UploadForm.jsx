import { useState } from "react";

function UploadForm() {

    const [file, setFile] = useState(null);

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/upload/sap/",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            alert(data.message);

        } catch (error) {

            console.error(error);

            alert("Upload failed");
        }
    };

    return (
        <div>

            <h2>Upload SAP CSV</h2>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br />
            <br />

            <button onClick={handleUpload}>
                Upload
            </button>

        </div>
    );
}

export default UploadForm;