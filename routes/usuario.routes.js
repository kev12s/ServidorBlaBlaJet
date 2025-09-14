const express = require("express");
const router = express.Router();

const{
    getAllUsuarios,
    register,
    updateUsuario,
    deleteUsuario,
    getUsuarioById,
    login
} = require("../controller/usuario.controller");

router.get("/", getAllUsuarios);

router.get("/:id", getUsuarioById);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
