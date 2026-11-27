import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/students";

export default function StudentsApi() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API_URL);
      setStudents(res.data.data || []);
    } catch (err) {
      if (err.response) {
        const message = err.response.data?.message;
        setError(
          `Backend request failed (${err.response.status})${message ? `: ${message}` : "."}`
        );
      } else {
        setError("Could not connect to backend. Make sure Backend is running on port 3000.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleAddStudent(e) {
    e.preventDefault();
    if (!id || !name) {
      setError("ID and Name are required.");
      return;
    }

    try {
      setError("");
      await axios.post(API_URL, {
        id: Number(id),
        name,
        cgpa: cgpa ? Number(cgpa) : null,
      });
      setId("");
      setName("");
      setCgpa("");
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student.");
    }
  }

  async function handleDelete(studentId) {
    try {
      setError("");
      await axios.delete(`${API_URL}/${studentId}`);
      loadStudents();
    } catch (err) {
      setError("Failed to delete student.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Students (Connected to Backend)</h1>

      <form onSubmit={handleAddStudent} className="flex flex-wrap gap-2 mb-6">
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border rounded px-3 py-1.5 w-24"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-1.5 flex-1"
        />
        <input
          type="number"
          step="0.01"
          placeholder="CGPA"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          className="border rounded px-3 py-1.5 w-24"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading students...</p>
      ) : error ? null : students.length === 0 ? (
        <p className="text-gray-500">No students found in database.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex items-center justify-between border rounded px-3 py-2"
            >
              <div>
                <span className="font-semibold">{student.name}</span>{" "}
                <span className="text-sm text-gray-500">(ID: {student.id})</span>
                {student.cgpa != null && (
                  <span className="ml-2 text-sm text-gray-600">CGPA: {student.cgpa}</span>
                )}
              </div>
              <button
                onClick={() => handleDelete(student.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
