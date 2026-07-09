import { useState } from "react";

export default function Attendance(){

const [form,setForm]=useState({

name:"",
regNo:"",
date:"",
status:"Present"

});
const [records, setRecords] = useState<any[]>(() => {
  return JSON.parse(localStorage.getItem("attendance") || "[]");
});

function change(e:any){

setForm({
...form,
[e.target.name]:e.target.value
});

}

function submit(e: any) {
  e.preventDefault();

  const newRecords = [...records, form];

  setRecords(newRecords);

  localStorage.setItem(
    "attendance",
    JSON.stringify(newRecords)
  );

  alert("Attendance Marked Successfully");

  setForm({
    name: "",
    regNo: "",
    date: "",
    status: "Present",
  });
}

return (
  <>
    <form onSubmit={submit} className="form">

      <h2>Attendance</h2>

      <input
        name="name"
        value={form.name}
        onChange={change}
        placeholder="Student Name"
      />

      <input
        name="regNo"
        value={form.regNo}
        onChange={change}
        placeholder="Registration Number"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={change}
      />

      <select
        name="status"
        value={form.status}
        onChange={change}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button type="submit">
        Submit
      </button>

    </form>

    <div className="table-container">

      <h2>Attendance Records</h2>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Date</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {records.map((student, index) => (

            <tr key={index}>

              <td>{student.name}</td>
              <td>{student.regNo}</td>
              <td>{student.date}</td>
              <td>{student.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </>
);

}
