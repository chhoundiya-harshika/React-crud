import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowCollege = ({ refresh, updateCollege }) => {
  const [allcollege, setAllCollege] = useState([]);

const loadsAllCollege = async () => {
  try {
    const response = await axios.get("http://localhost:4500/registrations");

    console.log("API Response:", response);

    console.log("Data:", response.data);

    setAllCollege(response.data);
  } catch (err) {
    console.log("Error:", err);
  }
};

  useEffect(() => {
    loadsAllCollege();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/registrations/${id}`);
      loadsAllCollege();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>ALL COLLEGE</h2>

      <table border="2">
        <thead>
          <tr>
            <th>Registration ID</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Faculty Name</th>
            <th>Registration Date</th>
            <th>Fees</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allcollege.length > 0 ? (
            allcollege.map((e) => (
              <tr key={e.id}>
                <td>{e.registrationId}</td>
                <td>{e.studentName}</td>
                <td>{e.courseName}</td>
                <td>{e.department}</td>
                <td>{e.semester}</td>
                <td>{e.facultyName}</td>
                <td>{e.registrationDate}</td>
                <td>{e.fees}</td>
                <td>{e.email}</td>
                <td>{e.mobileNumber}</td>

                <td>
                  <button onClick={() => handleDelete(e.id)}>
                    Delete
                  </button>

                  {" "}

                  <button onClick={() => updateCollege(e)}>
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCollege;