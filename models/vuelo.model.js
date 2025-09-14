const db = require("../config/database");

class Vuelo {
    constructor({
        id,
        origen,
        destino,
        fecha,
        horaSalida,
        horaLlegada,
        max_pasajeros,
        precio,
        piloto_id,
        jet_modelo
    }) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.horaSalida = horaSalida;
        this.horaLlegada = horaLlegada;
        this.max_pasajeros = max_pasajeros;
        this.precio = precio;
        this.piloto_id = piloto_id;
        this.jet_modelo = jet_modelo;
    }

    static async crear(origen, destino, fecha, hora_salida, hora_llegada, max_pasajeros, precio, piloto_id, jet_modelo) {
        try {
            console.log(" Insertando vuelo con origen:", origen);
    
            if (!origen) {
                console.log(" Error: El origen es undefined o vacío.");
                throw new Error("El origen del vuelo no puede estar vacío.");
            }
    
            const [result] = await db.query(
                "INSERT INTO vuelo (origen, destino, fecha, hora_salida, hora_llegada, max_pasajeros, precio, piloto_id, jet_modelo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [origen, destino, fecha, hora_salida, hora_llegada, max_pasajeros, precio, piloto_id, jet_modelo]
            );
    
            console.log(" Vuelo insertado con ID:", result.insertId);
            return result.insertId;
        } catch (error) {
            console.error(" Error al insertar vuelo:", error);
            throw error;
        }
    }

    static async buscarPorId(id) {
        try {
            console.log(" Buscando vuelo con ID:", id);
    
            if (!id) {
                console.log(" Error: El ID es undefined o vacío.");
                throw new Error("El ID del vuelo no puede estar vacío.");
            }
    
            const [result] = await db.query("SELECT * FROM vuelo WHERE id = ?", [id]);
    
            console.log(" Vuelo encontrado con ID:", id);
            return result[0];
        } catch (error) {
            console.error(" Error buscando vuelo:", error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM vuelo');
            return rows;
        } catch (error) {
            console.error("Error en getAll:", error);
            throw error;
        }
    }
    
    static async buscarPorId(id) {
        try {
            console.log(" Buscando vuelo con ID:", id);
    
            if (!id) {
                console.log(" Error: El ID es undefined o vacío.");
                throw new Error("El ID del vuelo no puede estar vacío.");
            }
    
            const [result] = await db.query("SELECT * FROM vuelo WHERE ID = ?", [id]);
    
            console.log(" Vuelo encontrado con ID:", id);
            return result[0];
        } catch (error) {
            console.error(" Error buscando vuelo:", error);
            throw error;
        }
    }

    static async actualizar({
        id,
        origen,
        destino,
        fecha,
        horaSalida,
        horaLlegada,
        max_pasajeros,
        precio
    }) {
        try {
            console.log(" Actualizando vuelo con ID:", id);
    
            if (!id) {
                console.log(" Error: El ID es undefined o vacío.");
                throw new Error("El ID del vuelo no puede estar vacío.");
            }
    
            const sql = "UPDATE vuelo SET origen = ?, destino = ?, fecha = ?, horaSalida = ?, horaLlegada = ?, max_pasajeros = ?, precio = ? WHERE id = ?";
            const [result] = await db.query(sql, [origen, destino, fecha, horaSalida, horaLlegada, max_pasajeros, precio, id]);
    
            console.log(" Vuelo actualizado con ID:", id);
            return result;
        } catch (error) {
            console.error(" Error actualizando vuelo:", error);
            throw error;
        }
    }
    
    static async eliminar(id) {
        try {
            console.log(" Eliminando vuelo con ID:", id);
    
            if (!id) {
                console.log(" Error: El ID es undefined o vacío.");
                throw new Error("El ID del vuelo no puede estar vacío.");
            }
    
            const sql = "DELETE FROM vuelo WHERE id = ?";
            const [result] = await db.query(sql, [id]);
    
            console.log(" Vuelo eliminado con ID:", id);
            return result;
        } catch (error) {
            console.error(" Error eliminando vuelo:", error);
            throw error;
        }
    }
}
module.exports = Vuelo;
