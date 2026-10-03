import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/services";

function App() {

  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    vehicleNumber: "",
    vehicleType: "Car",
    serviceType: "Basic Service",
    bookingDate: ""
  });

  const [editId, setEditId] = useState(null);

  // ---------------- LOAD DATA ----------------

  const load = async () => {
    try {
      const res = await axios.get(API);
      setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ---------------- INPUT CHANGE ----------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- SERVICE CHARGE ----------------

  const calculateCharge = () => {

    let charge = 0;

    if (form.serviceType === "Basic Service") {
      charge = 1000;
    }
    else if (form.serviceType === "Full Service") {
      charge = 3000;
    }
    else if (form.serviceType === "Engine Check") {
      charge = 2500;
    }
    else if (form.serviceType === "Washing") {
      charge = 500;
    }
    else if (form.serviceType === "Tyre Service") {
      charge = 1500;
    }

    // Car has additional Rs.500
    if (form.vehicleType === "Car") {
      charge = charge + 500;
    }

    return charge;
  };

  // ---------------- ADD / UPDATE ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.customerName === "" ||
      form.vehicleNumber === "" ||
      form.bookingDate === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const serviceCharge = calculateCharge();

    const data = {
      ...form,
      serviceCharge: serviceCharge,
      status: "Pending"
    };

    try {

      if (editId === null) {

        await axios.post(API, data);

        alert("Booking Added Successfully");

      } else {

        await axios.put(`${API}/${editId}`, {
          ...data,
          id: editId
        });

        alert("Booking Updated Successfully");

        setEditId(null);
      }

      setForm({
        customerName: "",
        vehicleNumber: "",
        vehicleType: "Car",
        serviceType: "Basic Service",
        bookingDate: ""
      });

      load();

    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- EDIT ----------------

  const handleEdit = (item) => {

    if (item.status !== "Pending") {
      alert("Only pending booking can be edited");
      return;
    }

    setEditId(item.id);

    setForm({
      customerName: item.customerName,
      vehicleNumber: item.vehicleNumber,
      vehicleType: item.vehicleType,
      serviceType: item.serviceType,
      bookingDate: item.bookingDate
    });
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id, status) => {

    if (status !== "Pending") {
      alert("Only pending booking can be deleted");
      return;
    }

    // if (window.confirm("Are you sure you want to delete?")) {

    //   await axios.delete(`${API}/${id}`);

    //   alert("Booking Deleted");

      load();
  //}
  };

  // ---------------- CONFIRM ----------------

  const handleConfirm = async (id) => {

    await axios.patch(`${API}/${id}`, {
      status: "Confirmed"
    });

    load();
  };

  // ---------------- CANCEL ----------------

  const handleCancel = async (id) => {

    await axios.patch(`${API}/${id}`, {
      status: "Cancelled"
    });

    load();
  };

  // ---------------- CLEAR FORM ----------------

  const clearForm = () => {

    setForm({
      customerName: "",
      vehicleNumber: "",
      vehicleType: "Car",
      serviceType: "Basic Service",
      bookingDate: ""
    });

    setEditId(null);
  };

  // ---------------- UI ----------------

  return (

    <div style={{ padding: "30px" }}>

      <h1>Vehicle Service Booking Management</h1>

      <hr />

      {/* FORM */}

      <h2>
        {editId === null
          ? "Add Service Booking"
          : "Update Service Booking"}
      </h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Customer Name : </label>

          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Vehicle Number : </label>

          <input
            type="text"
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Vehicle Type : </label>

          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
          >

            <option>Car</option>
            <option>Bike</option>
            <option>Scooter</option>

          </select>

        </div>

        <br />

        <div>

          <label>Service Type : </label>

          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
          >

            <option>Basic Service</option>
            <option>Full Service</option>
            <option>Engine Check</option>
            <option>Washing</option>
            <option>Tyre Service</option>

          </select>

        </div>

        <br />

        <div>

          <label>Booking Date : </label>

          <input
            type="date"
            name="bookingDate"
            value={form.bookingDate}
            onChange={handleChange}
          />

        </div>

        <br />

        <h3>
          Service Charge : ₹{calculateCharge()}
        </h3>

        {calculateCharge() > 3000 && (

          <p style={{ color: "red" }}>
            Premium service approval required
          </p>

        )}

        <button type="submit">

          {editId === null
            ? "Add Booking"
            : "Update Booking"}

        </button>

        {" "}

        <button
          type="button"
          onClick={clearForm}
        >
          Clear
        </button>

      </form>

      <hr />

      {/* TABLE */}

      <h2>All Service Bookings</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Customer</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
            <th>Service</th>
            <th>Charge</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {services.map((item) => (

            <tr key={item.id}>

              <td>{item.customerName}</td>

              <td>{item.vehicleNumber}</td>

              <td>{item.vehicleType}</td>

              <td>{item.serviceType}</td>

              <td>₹{item.serviceCharge}</td>

              <td>{item.bookingDate}</td>

              <td>{item.status}</td>

              <td>

                {item.status === "Pending" && (

                  <>

                    <button
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        handleDelete(item.id, item.status)
                      }
                    >
                      Delete
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        handleConfirm(item.id)
                      }
                    >
                      Confirm
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        handleCancel(item.id)
                      }
                    >
                      Cancel
                    </button>

                  </>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default App;