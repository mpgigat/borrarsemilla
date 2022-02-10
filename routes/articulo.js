import {Router} from 'express'
import {articuloGet, articuloGetById, articuloPost, articuloPut, articuloDelete, articuloPutDeActivate,articuloPutActivate,articuloGetByCodigo} from '../controllers/articulo.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeArticuloByNombre,existeArticuloById,existeArticuloByCodigo,existeArticuloByNombreAndId} from '../helpers/db-validators-articulos.js';
import { existeCategoriaById } from "../helpers/db-validators-categorias.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarVariosRoles } from '../middlewares/validar-roles.js';
const router=Router();

router.get('/',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    validarCampos
],articuloGet);

router.get('/codigo',[
    validarJWT,   
    validarCampos
],articuloGetByCodigo);

router.get('/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),    
    validarCampos
],articuloGetById);

router.post('/',[    
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom( existeCategoriaById ),
    check('codigo', 'El codigo es obligatorio!').not().isEmpty(),
    check('codigo').custom( existeArticuloByCodigo ),
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre').custom( existeArticuloByNombre ),
    validarCampos
],    articuloPost); 

router.put('/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),    
    validarCampos
],articuloPut);

router.put('/activate/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articuloPutActivate);

router.put('/deactivate/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articuloPutDeActivate);

router.delete('/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articuloDelete);

export default router