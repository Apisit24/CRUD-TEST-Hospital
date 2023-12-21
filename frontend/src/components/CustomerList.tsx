import React, { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "../types";

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modalState, setModalState] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get<Customer[]>(
        "http://localhost:3000/api/customers"
      );
      setCustomers(response.data);
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/customers/${customerId}`);
      const updatedCustomers = await axios.get<Customer[]>(
        "http://localhost:3000/api/customers"
      );
      alert("Delete customer completed!");
      setCustomers(updatedCustomers.data);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  function handleOpen() {
    setModalState(false);
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleModalClose = () => {
    setSelectedCustomer(null);
    setModalState(true);
  };

  const handleUpdateCustomer = async (updatedCustomer: Customer) => {
    try {
      await axios.put(
        `http://localhost:3000/api/customers/${updatedCustomer._id}`,
        updatedCustomer
      );

      const updatedCustomers = await axios.get<Customer[]>(
        "http://localhost:3000/api/customers"
      );
      setCustomers(updatedCustomers.data);

      handleModalClose();

      alert("Update customer completed!");
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="px-5">
      <h2 className="text-4xl ">Customer List</h2>
      <div className="flex justify-center py-4 gap-5 flex-wrap ">
        {customers.map((customer) => (
          <div className="text-wrap">
            <div
              key={customer._id}
              className="w-64 my-2 text-wrap flex-wrap bg-gray-200 p-4 rounded-lg"
            >
              <h1>
                Name : {customer.fname} {customer.lname} <br />
                Age : {customer.age}
              </h1>
              <h1>
                Congenital Disease : <br />
                {customer.congenitalDisease}
              </h1>
              <h1>
                Drug Allergy : <br />
                {customer.drugAllergy}{" "}
              </h1>
              <div className="flex justify-center gap-2 my-2 ">
                <button
                  className="rounded-full bg-yellow-400 p-1 w-20 text-white"
                  onClick={() => {
                    handleEditCustomer(customer);
                    handleOpen();
                  }}
                >
                  Edit
                </button>
                <button
                  className="rounded-full bg-red-400 p-1 w-20 text-white"
                  onClick={() => handleDeleteCustomer(customer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCustomer && (
        <div
          className="fixed inset-0 h-[500pxfixed] bg-black my-auto  transition-opacity flex flex-col border-2 border-gray-500 rounded-xl w-[400px] p-4 mx-auto "
          hidden={modalState}
        >
          <div className="flex justify-end">
            <button
              onClick={handleModalClose}
              className="text-white hover:text-red-600"
            >
              Close
            </button>
          </div>
          <div className="modal-content justify-center w-auto">
            <h2 className="text-white">Edit Customer</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCustomer(selectedCustomer);
              }}
            >
              <div className="my-1">
                <label className="text-sm mr-4 text-white">First Name:</label>
                <input
                  className="border-2 border-gray-500 px-4 py-0 w-full"
                  type="text"
                  value={selectedCustomer.fname}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      fname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="my-1">
                <label className="text-sm mr-4 text-white">Last Name:</label>
                <input
                  className="border-2 border-gray-500 px-4 py-0 w-full"
                  type="text"
                  value={selectedCustomer.lname}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      lname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="my-1">
                <label className="text-sm mr-4 text-white">Age:</label>
                <input
                  className="border-2 border-gray-500 px-4 py-0 w-full"
                  type="text"
                  value={selectedCustomer.age}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      age: e.target.value,
                    })
                  }
                />
              </div>
              <div className="my-1">
                <label className="text-sm mr-4 text-white">
                  Congenital Disease:
                </label>
                <input
                  className="border-2 border-gray-500 px-4 py-0 w-full"
                  type="text"
                  value={selectedCustomer.congenitalDisease}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      congenitalDisease: e.target.value,
                    })
                  }
                />
              </div>
              <div className="my-1">
                <label className="text-sm mr-4 text-white">Drug Allergy:</label>
                <input
                  className="border-2 border-gray-500 px-4 py-0 w-full"
                  type="text"
                  value={selectedCustomer.drugAllergy}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      drugAllergy: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-center ">
                <button
                  className="bg-teal-400  rounded-full p-2 hover:bg-orange-500"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
