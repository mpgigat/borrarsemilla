
import {Router} from 'express'
import {mostrarImagenCloud,cargarArchivoCloud,mostrarImagen,cargarArchivo, personaGet, personaGetById, personaPost, personaPut, personaDelete,personaPutActivate,personaPutDeActivate,personaGetClientes,personaGetProveedores} from '../controllers/persona.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { emailExiste, existePersonaPorId } from '../helpers/db-validators-personas.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import {validarVariosRoles} from '../middlewares/validar-roles.js';
import validarExistaArchivo from '../middlewares/validar-exista-archivo.js';


const router=Router();

router.get('/',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    validarCampos   
],personaGet);

router.get("/uploadcloud/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId), 
    validarCampos   
],mostrarImagenCloud)

router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId), 
    validarCampos   
],mostrarImagen)

router.get('/clientes',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    validarCampos   
],personaGetClientes);


router.get('/proveedores',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    validarCampos   
],personaGetProveedores);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId), 
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    validarCampos   
],personaGetById);

router.post('/',[    
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
    validarCampos       
],    personaPost);

router.post('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId), 
    validarExistaArchivo,
    validarCampos
],cargarArchivoCloud)

router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId), 
    validarExistaArchivo,
    validarCampos
],cargarArchivo)

       
router.put('/:id',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId), 
    validarCampos
],personaPut);

router.put('/activate/:id',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId),
    validarCampos
],personaPutActivate);

router.put('/deactivate/:id',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId),
    validarCampos
],personaPutDeActivate);

router.delete('/:id',[
    validarJWT,
    validarVariosRoles('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaPorId),
    validarCampos
],personaDelete);

export default router