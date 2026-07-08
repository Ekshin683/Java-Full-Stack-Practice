import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Password: "",
  });
  const [students, setStudents] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const [loginData, setLoginData] = useState({
  email: "",
  Password: "",
});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLoginChange = (e) => {
  const { name, value } = e.target;

  setLoginData({
    ...loginData,
    [name]: value,
  });
};
  const fetchUsers = async () => {
  try {
    const response = await fetch(
      "https://662203b327fcd16fa6c87950.mockapi.io/api/v1/users"
    );

    const data = await response.json();

    setStudents(data);
    console.log("Users:", data);
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://662203b327fcd16fa6c87950.mockapi.io/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    console.log("User Added:", data);

    // Refresh the user list
    setShowLogin(true);

setFormData({
  name: "",
  email: "",
  Password: "",
});

    alert("Signup Successful!");
  } catch (error) {
    console.log(error);
  }
};
const handleLogin = async (e) => {
  e.preventDefault();

  const response = await fetch(
    "https://662203b327fcd16fa6c87950.mockapi.io/api/v1/users"
  );

  const data = await response.json();

  const user = data.find(
    (u) =>
      u.email === loginData.email &&
      u.Password === loginData.Password
  );

  if (user) {
    alert("Login Successful");
    setStudents(data);
    setIsLoggedIn(true);
  } else {
    alert("Invalid Email or Password");
  }
};
  useEffect(() => {
  fetchUsers();
}, []);
  return (
    <div
      style={{
        width: "400px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          required
        />
        
        <br /><br />

        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => setFormData({ name: "", email: "", Password: "", age: "" })}>Clear</button>
      </form>
      {students.length === 0 ? (
        <p></p>
      ) : (
        students.map((student, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Password:</strong> {student.Password}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;