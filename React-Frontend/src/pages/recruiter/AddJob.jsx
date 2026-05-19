import React, {
  useState
} from "react";

import RecruiterSidebar from "../../components/RecruiterSidebar";

const AddJob = () => {

  const [form, setForm] = useState({

    company: "",
    role: "",
    skill: "",
    experience: "",
    location: "",
    salary: "",
    description: ""

  });

  const handleChange = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value

    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(form);

    alert("Job Added");
  };

  return (

    <div className="dashboard-container">

      <RecruiterSidebar />

      <div className="page-content">

        <h1>Add Job</h1>

        <form
          className="job-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={handleChange}
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleChange}
          />

          <input
            type="text"
            name="skill"
            placeholder="Skills"
            onChange={handleChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <button type="submit">
            Add Job
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddJob;