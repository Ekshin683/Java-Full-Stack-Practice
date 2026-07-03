import { useEffect, useRef, useState } from "react";
import StudentForm from "./Components/StudentForm";

const STORAGE_KEY = "student-management-students";

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now().toString(),
    };

    setStudents((currentStudents) => [...currentStudents, newStudent]);
    setShowForm(false);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditingStudent(null);
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== id)
    );

    if (editingStudent?.id === id) {
      setEditingStudent(null);
      setShowForm(false);
    }
  };

  const handleToggleForm = () => {
    setShowForm((currentShowForm) => {
      const nextShowForm = !currentShowForm;

      if (!nextShowForm) {
        setEditingStudent(null);
      }

      return nextShowForm;
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const suggestions = searchText
    ? students.filter((student) =>
        student.name.toLowerCase().startsWith(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="app-shell">
      <h1>Student Management System</h1>

      <div className="toolbar">
        <div className="search-wrap">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search student by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((student, index) => (
                <li
                  key={`${student.name}-${index}`}
                  onClick={() => setSearchText(student.name)}
                >
                  {student.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="search-button"
          onClick={() => searchInputRef.current?.focus()}
          aria-label="Focus search"
        >
          <span className="search-icon" aria-hidden="true" />
        </button>

        <button type="button" onClick={handleToggleForm}>
          {showForm ? "Close Form" : "Add Student"}
        </button>
      </div>

      {showForm && (
        <StudentForm
          addStudent={addStudent}
          updateStudent={updateStudent}
          editingStudent={editingStudent}
        />
      )}

      <div className="student-list">
        <h2>Students</h2>
        {filteredStudents.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <ul>
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <div className="student-info">
                  <strong>{student.name}</strong> - Age: {student.age} - CGPA: {student.cgpa}
                </div>
                <div className="student-actions">
                  <button type="button" onClick={() => handleEdit(student)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;