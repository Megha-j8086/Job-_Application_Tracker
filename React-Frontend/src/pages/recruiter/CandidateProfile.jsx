import React,{
useEffect,
useState
}
from "react";

import {
useNavigate
}
from "react-router-dom";

import API from "../../api/api";

import "../../styles/Applicants.css";

const Applicants=()=>{

const navigate=
useNavigate();

const[
applications,
setApplications
]=useState([]);

const[
loading,
setLoading
]=useState(true);


// LOAD
useEffect(()=>{

fetchApplications();

},[]);


const fetchApplications=
async()=>{

try{

setLoading(true);

const res=

await API.get(
"/applications/"
);

console.log(
res.data
);

setApplications(
res.data||[]
);

}

catch(err){

console.log(err);

alert(
"Failed loading applications"
);

}

finally{

setLoading(false);

}

};


// UPDATE
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

setApplications(

prev=>

prev.map(

a=>

a.id===id

?

{
...a,
status
}

:

a

)

);

}

catch(err){

console.log(err);

alert(

err.response?.data?.error

||

"Status update failed"

);

}

};


// VIEW PROFILE
const viewProfile=
(userId)=>{

if(!userId){

alert(
"User id missing"
);

return;

}

navigate(

`/candidate/${userId}`

);

};


return(

<div className="applicants-page">

<button

className="back-btn"

onClick={()=>

navigate(
"/recruiter-dashboard"
)

}

>

← Back

</button>


<h1>

Job Applications

</h1>


{

loading

?

(

<h3>

Loading...

</h3>

)

:

applications.length===0

?

(

<h3>

No Applications

</h3>

)

:

(

applications.map(

app=>(

<div

key={app.id}

className="app-card"

>

<h2>

{

app.user_name

||

"Applicant"

}

</h2>


<p>

<strong>

Email:

</strong>

{" "}

{

app.user_email

||

"-"

}

</p>


<p>

<strong>

Company:

</strong>

{" "}

{

app.company

||

"-"

}

</p>


<p>

<strong>

Job:

</strong>

{" "}

{

app.job_title

||

"-"

}

</p>


<p>

<strong>

Status:

</strong>

{" "}

<span className="status">

{

app.status

}

</span>

</p>


<p>

<strong>

Applied:

</strong>

{" "}

{

app.applied_at

?.split("T")[0]

||

"-"

}

</p>


<div className="actions">

<button

className="profile-btn"

onClick={()=>

viewProfile(

app.user_id

||

app.user

)

}

>

View Profile

</button>


<button

className="interview-btn"

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

className="offer-btn"

onClick={()=>

updateStatus(
app.id,
"Offer"
)

}

>

Offer

</button>


<button

className="reject-btn"

onClick={()=>

updateStatus(
app.id,
"Rejected"
)

}

>

Reject

</button>

</div>

</div>

)

)

)

}

</div>

);

};

export default Applicants;