const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares');

const { esRolvalido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete  } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
//     check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER ROLE']),
    check('rol').custom( esRolvalido ),
    validarCampos
], usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolvalido ),
    validarCampos
], usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    validarJWT,
    // esAdminRole, // forza a que el usuario sea administrador
    tieneRole('ADMIN_ROLE, VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );



module.exports = router;