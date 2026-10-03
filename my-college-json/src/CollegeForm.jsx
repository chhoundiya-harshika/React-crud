import React, { useEffect, useState } from "react";
import axios from "axios";

const CollegeForm = ({ added, acceptEdit }) => {
  const [form, setForm] = useState({
    registrationId: "",
    studentName: "",
    courseName: "",
    department: "",
    semester: "6",
    facultyName: "",
    registrationDate: "",
    fees: 45000,
    email: "",
    mobileNumber: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (acceptEdit) {
      setForm(acceptEdit);
    }
  }, [acceptEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (acceptEdit) {
        await axios.put(
          `http://localhost:4500/registrations/${form.id}`,
          form
        );
      } else {
        await axios.post(
          "http://localhost:4500/registrations",
          form
        );
      }

      // Refresh table
      added();

      // Clear form
      setForm({
        registrationId: "",
        studentName: "",
        courseName: "",
        department: "",
        semester: "6",
        facultyName: "",
        registrationDate: "",
        fees: 45000,
        email: "",
        mobileNumber: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>
        {acceptEdit ? "Update College Form" : "Add College Form"}
      </h2>

      <form onSubmit={handleSubmit}>
        Registration ID:
        <input
          type="text"
          name="registrationId"
          value={form.registrationId}
          onChange={handlechange}
        />
        <br />

        Student Name:
        <input
          type="text"
          name="studentName"
          value={form.studentName}
          onChange={handlechange}
        />
        <br />

        Course Name:
        <input
          type="text"
          name="courseName"
          value={form.courseName}
          onChange={handlechange}
        />
        <br />

        Department:
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handlechange}
        />
        <br />

        Semester:
        <input
          type="text"
          name="semester"
          value={form.semester}
          onChange={handlechange}
        />
        <br />

        Faculty Name:
        <input
          type="text"
          name="facultyName"
          value={form.facultyName}
          onChange={handlechange}
        />
        <br />

        Registration Date:
        <input
          type="date"
          name="registrationDate"
          value={form.registrationDate}
          onChange={handlechange}
        />
        <br />

        Fees:
        <input
          type="number"
          name="fees"
          value={form.fees}
          onChange={handlechange}
        />
        <br />

        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handlechange}
        />
        <br />

        Mobile Number:
        <input
          type="text"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handlechange}
        />
        <br />

        <button type="submit">
          {acceptEdit ? "Update College" : "Add College"}
        </button>
      </form>
    </div>
  );
};

export default CollegeForm;