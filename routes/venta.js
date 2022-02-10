import {Router} from 'express'
import { ventaGet, ventaGetById, ventaPost, ventaPutActivate,ventaPutDeActivate,ventaGrafico12Meses,ventaConsultaFechas } from '../controllers/venta.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeVentaById,validarArticulosDetalle} from '../helpers/db-validators-ventas.js';
import { existeUsuarioPorId } from "../helpers/db-validators-usuarios.js";
import { existePersonaPorId } from "../helpers/db-validators-personas.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarVariosRoles } from '../middlewares/validar-roles.js';

const router=Router();

router.get('/',[
    validarJWT,    
    validarVariosRoles('VENDEDOR_ROL'),
    validarCampos
],ventaGet);

router.get('/grafico',[
    validarJWT,
    validarCampos
],ventaGrafico12Meses);

router.get('/consultafechas',[
    validarJWT,    
    validarCampos
],ventaConsultaFechas);

router.get('/:id',[
    validarJWT,    
    validarVariosRoles('VENDEDOR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),    
    validarCampos
],ventaGetById);

router.post('/',[    
    validarJWT,    
    validarVariosRoles('VENDEDOR_ROL'),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'No es un ID válido').isMongoId(),    
    check('usuario').custom( existeUsuarioPorId ),
    check('persona', 'La persona es obligatoria').not().isEmpty(),
    check('persona', 'No es un ID válido').isMongoId(),    
    check('persona').custom( existePersonaPorId ),
    check('tipocomprobante', 'El tipo de comprobante es obligatorio!').not().isEmpty(),
    check('numcomprobante', 'El número de comprobante es obligatorio!').not().isEmpty(),   
    check('detalles').custom( validarArticulosDetalle ),    
    validarCampos
],    ventaPost); 
 
router.put('/activate/:id',[
    validarJWT,    
    validarVariosRoles('VENDEDOR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
],ventaPutActivate);

router.put('/deactivate/:id',[
    validarJWT,    
    validarVariosRoles('VENDEDOR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
],ventaPutDeActivate);



export default router