

const validarAdminRol=(req,res,next)=>{
    if(!req.usuario){
        return res.status(500).json({msg:'Requiere verificar rol'})
    }
    const {rol,nombre}=req.usuario;
    if (rol!=='ADMIN_ROL'){
        return res.status(401).json({msg:`${nombre} no es administrador`});
    }
    next();
}

const validarVariosRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!(roles.includes(req.usuario.rol) || req.usuario.rol==='ADMIN_ROL')){
            return res.status(401).json({msg:`El servicio requiere uno de estos roles ${roles}`});
        }

        next();
    }
}

export {validarAdminRol,validarVariosRoles}