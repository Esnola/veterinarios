import express from "express";
import {
	registrar,
	perfil,
	confirmar,
	autenticar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
} from "../controllers/veterinarioController.js";
import checkAuth from "../midldeware/authMiddleware.js";

const router = express.Router();

router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
/*
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);
/** 👆 Estas dos líneas equivalen a una una sola con route 👇 */
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;
