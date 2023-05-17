import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";
const checkAuth = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		//console.log(process.env.CONSOLE_MENSAJE);
		//next();

		try {
			token = req.headers.authorization.split(" ")[1];
			//console.log(token);
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			//console.log(decoded);
			req.veterinario = await Veterinario.findById(decoded.idPasado).select(
				"-password -token -confirmado"
			);
			return next();
		} catch (error) {
			const e = new Error("Token no Válido o Inexistente");
			res.status(403).json({ msg: e.message });
		}
	}
	if (!token) {
		const error = new Error("Token no Válido o Inexistente");
		res.status(403).json({ msg: error.message });
	}
	next();
};

export default checkAuth;
