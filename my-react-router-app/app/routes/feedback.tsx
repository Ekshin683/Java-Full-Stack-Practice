import { useState } from "react";

export default function Feedback() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  function handleChange(e:any){
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    });
  }

  function handleSubmit(e:any){
    e.preventDefault();

    const oldData =
      JSON.parse(localStorage.getItem("feedbacks") || "[]");

    oldData.push(form);

    localStorage.setItem(
      "feedbacks",
      JSON.stringify(oldData)
    );

    alert("Feedback Submitted");

    setForm({
      name:"",
      email:"",
      feedback:"",
    });
  }

  return (

    <form onSubmit={handleSubmit} className="form">

      <h2>Feedback Form</h2>

      <input
      name="name"
      placeholder="Name"
      value={form.name}
      onChange={handleChange}
      />

      <input
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      />

      <textarea
      name="feedback"
      placeholder="Enter Feedback"
      value={form.feedback}
      onChange={handleChange}
      />

      <button type="submit">
        Submit
      </button>

    </form>

  );
}