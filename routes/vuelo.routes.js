const express = require("express");
const router = express.Router();

const{
    getAllVuelos,
    createVuelo,
    updateVuelo,
    deleteVuelo,
    getVueloById
} = require("../controller/vuelo.controller");

router.get("/", getAllVuelos);

router.get("/:id", getVueloById);

router.post("/", createVuelo);

router.put("/:id", updateVuelo);

router.delete("/:id", deleteVuelo);

module.exports = router;