import {Router} from "express";
import { getAllUsers } from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router=Router();

router.get("/",protectRoute,getAllUsers);
//++messages
export default router;
