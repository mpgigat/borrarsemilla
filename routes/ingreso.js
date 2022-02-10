import {Router} from 'express'
import { ingresoGet, ingresoGetById, ingresoPost, ingresoPutActivate,ingresoPutDeActivate,ingresoGrafico12Meses,ingresoConsultaFechas } from '../controllers/ingreso.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeIngresoById,validarArticulosDetalle} from '../helpers/db-validators-ingresos.js';
import { existeUsuarioPorId } from "../helpers/db-validators-usuarios.js";
import { existePersonaPorId } from "../helpers/db-validators-personas.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarVariosRoles } from '../middlewares/validar-roles.js';
const router=Router();

router.get('/',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    validarCampos
],ingresoGet);

router.get('/grafico',[
    validarJWT,    
    validarCampos
],ingresoGrafico12Meses);

router.get('/consultafechas',[
    validarJWT,    
    validarCampos
],ingresoConsultaFechas);

router.get('/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIngresoById),    
    validarCampos
],ingresoGetById);

router.post('/',[    
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'No es un ID válido').isMongoId(),    
    check('usuario').custom( existeUsuarioPorId ),
    check('persona', 'La persona es obligatoria').not().isEmpty(),
    check('persona', 'No es un ID válido').isMongoId(),    
    check('persona').custom( existePersonaPorId ),
    check('tipocomprobante', 'El tipo de comprobante es obligatorio!').not().isEmpty(),
    check('numcomprobante', 'El número de comprobante es obligatorio!').not().isEmpty(),   
    //check('detalles').custom( validarAchecrticulosDetalle ),    
    validarCampos
],    ingresoPost); 
 
router.put('/activate/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIngresoById),
    validarCampos
],ingresoPutActivate);

router.put('/deactivate/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIngresoById),
    validarCampos
],ingresoPutDeActivate);


export default router