import React from 'react';
import CustomerList from './components/CustomerList';
import AddCustomerForm from './components/AddCustomerForm';
import { Customer } from './types';
import './App.css'

function App() {
  const handleAddCustomer = (newCustomer: Customer) => {
    console.log('New customer added:', newCustomer);
  };

  return (
    <div>
      <AddCustomerForm onAdd={handleAddCustomer} />
      <CustomerList />
    </div>
  );
}

export default App;
