import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generateId.js";

const registrar = async (req, res) => {
	//console.log(req.body)
	// const {nombre, email, password, telefono, web, token, confirmado} = req.body
	const { email } = req.body;
	const existeUsuario = await Veterinario.findOne({ email });
	if (existeUsuario) {
		// console.log(existeUsuario)
		const error = new Error("Usuario ya estaba registrado");
		return res.status(400).json({ msg: error.message });
	}

	try {
		//Guardar Veterinario
		const veterinario = new Veterinario(req.body);
		const veterinarioGuardado = await veterinario.save();

		res.json(veterinarioGuardado);
	} catch (error) {
		console.log(error);
	}
};

const perfil = (req, res) => {
	console.log(req.veterinario);
	const { veterinario } = req;
	res.json({ perfil: veterinario });
};

const confirmar = async (req, res) => {
	const { token } = req.params;
	const usuarioConfirmar = await Veterinario.findOne({ token });
	console.log(usuarioConfirmar);
	if (!usuarioConfirmar) {
		const error = new Error("Token no válido...");
		return res.status(404).json({ msg: error.message });
	}
	try {
		usuarioConfirmar.token = null;
		usuarioConfirmar.confirmado = true;
		await usuarioConfirmar.save();
		res.json({ msg: "Confirmando la cuenta ...." });
		console.log(`Se ha confirmado la cuenta de ${usuarioConfirmar.nombre}`);
	} catch (error) {
		console.log(error);
	}
};

const autenticar = async (req, res) => {
	const { email, password } = req.body;
	// Comprobar si el usuario existe
	const usuario = await Veterinario.findOne({ email });
	if (!usuario) {
		const error = new Error("El usuario no existe");
		res.status(403).json({ msg: error.message });
	}
	//Comprobar si el usuario está confirmado.
	if (!usuario.confirmado) {
		const error = new Error("Esta cuenta está sin confirmar.....");
		return res.status(403).json({ msg: error.message });
	}
	//Revisar password
	if (await usuario.comprobarPassword(password)) {
		console.log("Pass correcto");
		res.json({ token: generarJWT(usuario.id) });
	} else {
		const error = new Error("Pass incorrecto");
		console.log("Pass Incorrecto");
		return res.status(403).json({ msg: error.msg });
	}
};

const olvidePassword = async (req, res) => {
	const { email } = req.body;
	console.log(email);
	const existeVeterinario = await Veterinario.findOne({ email });
	//console.log(existeVeterinario);
	if (!existeVeterinario) {
		const error = new Error("El usuario no existe");
		return res.status(400).json({ msg: error.message });
	}
	try {
		/*existeVeterinario.token = generarId();
		await existeVeterinario.save();*/
		res.json({ msg: "Hemos enviado un email con las instrucciones" });
	} catch (error) {
		console.log(error);
	}
};
const comprobarToken = (req, res) => {};
const nuevoPassword = (req, res) => {};
export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };
