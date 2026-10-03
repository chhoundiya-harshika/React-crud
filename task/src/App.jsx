import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/purchase";

function App() {

  const [purchases, setPurchases] = useState([]);

  const [form, setForm] = useState({
    employeeName: "",
    department: "Development",
    itemName: "",
    category: "Electronics",
    quantity: "",
    unitPrice: "",
    requestDate: ""
  });

  const [editId, setEditId] = useState(null);

  // ---------------- GET DATA ----------------

  const getData = async () => {

    try {

      const res = await axios.get(API);

      setPurchases(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    getData();

  }, []);

  // ---------------- CHANGE ----------------

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ---------------- TOTAL ----------------

  const totalAmount =
    Number(form.quantity || 0) *
    Number(form.unitPrice || 0);

  // ---------------- SUBMIT ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.employeeName === "" ||
      form.itemName === "" ||
      form.quantity === "" ||
      form.unitPrice === "" ||
      form.requestDate === ""
    ) {

      alert("Please fill all fields");

      return;
    }

    // Office Supplies limit
    if (
      form.category === "Office Supplies" &&
      totalAmount > 20000
    ) {

      alert(
        "Office Supplies purchase cannot exceed ₹20,000"
      );

      return;
    }

    // Electronics limit
    if (
      form.category === "Electronics" &&
      totalAmount > 75000
    ) {

      alert(
        "Electronics purchase cannot exceed ₹75,000"
      );

      return;
    }

    const data = {

      ...form,

      quantity: Number(form.quantity),

      unitPrice: Number(form.unitPrice),

      totalAmount: totalAmount,

      status: "Pending"

    };

    try {

      if (editId === null) {

        await axios.post(API, data);

        alert("Purchase Request Added");

      } else {

        await axios.put(`${API}/${editId}`, {

          ...data,

          id: editId

        });

        alert("Purchase Request Updated");

        setEditId(null);
      }

      clearForm();

      getData();

    } catch (error) {

      console.log(error);

    }

  };

  // ---------------- EDIT ----------------

  const handleEdit = (item) => {

    if (item.status !== "Pending") {

      alert(
        "Only pending requests can be edited"
      );

      return;
    }

    setEditId(item.id);

    setForm({

      employeeName: item.employeeName,

      department: item.department,

      itemName: item.itemName,

      category: item.category,

      quantity: item.quantity,

      unitPrice: item.unitPrice,

      requestDate: item.requestDate

    });

  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id, status) => {

    if (status !== "Pending") {

      alert(
        "Only pending requests can be deleted"
      );

      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete?"
      )
    ) {

      await axios.delete(`${API}/${id}`);

      alert("Deleted Successfully");

      getData();

    }

  };

  // ---------------- APPROVE ----------------

  const handleApprove = async (id) => {

    await axios.patch(`${API}/${id}`, {

      status: "Approved"

    });

    getData();

  };

  // ---------------- REJECT ----------------

  const handleReject = async (id) => {

    await axios.patch(`${API}/${id}`, {

      status: "Rejected"

    });

    getData();

  };

  // ---------------- CLEAR ----------------

  const clearForm = () => {

    setForm({

      employeeName: "",
      department: "Development",
      itemName: "",
      category: "Electronics",
      quantity: "",
      unitPrice: "",
      requestDate: ""

    });

    setEditId(null);

  };

  // ---------------- UI ----------------

  return (

    <div style={{ padding: "30px" }}>

      <h1>Purchase Request Management</h1>

      <hr />

      <h2>

        {editId === null
          ? "Add Purchase Request"
          : "Update Purchase Request"}

      </h2>

      <form onSubmit={handleSubmit}>

        {/* Employee */}

        <label>Employee Name : </label>

        <input
          type="text"
          name="employeeName"
          value={form.employeeName}
          onChange={handleChange}
        />

        <br />
        <br />

        {/* Department */}

        <label>Department : </label>

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
        >

          <option>Development</option>
          <option>HR</option>
          <option>Testing</option>
          <option>Finance</option>
          <option>Sales</option>

        </select>

        <br />
        <br />

        {/* Item */}

        <label>Item Name : </label>

        <input
          type="text"
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
        />

        <br />
        <br />

        {/* Category */}

        <label>Category : </label>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >

          <option>Electronics</option>
          <option>Office Supplies</option>
          <option>Furniture</option>
          <option>Software</option>
          <option>Other</option>

        </select>

        <br />
        <br />

        {/* Quantity */}

        <label>Quantity : </label>

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <br />
        <br />

        {/* Unit Price */}

        <label>Unit Price : </label>

        <input
          type="number"
          name="unitPrice"
          value={form.unitPrice}
          onChange={handleChange}
        />

        <br />
        <br />

        {/* Date */}

        <label>Request Date : </label>

        <input
          type="date"
          name="requestDate"
          value={form.requestDate}
          onChange={handleChange}
        />

        <br />
        <br />

        <h3>

          Total Amount : ₹
          {totalAmount}

        </h3>

        {totalAmount > 50000 && (

          <p style={{ color: "red" }}>

            Senior Manager Approval Required

          </p>

        )}

        <button type="submit">

          {editId === null
            ? "Add Request"
            : "Update Request"}

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

      <h2>All Purchase Requests</h2>

      <table
        border="1"
        cellPadding="10"
      >

        <thead>

          <tr>

            <th>Employee</th>
            <th>Department</th>
            <th>Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {purchases.map((item) => (

            <tr key={item.id}>

              <td>{item.employeeName}</td>

              <td>{item.department}</td>

              <td>{item.itemName}</td>

              <td>{item.category}</td>

              <td>{item.quantity}</td>

              <td>₹{item.unitPrice}</td>

              <td>₹{item.totalAmount}</td>

              <td>{item.requestDate}</td>

              <td>{item.status}</td>

              <td>

                {item.status === "Pending" && (

                  <>

                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                    >
                      Edit
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        handleDelete(
                          item.id,
                          item.status
                        )
                      }
                    >
                      Delete
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        handleApprove(item.id)
                      }
                    >
                      Approve
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        handleReject(item.id)
                      }
                    >
                      Reject
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