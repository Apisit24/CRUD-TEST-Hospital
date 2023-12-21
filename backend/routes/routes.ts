import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers";

const router = express.Router();

router.post("/customers", createCustomer);
router.get("/customers", getCustomers); 
router.get("/customers/:id", getCustomerById); 
router.put("/customers/:id", updateCustomer); 
router.delete("/customers/:id", deleteCustomer);

export default router;
