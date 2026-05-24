import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../../api/api";

import "../../styles/Dashboard.css";

const Dashboard = () => {

const navigate = useNavigate();

const [user,setUser]=useState(null);

const [jobs,setJobs]=useState([]);

const [applications,setApplications]=
useState([]);

const [search,setSearch]=
useState("");

const [selectedJob,setSelectedJob]=
useState(null);

const [loading,setLoading]=
useState(true);


// ====================
// LOAD
// ====================
useEffect(()=>{

const token=
localStorage.getItem(
"access"
);

if(!token){

navigate("/log");

return;

}

loadDashboard();

},[]);



const loadDashboard=
async()=>{

try{

setLoading(true);


// PROFILE

const profile=
await API.get(
"/users/profile/"
);

setUser(
profile.data
);


// BLOCK

if(
profile.data.role
===
"recruiter"
){

navigate(
"/recruiter-dashboard"
);

return;

}


// JOBS

const jobs=
await API.get(
"/jobs/"
);

setJobs(
jobs.data
);


// APPLICATIONS

const apps=
await API.get(
"/applications/"
);

setApplications(
apps.data
);

}

catch{

navigate(
"/log"
);

}

finally{

setLoading(false);

}

};

// ====================
// APPLY
// ====================
const applyJob=
async(jobId)=>{

try{

const res=

await API.post(

"/applications/",

{

job:jobId

}

);

setApplications(

prev=>

[

...prev,

res.data

]

);

alert(
"Applied Successfully"
);

}

catch(err){

alert(

err.response
?.data
?.error

||

"Apply Failed"

);

}

};


// ====================
// LOGOUT
// ====================
const handleLogout=
()=>{

localStorage.clear();

navigate(
"/log"
);

};


// ====================
// FILTER
// ====================
const filteredJobs=

jobs.filter(

job=>

job.role

?.toLowerCase()

.includes(

search
.toLowerCase()

)

);


// ====================
// COUNT
// ====================
const count=
status=>

applications.filter(

x=>

x.status===status

).length;


// ====================
// UI
// ====================
return(

<div className="dashboard">

<aside className="sidebar">

<h2 className="logo">

SmartJob

</h2>

<ul>

<li>

<Link to="/dashboard">

Dashboard

</Link>

</li>

<li>

<Link to="/applications">

My Applications

</Link>

</li>

<li>

<Link to="/analytics">

Analytics

</Link>

</li>

<li>

<Link to="/profile">

Profile

</Link>

</li>

<li>

<button

className="logout-btn"

onClick={
handleLogout
}

>

Logout

</button>

</li>

</ul>

</aside>


<main className="main">

<div className="top-bar">

<h1>

Welcome

<span className="username">

{" "}

{

user?.name

||

"User"

}

</span>

👋

</h1>

</div>


<div className="search-box">

<input

type="text"

placeholder="Search jobs"

value={search}

onChange={

e=>

setSearch(
e.target.value
)

}

/>

</div>


<div className="stats">

<div className="stat-card applied-card">

<h2>{count("Applied")}</h2>

<p>Applied</p>

</div>

<div className="stat-card interview-card">

<h2>{count("Interview")}</h2>

<p>Interview</p>

</div>

<div className="stat-card offer-card">

<h2>{count("Offer")}</h2>

<p>Offers</p>

</div>

<div className="stat-card rejected-card">

<h2>{count("Rejected")}</h2>

<p>Rejected</p>

</div>

</div>


<section className="jobs-section">

<h2>

Available Jobs

</h2>

<div className="jobs-grid">

{

loading

?

<h3>

Loading...

</h3>

:

filteredJobs.length

?

filteredJobs.map(

job=>(

<div

key={job.id}

className="job-card"

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

<div className="job-buttons">

<button

className="apply-btn"

onClick={()=>

applyJob(
job.id
)

}

>

Apply

</button>

<button

className="view-btn"

onClick={()=>

setSelectedJob(
job
)

}

>

View

</button>

</div>

</div>

)

)

:

<h3>

No Jobs Available

</h3>

}

</div>

</section>

</main>


{

selectedJob

&&

<div className="popup-overlay">

<div className="popup">

<h2>

{selectedJob.role}

</h2>

<p>

Company:
{selectedJob.company}

</p>

<p>

Location:
{selectedJob.location}

</p>

<p>

Salary:
{selectedJob.salary}

</p>

<p>

Skill:
{selectedJob.skill}

</p>

<p>

Experience:
{selectedJob.experience}

</p>

<p>

Description:
{selectedJob.description}

</p>

<button

className="close-btn"

onClick={()=>

setSelectedJob(
null
)

}

>

Close

</button>

</div>

</div>

}

</div>

);

};

export default Dashboard;