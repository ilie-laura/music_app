import {Router} from "express";
import {protectRoute,requireAdmin} from "../middleware/authMiddleware.js";
import {checkAdmin} from "../controllers/adminController.js";
import {createSong,deleteSong,createAlbum,deleteAlbum} from "../controllers/adminController.js";
const router = Router();
router.use(protectRoute,requireAdmin);//all routes below are protected and require admin
router.get("/check",checkAdmin); 
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);
export default router;
