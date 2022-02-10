
const ventaPost = async (req, res) => {
    const {usuario,persona,tipocomprobante,seriecomprobante,numcomprobante,impuesto,total,detalles}=req.body; //raw tipo json
    const venta=new Venta({usuario,persona,tipocomprobante,seriecomprobante,numcomprobante,impuesto,total,detalles});

    //const venta = new venta(req.body);
    await venta.save();
    
   
    res.json({
        venta
    })
}