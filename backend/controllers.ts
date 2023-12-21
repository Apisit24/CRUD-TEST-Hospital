import { Request, Response } from "express";
import Customer from "./models/Customer";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (error) {
    let errorMessage = "Can not create customer :";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
    
  }
};

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    let errorMessage = "Cannot get customer :";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const item = await Customer.findById(req.params.id);
    res.json(item);
  } catch (error) {
    let errorMessage = "Cannot get customer :";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const updatedItem = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedItem);
  } catch (error) {
    let errorMessage = "Cannot update customer :";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    let errorMessage = "Cannot delete customer :";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
};
