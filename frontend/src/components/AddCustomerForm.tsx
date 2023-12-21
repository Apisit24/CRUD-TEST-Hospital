import React, { useState } from "react";
import axios from "axios";
import { Customer } from "../types";
import "../App.css";

interface AddCustomerFormProps {
  onAdd: (newCustomer: Customer) => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onAdd }) => {
  const [fname, setName] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [congenitalDisease, setCongenitalDisease] = useState("");
  const [drugAllergy, setDrugAllergy] = useState("");
  const [box, setBox] = useState(true);

  function handleHidden() {
    setBox(false);
  }

  function handleClose() {
    if (fname === "" && lname === "") {
      setBox(false);
      alert("Please fill First Name and Last Name");
    } else {
      alert("Add completed successfully");
      setBox(true);
    }
  }

  function handleCloseOnly() {
    setBox(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<Customer>(
        "http://localhost:3000/api/customers",
        {
          fname,
          lname,
          age,
          congenitalDisease,
          drugAllergy,
        }
      );
      onAdd(response.data);
      setName("");
      setLname("");
      setAge("");
      setCongenitalDisease("");
      setDrugAllergy("");
      window.location.reload(); 
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="p-4">
      <h2>
        <button
          className="bg-teal-400 rounded-full p-2 hover:bg-orange-500 text-2xl my-4"
          onClick={handleHidden}
          type="submit"
        >
          Add Patient
        </button>
      </h2>
      <form onSubmit={handleSubmit} hidden={box}>
        <div className="fixed inset-0 h-[500pxfixed] bg-black my-auto  transition-opacity flex flex-col border-2 border-gray-500 rounded-xl w-[400px] p-4 mx-auto">
          <button
            className="flex justify-end rounded-full text-white hover:text-red-600"
            onClick={handleCloseOnly}
          >
            Close
          </button>
          <div className="my-1">
            <label className="text-sm mr-4 text-white">*Firstname:</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-0 w-full"
              required
            />
          </div>
          <div className="my-1">
            <label className="text-sm mr-4 text-white">*Lastname: </label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="border-2 border-gray-500 px-4 py-0 w-full"
              required
            />
          </div>
          <div className="my-1">
            <label className="text-sm mr-4 text-white">age:</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-2 border-gray-500 px-4 py-0 w-full"
            />
          </div>
          <div className="my-1">
            <label className="text-sm mr-4 text-white">
              Congenital Disease:
            </label>
            <input
              type="text"
              value={congenitalDisease}
              onChange={(e) => setCongenitalDisease(e.target.value)}
              className="border-2 border-gray-500 px-4 py-0 w-full"
            />
          </div>
          <div className="my-1">
            <label className="text-sm mr-4 text-white">Drug Allergy: </label>
            <input
              type="text"
              value={drugAllergy}
              onChange={(e) => setDrugAllergy(e.target.value)}
              className="border-2 border-gray-500 px-4 py-0 w-full"
            />
          </div>
          <div className="flex justify-center ">
            <button
              className="bg-teal-400  rounded-full p-2 hover:bg-orange-500"
              type="submit"
              onClick={handleClose}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
