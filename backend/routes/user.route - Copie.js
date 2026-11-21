import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  signOut,
  test,
  updateUser,
  makeAdmin,
  removeAdmin,
  toggleVerifyUser
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

router.get("/test", test);
router.post("/create", createUser);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.put("/makeadmin/:userId", verifyUser, makeAdmin);
router.put("/verify/:userId", verifyUser, toggleVerifyUser);
router.put("/removeadmin/:userId", verifyUser, removeAdmin);
router.post("/signout", signOut);
router.get("/getusers", verifyUser, getUsers);
router.get("/:userId", getUser);

export default router;
