import {Router} from "express";
import { getStats } from "../controllers/statController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { requireAdmmin } from "../middlewares/requireAdmin.js";
const router = Router();

router.get("/",protectRoute,requireAdmin,getStats);
export default router;
