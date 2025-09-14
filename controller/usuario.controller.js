const Usuario = require("../models/usuario.model");

// Modifica el método getAllUsuarios:
const getAllUsuarios = async (req, res) => {
    try {
        console.log(" Obteniendo todos los usuarios...");
        const usuarios = await Usuario.getAll(); // Asegúrate que exista este método en el modelo
        console.log(" Usuarios obtenidos:", usuarios);
        res.json(usuarios);
    } catch (error) {
        console.error(" Error obteniendo usuarios:", error.message);
        res.status(500).json({ 
            error: "Error en la base de datos",
            detalle: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const {email, password, name, phone, user_type, photo_path, description, birthdate} = req.body;
        const nuevoUsuario = await Usuario.crear(email, password, name, phone, user_type, photo_path, description, birthdate);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const {email,password,name,phone,user_type,photo_path,description,birthdate} = req.body;
        const {id} = req.params;
        const usuarioActualizado = await Usuario.actualizar({email,password,name,phone,user_type,photo_path,description,birthdate,id});
        res.status(200).json({ 
            success: true, 
            usuario: usuarioActualizado 
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ 
            success: false,
            error: "Error al actualizar usuario"
         });
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const usuario = await Usuario.login(email, password);
        if (usuario) {
            // Puedes devolver el usuario o un token (si implementas JWT)
            res.json({ success: true, usuario });
        } else {
            res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', detalle: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const {id} = req.params ;
        const usuarioEliminado = await Usuario.eliminar(id);
        res.json(usuarioEliminado);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Usuario.buscarPorId(id);
        res.json(usuario);
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        res.status(500).json({ error: "Error al buscar usuario por ID" });
    }
};

module.exports = {
    getAllUsuarios,
    updateUsuario,
    deleteUsuario,
    getUsuarioById,
    register,
    login
};