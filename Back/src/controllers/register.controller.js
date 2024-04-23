import { pool } from '../db.js';

export const register = async (req, res) => {
  console.log(req.body);
  const { usuario, contrasena,correo } = req.body;

  if (!usuario || !contrasena || !correo) {
    return res.status(400).json({ message: 'Por favor, proporcione un nombre de usuario y contraseña' });
  }

  try {
    // Verificar si el usuario ya está registrado
    const existingUser = await pool.query('SELECT COUNT(*) AS count FROM usuario WHERE correo = ?', [correo]);
    const count = existingUser[0].count;

    if (count > 0) {
      return res.status(409).json({ message: 'El usuario ya está registrado' });
    }

    // Si el usuario no está registrado, insertarlo en la base de datos
    const newUser = { usuario, contrasena,correo };
    await pool.query('INSERT INTO usuario SET ?', newUser);

    return res.status(201).json({ message: 'Usuario registrado con éxito',newUser}); 
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

