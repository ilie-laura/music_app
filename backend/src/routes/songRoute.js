import {Router} from "express";
import { getTrendingSongsSong, getAllSongs, getFeaturedSongs,getMadeForyou } from "../controllers/songController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";
const router = Router();

router.get("/",protectRoute,requireAdmin,getAllSongs);
router.get("/featured",getFeaturedSongs);
router.get("/made-for-you",getMadeForYou);

router.get("/trending",getTrendingSongs);

export default router;
