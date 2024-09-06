"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewSkillsPage() {
  const [skills, setSkills] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkills, setEditedSkills] = useState(null);
  const [level ,setLevel] = useState(0);

  // Fetch data from the provided JSON
  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded skills:", data.data);
        setSkills(data.data);
        setEditedSkills(data.data);
      })
      .catch((err) => console.error("Error loading skills:", err));
  }, []);

  const handlePrevious = () => {
    setLevel(level - 1);
  }

  const handleNext = () => {
    setLevel(level + 1);
  }

  const handleLooksGood = () => {
    toast.success("Looks Good!");
    // Logic to move to the next skill, dummy for now
    setLevel(level + 1);
    console.log("Moving to the next skill");
  };

  const handleSuggestEdits = () => {
    setIsEditing(true);
  };

  const handleSaveEdits = () => {
    fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedSkills),
    })
      .then((res) => res.json()) // Ensure it's converted to JSON
      .then((data) => {
        toast.success("Edits Saved!");
        setIsEditing(false);
        setSkills(editedSkills);
      })
      .catch((err) => {
        toast.error("Failed to save edits.");
        console.error("Error saving edits:", err);
      });
  };
  

  const handleLevelChange = (index, value) => {
    const newSkills = { ...editedSkills };
    if (newSkills) {
      newSkills[level].skills[index].name = value;
      setEditedSkills(newSkills);
    }
  };

  if (!skills) return <div>Loading...</div>;

  return (
      <div className="container">
      <ToastContainer />
      <h2>Benefits of Iconography</h2>
      <p>Improving understanding, navigation, and visual appeal with icons.</p>
      
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {skills[level].skills.map((skill, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={skills[level].skills[index].name || ""}
                    className="w-full bg-black text-white outline-none"
                    onChange={(e) => handleLevelChange(index, e.target.value)}
                  />
                ) : (
                  skill.name
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <div className="flex justify-between mt-4">
        <div>
                  <button 
            className={`bg-gray-500 ${level === 0 ? 'bg-gray-300' : ''}`} 
            onClick={handlePrevious} 
            disabled={level === 0}
          >
            Previous
          </button>
          <button 
            className="bg-gray-500 ml-2" 
            onClick={handleNext} 
            disabled={level === skills.length - 1}
          >
            Next
          </button>
        </div>
        <div>
          {isEditing ? (
            <button onClick={handleSaveEdits}>Save Edits</button>
          ) : (
            <>
              <button className="bg-green-700" onClick={handleLooksGood}>Looks Good to Me</button>
              <button className="bg-red-700 ml-2" onClick={handleSuggestEdits}>Suggest Edits</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
