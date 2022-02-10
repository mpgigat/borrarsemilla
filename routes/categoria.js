import {Router} from 'express'
import {categoriaGet,categoriaGetById,categoriaPut,categoriaDelete,categoriaPost,
    categoriaPutActivate,categoriaPutDeActivate} from '../controllers/categoria.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaByNombre,existeCategoriaById} from '../helpers/db-validators-categorias.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarVariosRoles } from '../middlewares/validar-roles.js';

const router=Router();

router.get('/',[
    // validarJWT,    
    // validarVariosRoles('ALMACENISTA_ROL'),
    // validarCampos
],categoriaGet);

validarJWT,    
router.get('/:id',[
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),    
    validarCampos
],categoriaGetById);


router.post('/',[    
    // validarJWT,    
    // validarVariosRoles('ALMACENISTA_ROL'),
    // check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    // existeCategoriaByNombre(),
    // validarCampos
],    categoriaPost);

router.put('/:id',[
    // validarJWT,    
    // validarVariosRoles('ALMACENISTA_ROL'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeCategoriaById),
    // //check('nombre').custom( existeCategoriaByNombre ),
    // existeCategoriaByNombre(),
    // validarCampos
],categoriaPut);

router.put('/activate/:id',[
    // validarJWT,    
    // validarVariosRoles('ALMACENISTA_ROL'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeCategoriaById),
    // validarCampos
],categoriaPutActivate);

router.put('/deactivate/:id',[
    // validarJWT,    
    // validarVariosRoles('ALMACENISTA_ROL'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeCategoriaById),
    // validarCampos
],categoriaPutDeActivate);

router.delete('/:id',[
    validarJWT,    
    validarVariosRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoriaDelete);

export default router