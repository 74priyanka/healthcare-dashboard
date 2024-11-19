import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("file", formData.file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Data submitted successfully:" + result.message);
      } else {
        alert("Submission failed. Error:" + response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data", error);
      alert("An error occurred while submitting the data");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Healthcare Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Age">Age:</label>
          <div className="dropdown-wrapper">
            <select
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Age
              </option>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Upload file:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
