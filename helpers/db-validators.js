const Role = require('../models/role');
const{ Usuario, Categoria, Producto } = require('../models');

// validación del rol
const esRolvalido = async(rol = '') => {
    
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
}

// Validacion del correo
const emailExiste = async( correo = '' ) => {

    // Verificar si el correo ya existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya esta registrado`);

    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo ya existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id } no existe`);

    }
}

// Validadores de categorias
const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo ya existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

// Validador de productos
const existeProductoPorId = async( id ) => {

    // Verificar si el correo ya existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}


module.exports = {
    esRolvalido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}