import { useState } from "react";

export default function Sports(){

const [form,setForm]=useState({

name:"",
regNo:"",
sport:"",
year:""

});

function change(e:any){
setForm({
...form,
[e.target.name]:e.target.value
});
}

function submit(e:any){

e.preventDefault();

const data=
JSON.parse(localStorage.getItem("sports") || "[]");

data.push(form);

localStorage.setItem(
"sports",
JSON.stringify(data)
);

alert("Enrollment Successful");

setForm({
name:"",
regNo:"",
sport:"",
year:""
});
}

return(

<form onSubmit={submit} className="form">

<h2>Sports Enrollment</h2>

<input
name="name"
placeholder="Student Name"
value={form.name}
onChange={change}
/>

<input
name="regNo"
placeholder="Registration Number"
value={form.regNo}
onChange={change}
/>

<select
name="sport"
value={form.sport}
onChange={change}
>

<option value="">Select Sport</option>

<option>Cricket</option>

<option>Football</option>

<option>Basketball</option>

<option>Badminton</option>

<option>Volleyball</option>

</select>

<input
name="year"
placeholder="Year"
value={form.year}
onChange={change}
/>

<button>
Enroll
</button>

</form>

);

}