import { useEffect, useState } from "react";

const StudentForm = ({ addStudent, updateStudent, editingStudent }) => {

    const [student, setStudent] = useState({
        name: "",
        age: "",
        cgpa: ""
    });

    useEffect(() => {
        if (editingStudent) {
            setStudent({
                name: editingStudent.name || "",
                age: editingStudent.age || "",
                cgpa: editingStudent.cgpa || ""
            });
        }
    }, [editingStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setStudent((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (
            !student.name ||
            !student.age ||
            !student.cgpa
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (editingStudent) {
            updateStudent({
                ...editingStudent,
                ...student
            });
        } else {
            addStudent(student);
        }

        // Clear form
        setStudent({
            name: "",
            age: "",
            cgpa: ""
        });
    };

    return (
        <div className="student-form">
            <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={student.name}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={student.age}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="cgpa"
                    placeholder="CGPA"
                    value={student.cgpa}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingStudent ? "Update Student" : "Add Student"}
                </button>

            </form>
        </div>
    );
};

export default StudentForm;