import jwt from "jsonwebtoken";
const generarJWT = (idPasado) => {
	return jwt.sign({ idPasado }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export default generarJWT;
