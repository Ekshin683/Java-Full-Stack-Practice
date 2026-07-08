import { useEffect, useState } from "react";

const LectureForm = ({ addLecture, updateLecture, editingLecture }) => {
  const initialLectureState = {
    title: "",
    instructor: "",
    day: "",
    startTime: "",
    endTime: "",
    room: "",
    description: "",
  };

  const [lecture, setLecture] = useState({
    ...initialLectureState,
  });

  useEffect(() => {
    if (editingLecture) {
      setLecture({
        title: editingLecture.title || "",
        instructor: editingLecture.instructor || "",
        day: editingLecture.day || "",
        startTime: editingLecture.startTime || "",
        endTime: editingLecture.endTime || "",
        room: editingLecture.room || "",
        description: editingLecture.description || "",
      });
      return;
    }

    setLecture(initialLectureState);
  }, [editingLecture]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLecture((currentLecture) => ({
      ...currentLecture,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !lecture.title ||
      !lecture.instructor ||
      !lecture.day ||
      !lecture.startTime ||
      !lecture.endTime ||
      !lecture.room
    ) {
      alert("Please fill all required lecture fields.");
      return;
    }

    if (lecture.endTime <= lecture.startTime) {
      alert("End time must be later than start time.");
      return;
    }

    if (editingLecture) {
      updateLecture({
        ...editingLecture,
        ...lecture,
      });
    } else {
      addLecture(lecture);
    }

    setLecture(initialLectureState);
  };

  return (
    <div className="lecture-form">
      <h2>{editingLecture ? "Edit Lecture" : "Add Lecture"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Lecture Title"
          value={lecture.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          value={lecture.instructor}
          onChange={handleChange}
          required
        />

        <select
          name="day"
          value={lecture.day}
          onChange={handleChange}
          required
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          value={lecture.startTime}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="endTime"
          placeholder="End Time"
          value={lecture.endTime}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="room"
          placeholder="Room"
          value={lecture.room}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={lecture.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingLecture ? "Update Lecture" : "Add Lecture"}
        </button>
      </form>
    </div>
  );
};

export default LectureForm;
