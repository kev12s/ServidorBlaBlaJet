const Vuelo = require("../models/vuelo.model");

const getAllVuelos = async (req, res) => {
    try {
        console.log("🔍 Obteniendo todos los vuelos...");
        const vuelos = await Vuelo.getAll(); // Asegúrate que exista este método en el modelo
        console.log(" Vuelos obtenidos:", vuelos);
        res.json(vuelos);
    } catch (error) {
        console.error(" Error obteniendo vuelos:", error.message);
        res.status(500).json({ 
            error: "Error en la base de datos",
            detalle: error.message
        });
    }
};

const createVuelo = async (req, res) => {
    try {
        const { ORIGEN, DESTINO, FECHA, HORA_SALIDA, HORA_LLEGADA, MAX_PASAJEROS, PRECIO, PILOTO_ID, JET_MODELO } = req.body;
        const nuevoVuelo = await Vuelo.crear(ORIGEN, DESTINO, FECHA, HORA_SALIDA, HORA_LLEGADA, MAX_PASAJEROS, PRECIO, PILOTO_ID, JET_MODELO);
        res.status(201).json(nuevoVuelo);
    } catch (error) {
        console.error("Error al crear vuelo:", error);
        res.status(500).json({ error: "Error al crear vuelo" });
    }
};

const updateVuelo = async (req, res) => {
    try {
        const { origen, destino, fecha, horaSalida, horaLlegada, max_pasajeros, precio } = req.body;
        const { id } = req.params;
        const vueloActualizado = await Vuelo.actualizar({ origen, destino, fecha, horaSalida, horaLlegada, max_pasajeros, precio, id });
        res.json(vueloActualizado);
    } catch (error) {
        console.error("Error al actualizar vuelo:", error);
        res.status(500).json({ error: "Error al actualizar vuelo" });
    }
};

const deleteVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        const vueloEliminado = await Vuelo.eliminar(id);
        res.json(vueloEliminado);
    } catch (error) {
        console.error("Error al eliminar vuelo:", error);
        res.status(500).json({ error: "Error al eliminar vuelo" });
    }
};

const getVueloById = async (req, res) => {
    try {
        const { id } = req.params;
        const vuelo = await Vuelo.buscarPorId(id);
        res.json(vuelo);
    } catch (error) {
        console.error("Error al obtener vuelo por ID:", error);
        res.status(500).json({ error: "Error al obtener vuelo por ID" });
    }
};

module.exports = {
    getAllVuelos,
    createVuelo,
    updateVuelo,
    deleteVuelo,
    getVueloById
};
