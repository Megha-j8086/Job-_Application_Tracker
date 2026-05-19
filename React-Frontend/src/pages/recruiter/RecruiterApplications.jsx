import React, {
  useEffect,
  useState,
} from "react";

import API from "../../api/api";

const RecruiterApplications = () => {

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    const res = await API.get(
      "/recruiter/applications/"
    );

    setApplications(res.data);

  };

  const updateStatus = async (
    id,
    status
  ) => {

    await API.put(
      `/recruiter/applications/update/${id}/`,
      { status }
    );

    fetchApplications();

  };

  return (

    <div>

      <h1>
        Recruiter Applications
      </h1>

      {applications.map((app) => (

        <div key={app.id}>

          <h3>
            {app.role}
          </h3>

          <p>
            {app.company}
          </p>

          <p>
            Candidate:
            {app.user_name}
          </p>

          <p>
            {app.status}
          </p>

          <button
            onClick={() =>
              updateStatus(
                app.id,
                "Interview"
              )
            }
          >
            Interview
          </button>

          <button
            onClick={() =>
              updateStatus(
                app.id,
                "Offer"
              )
            }
          >
            Offer
          </button>

          <button
            onClick={() =>
              updateStatus(
                app.id,
                "Rejected"
              )
            }
          >
            Reject
          </button>

        </div>

      ))}

    </div>
  );
};

export default RecruiterApplications;