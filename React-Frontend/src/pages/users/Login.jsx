// import React, { useState } from "react";
// import "../../styles/Login.css";
// import API from "../../api/api";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   // ✅ FIX: backend expects username, not email
//   const [form, setForm] = useState({
//     username: "",
//     password: ""
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//  const handleSubmit=async(e)=>{

// e.preventDefault();

// try{

// const res=
// await API.post(
// "/users/login/",
// form
// );

// localStorage.clear();

// localStorage.setItem(
// "access",
// res.data.access
// );

// localStorage.setItem(
// "refresh",
// res.data.refresh
// );

// localStorage.setItem(

// "user",

// JSON.stringify(
// res.data.user
// )

// );

// if(
// res.data.user.role
// ===
// "recruiter"
// ){

// navigate(
// "/recruiter-dashboard"
// );

// }

// else{

// navigate(
// "/dashboard"
// );

// }

// }

// catch(err){

// setError(

// err.response?.data?.error

// ||

// "Login Failed"

// );

// }

// };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>

//         <h2>Login</h2>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {/* ✅ FIXED FIELD NAME */}
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter Email"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" className="btn primary">
//           Login
//         </button>

//         <p className="switch-link">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>

//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import "../../styles/Login.css";
import API from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // CLEAR OLD USER FIRST
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      const res = await API.post(
        "/users/login/",
        {
          username: form.username.trim().toLowerCase(),
          password: form.password,
        }
      );

      console.log("LOGIN:", res.data);

      // SAVE NEW USER
      localStorage.setItem(
        "access",
        res.data.access
      );

      localStorage.setItem(
        "refresh",
        res.data.refresh
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Success");

      // ROLE REDIRECT
      if (
        res.data.user.role === "recruiter"
      ) {

        navigate(
          "/recruiter-dashboard"
        );

      }

      else if (
        res.data.user.role === "admin"
      ) {

        navigate(
          "/admin-dashboard"
        );

      }

      else {

        navigate(
          "/dashboard"
        );

      }

    }

    catch (err) {

      console.log(
        err.response?.data
      );

      setError(

        err.response?.data?.error ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        {error && (

          <p style={{ color: "red" }}>
            {error}
          </p>

        )}

        <input
          type="text"
          name="username"
          placeholder="Enter Email"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn primary"
        >
          Login
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