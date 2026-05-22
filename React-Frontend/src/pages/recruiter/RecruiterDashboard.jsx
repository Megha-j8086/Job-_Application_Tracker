import React, {
useEffect,
useState
} from "react";

import API from "../../api/api";

import {
useNavigate
} from "react-router-dom";

import "../../styles/RecruiterDashboard.css";

const RecruiterDashboard = () => {

const navigate = useNavigate();

const [user,setUser]=useState({});
const [jobs,setJobs]=useState([]);
const [applications,setApplications]=useState([]);

const [showAddJob,setShowAddJob]=
useState(false);


const [selectedApp,setSelectedApp]=
useState(null);

const [jobForm,setJobForm]=
useState({
role:"",
company:"",
location:"",
salary:"",
skill:"",
experience:"",
description:"",
});



useEffect(()=>{

const token=
localStorage.getItem("access");

const current=
JSON.parse(
localStorage.getItem("user")
);

if(!token){

navigate(
"/recruiter/login"
);

return;

}

if(
current?.role!=="recruiter"
){

navigate("/");

return;

}

setUser(current);

fetchJobs();

fetchApplications();

},[]);



const fetchJobs=
async()=>{

try{

const res=
await API.get("/jobs/");

setJobs(
res.data
);

}

catch(err){

console.log(err);

}

};



const fetchApplications=
async()=>{

try{

const res=
await API.get(
"/applications/"
);

setApplications(
res.data
);

}

catch(err){

console.log(err);

}

};



const handleChange=
(e)=>{

setJobForm({

...jobForm,

[e.target.name]:
e.target.value

});

};



// const addJob=
// async()=>{

// try{

// const res=
// await API.post(
// "/jobs/",
// jobForm
// );

// setJobs([
// res.data,
// ...jobs
// ]);

// alert(
// "Job Added"
// );

// setShowAddJob(false);

// }
// catch{

// alert(
// "Failed"
// );

// }

// };
const addJob=
async()=>{

try{

await API.post(
"/jobs/",
jobForm
);

await fetchJobs();

alert(
"Job Added"
);

setShowAddJob(
false
);

}
catch{

alert(
"Failed"
);

}

};

const updateStatus=
async(
id,
status
)=>{

try{

await API.put(
`/applications/${id}/`,
{
status
}
);

fetchApplications();

}
catch{

alert(
"Update Failed"
);

}

};



const logout=()=>{

localStorage.clear();

navigate("/");

};



return(

<div className="recruiter-dashboard">

{/* SIDEBAR */}

<aside
className="recruiter-sidebar"
>

<div>

<div
className="sidebar-logo"
>

<h1>
SmartHire
</h1>

<p>
Recruiter Panel
</p>

</div>

<div
className="profile-box"
>

<div
className="avatar"
>

{
user?.name?.charAt(0)
}

</div>

<div>

<h3>
{user.name}
</h3>

<p>
Recruiter
</p>

</div>

</div>

<nav>

<a href="#dashboard">
📊 Dashboard
</a>

<a href="#jobs">
💼 Jobs
</a>

<a href="/applicants">
📄 Applications
</a>

<a href="#">
📅 Interviews
</a>

<a href="#">
👤 Candidates
</a>

<a href="#">
⚙ Settings
</a>

</nav>

</div>

<div>

<button
className="add-btn"
onClick={()=>
setShowAddJob(true)
}
>

+ Add Job

</button>

<button
className="logout-btn"
onClick={logout}
>

Logout

</button>

</div>

</aside>



{/* MAIN */}

<main
className="recruiter-main"
>

<div
className="top"
>

<h1>

Welcome,

{user.name}

👋

</h1>

<p>
Manage jobs and candidates
</p>

</div>



<div
className="stats"
>

<div
className="card"
>

<h2>
{jobs.length}
</h2>

<p>
Jobs
</p>

</div>

<div
className="card"
>

<h2>
{
applications.length
}
</h2>

<p>
Applications
</p>

</div>

<div
className="card"
>

<h2>

{
applications.filter(
a=>
a.status==="Interview"
).length
}

</h2>

<p>
Interview
</p>

</div>

<div
className="card"
>

<h2>

{
applications.filter(
a=>
a.status==="Offer"
).length
}

</h2>

<p>
Offers
</p>

</div>

</div>



<section
id="jobs"
>

<h2>
Jobs
</h2>

<div
className="job-grid"
>

{

jobs.map(
job=>(

<div
className="job"
key={job.id}
>

<h3>
{job.role}
</h3>

<p>
{job.company}
</p>

<span>
{job.location}
</span>

</div>

)
)

}

</div>

</section>



<section
id="applications"
>

<h2>
Applications
</h2>

<table>

<thead>

<tr>

<th>
User
</th>

<th>
Job
</th>

<th>
Status
</th>

<th>
Action
</th>

</tr>

</thead>

<tbody>

{

applications.map(
app=>(

<tr
key={app.id}
>

<td>
{
app.user_name
}
</td>

<td>
{
app.job_title
}
</td>

<td>
{
app.status
}
</td>

<td>

<button
onClick={()=>
setSelectedApp(app)
}
>

View

</button>

<button
onClick={()=>
updateStatus(
app.id,
"Interview"
)
}
>

Interview

</button>

<button
onClick={()=>
updateStatus(
app.id,
"Offer"
)
}
>

Offer

</button>

</td>

</tr>

)
)

}

</tbody>

</table>

</section>

</main>



{/* ADD JOB */}

{
showAddJob&&(

<div
className="popup"
>

<div
className="popup-box"
>

<h2>
Add Job
</h2>

{

Object.keys(
jobForm
).map(
field=>(

<input
key={field}
name={field}
placeholder={field}
value={
jobForm[field]
}
onChange={
handleChange
}
/>

)
)

}

<button
onClick={addJob}
>

Submit

</button>

<button
onClick={()=>
setShowAddJob(false)
}
>

Close

</button>

</div>

</div>

)
}



{/* PROFILE */}

{
selectedApp&&(

<div
className="popup"
>

<div
className="popup-box"
>

<h2>
Candidate
</h2>

<p>
{
selectedApp.user_name
}
</p>

<p>
{
selectedApp.status
}
</p>

<button
onClick={()=>
setSelectedApp(
null
)
}
>

Close

</button>

</div>

</div>

)
}

</div>

);

};

export default RecruiterDashboard;