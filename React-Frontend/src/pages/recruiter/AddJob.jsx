import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddJob = () => {

const navigate = useNavigate();

const [form,setForm]=useState({

company:"",
role:"",
skill:"",
experience:"",
location:"",
salary:"",
description:""

});

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:
e.target.value

});

};

const handleSubmit=
async(e)=>{

e.preventDefault();

try{

await API.post(
"/jobs/",
form
);

alert(
"Job Added Successfully"
);

navigate(
"/recruiter-dashboard"
);

}

catch(error){

console.log(
error.response?.data
);

alert(
"Failed to add job"
);

}

};

return(

<div className="page-content">

<h1>
Add Job
</h1>

<form
className="job-form"
onSubmit={
handleSubmit
}
>

<input
name="company"
placeholder="Company"
onChange={
handleChange
}
/>

<input
name="role"
placeholder="Role"
onChange={
handleChange
}
/>

<input
name="skill"
placeholder="Skill"
onChange={
handleChange
}
/>

<input
name="experience"
placeholder="Experience"
onChange={
handleChange
}
/>

<input
name="location"
placeholder="Location"
onChange={
handleChange
}
/>

<input
name="salary"
placeholder="Salary"
onChange={
handleChange
}
/>

<textarea
name="description"
placeholder="Description"
onChange={
handleChange
}
/>

<button
type="submit"
>

Add Job

</button>

</form>

</div>

);

};

export default AddJob;