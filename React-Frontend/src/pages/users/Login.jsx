import React, { useState } from "react";

import "../../styles/Login.css";

import API from "../../api/api";

import {
useNavigate,
Link
}
from "react-router-dom";


const Login=()=>{

const navigate=
useNavigate();

const [form,setForm]=
useState({

username:"",
password:""

});

const [error,setError]=
useState("");

const [loading,setLoading]=
useState(false);


// ====================
// INPUT
// ====================

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:

e.target.value

});

};


// ====================
// LOGIN
// ====================

const handleSubmit=
async(e)=>{

e.preventDefault();

setError("");

try{

setLoading(true);


// REMOVE OLD AUTH ONLY

localStorage.removeItem(
"access"
);

localStorage.removeItem(
"refresh"
);

localStorage.removeItem(
"user"
);


// LOGIN

const res=

await API.post(

"/users/login/",

{

username:

form.username

.trim()

.toLowerCase(),

password:

form.password

}

);


const {

access,

refresh,

user

}=res.data;


// SAVE

localStorage.setItem(

"access",

access

);

localStorage.setItem(

"refresh",

refresh

);

localStorage.setItem(

"user",

JSON.stringify({

id:user.id,

name:user.name,

email:user.email,

role:user.role,

is_staff:

user.is_staff

})

);


// ====================
// REDIRECT
// ====================

if(

user.is_staff

||

user.role==="admin"

){

navigate(

"/admin-dashboard",

{

replace:true

}

);

return;

}


if(

user.role==="recruiter"

){

navigate(

"/recruiter-dashboard",

{

replace:true

}

);

return;

}


navigate(

"/dashboard",

{

replace:true

}

);

}

catch(err){

console.log(err);

setError(

err.response

?.data

?.error

||

"Invalid Email or Password"

);

}

finally{

setLoading(false);

}

};


return(

<div className="auth-container">

<form

className="auth-form"

onSubmit={handleSubmit}

>

<h2>

Login

</h2>


{

error

&&

<p
style={{
color:"red"
}}
>

{error}

</p>

}


<input

type="email"

name="username"

placeholder=

"Enter Email"

value=

{form.username}

onChange=

{handleChange}

required

/>


<input

type="password"

name="password"

placeholder=

"Enter Password"

value=

{form.password}

onChange=

{handleChange}

required

/>


<button

type="submit"

className="btn primary"

disabled={loading}

>

{

loading

?

"Logging in..."

:

"Login"

}

</button>


<p className="switch-link">

Don't have account?

<Link to="/register">

Register

</Link>

</p>

</form>

</div>

);

};

export default Login;