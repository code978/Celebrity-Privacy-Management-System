import React, { useState, useEffect } from "react";
import userData from "./user.json";
import "./App.css";


interface User {
  name: string
  gender: string,
  country: string
  description: string
}

function App() {
  const [users, setUsers] = useState<User>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    // Set user data from imported JSON directly
    setUsers(userData);
  }, []); // Run effect only once on mount

  const calculateAge = (dob) => {
    // Split the date string into year, month, and day
    const [year, month, day] = dob.split("-");
    // Create a new Date object
    const birthDate = new Date(year, month - 1, day); // Note: month - 1 because months are zero-indexed in JavaScript
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleEdit = (index) => {
    setEditMode(index);
  };

  const handleSave = (index) => {
    const updatedUsers = [...users];
    const editedUser = {
      ...updatedUsers[index],
      country: document.getElementById(`country-${index}`).value,
      gender: document.getElementById(`gender-${index}`).value,
    };
    updatedUsers[index] = editedUser;
    setUsers(updatedUsers);
    setEditMode(null);
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      // Implement delete functionality
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1); // Remove user at index
      setUsers(updatedUsers); // Update user data
      setEditMode(null); // Exit edit mode after deleting
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Celebrity Details</h1>
        <input
          type="text"
          placeholder="Search by celebrity name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      <div className="user-list">
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user, index) => (
            <div className="user" key={index}>
              <div
                className="accordion"
                onClick={() => setEditMode(editMode === index ? null : index)}
              >
                <div>{user.name}</div>
                <div>{editMode === index ? "-" : "+"}</div>
              </div>
              {editMode === index ? (
                <div className="details">
                  <div>Age: {calculateAge(user.dob)}</div>
                  <div>
                    Gender:
                    <select id={`gender-${index}`} defaultValue={user.gender}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Transgender</option>
                      <option>Rather not say</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    Country:{" "}
                    <input
                      type="text"
                      id={`country-${index}`}
                      defaultValue={user.country}
                    />
                  </div>
                  <div>
                    Description:{" "}
                    <textarea
                      id={`description-${index}`}
                      defaultValue={user.description}
                    ></textarea>
                  </div>
                  <div className="buttons">
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
