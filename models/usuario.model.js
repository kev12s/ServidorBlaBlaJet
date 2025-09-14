const db = require("../config/database");

class Usuario {
    constructor({
      email,
      password,
      name,
      phone,
      user_type,
      photo_path,
      description,
      birthdate,
      id
    }) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.phone = phone;
      this.user_type = user_type;
      this.photo_path = photo_path;
      this.description = description;
      this.birthdate = birthdate;
    }

    static async crear(email, password, name, phone, user_type, photo_path, description, birthdate) {
        try {
          console.log(" Insertando usuario con nombre:", name);
    
          if (!name) {
            console.log(" Error: El nombre es undefined o vacío.");
            throw new Error("El nombre del usuario no puede estar vacío.");
          }
    
          const sql = "INSERT INTO usuario (email, password, name, phone, user_type, photo_path, description, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
          const [result] = await db.query(sql, [email, password, name, phone, user_type, photo_path, description, birthdate]);
    
          console.log(" Usuario insertado con ID:", result.insertId);
          return result.insertId;
        } catch (err) {
          console.error(" Error insertando usuario:", err.message);
          throw err;
        }
      }

      static async actualizar({
        email,
        password,
        name,
        phone,
        user_type,
        photo_path,
        description,
        birthdate,
        id
      }) {
        try {
          console.log(" Actualizando usuario con ID:", id);
    
          if (!id) {
            console.log(" Error: El ID es undefined o vacío.");
            throw new Error("El ID del usuario no puede estar vacío.");
          }
          console.log(" Actualizando usuario con nombre:", name);
          const sql = "UPDATE usuario SET email = ?, password = ?, name = ?, phone = ?, user_type = ?, photo_path = ?, description = ?, birthdate = ? WHERE id = ?";
          const [result] = await db.query(sql, [email, password, name, phone, user_type, photo_path, description, birthdate, id]);
    
          console.log(" Usuario actualizado con ID:", id);
          return result;
        } catch (err) {
          console.error(" Error actualizando usuario:", err.message);
          throw err;
        }
      }

      static async eliminar(id) {
        try {
          console.log(" Eliminando usuario con ID:", id);
    
          if (!id) {
            console.log(" Error: El ID es undefined o vacío.");
            throw new Error("El ID del usuario no puede estar vacío.");
          }
    
          const sql = "DELETE FROM usuario WHERE id = ?";
          const [result] = await db.query(sql, [id]);
    
          console.log(" Usuario eliminado con ID:", id);
          return result;
        } catch (err) {
          console.error(" Error eliminando usuario:", err.message);
          throw err;
        }
      }
      static async login (email, password) {
        try {
          console.log(" Buscando usuario con email:", email);
          const sql = "SELECT * FROM usuario WHERE email = ? AND password = ?";
          const [result] = await db.query(sql, [email, password]);
          console.log(" Usuario encontrado con email:", email);
          return result[0];
        } catch (err) {
          console.error(" Error buscando usuario:", err.message);
          throw err;
        }
      }

      static async buscarPorId(id) {
        try {
          console.log(" Buscando usuario con ID:", id);
    
          if (!id) {
            console.log(" Error: El ID es undefined o vacío.");
            throw new Error("El ID del usuario no puede estar vacío.");
          }
    
          const sql = "SELECT * FROM usuario WHERE id = ?";
          const [result] = await db.query(sql, [id]);
    
          console.log(" Usuario encontrado con ID:", id);
          return result[0];
        } catch (err) {
          console.error(" Error buscando usuario:", err.message);
          throw err;
        }
      }
      // Añade este método si usas la Opción 2
      static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM usuario');
            return rows;
        } catch (error) {
            console.error("Error en getAll:", error);
            throw error;
        }
    }
}
module.exports = Usuario;