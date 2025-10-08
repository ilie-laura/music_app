import {Router} from "express";
import { getTrendingSongs, getAllSongs, getFeaturedSongs,getMadeForYou } from "../controllers/songController.js";
import  {protectRoute ,requireAdmin} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/",protectRoute,requireAdmin,getAllSongs);
router.get("/featured",getFeaturedSongs);
router.get("/made-for-you",getMadeForYou);

router.get("/trending",getTrendingSongs);

export default router;
