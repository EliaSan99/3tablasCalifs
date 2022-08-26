const controlador = {}

controlador.mostrar = (req, res) => {
    if (req.session.usuario) {
        req.getConnection((err, conn) => {
            if (err)
                throw err;
            else 
            {
                conn.query("SELECT * FROM tipo_actividad", (error, success) => {
                    if (error)
                        res.Json(error);
                    else
                        res.render("VCriterios/criterios.ejs", { data: success, usuario: req.session.usuario });

                });
            }
        });
    } else {
        res.redirect("/");
    }

};

controlador.nuevo = (req, res) => {
    if (req.session.usuario) {
        res.render("VCriterios/criterios_nuevo.ejs", { usuario: req.session.usuario });
    } else {
        res.redirect("/");
    }

};

controlador.agregar = (req, res) => {
    if (req.session.usuario) {
        const regCriterios = {
                                Tipo_Actv: req.body.tfTipoActv,
                                Porcentaje: parseInt(req.body.tfPorcentaje)
                             };

        req.getConnection((err, conn) => {
            if (err)
                throw err;
            else {
                conn.query("INSERT INTO tipo_actividad SET ?", [regCriterios], (error, success) => {
                    if (error)
                        res.Json(error);
                    else 
                    {
                        res.redirect("/criterios");
                    }

                });
            }
        });
    } else {
        res.redirect("/");
    }

};

controlador.editar = (req, res) => {
    if (req.session.usuario) {
        const id = req.params.Id;

        req.getConnection((err, conn) => {
            if (err)
                throw err;
            else {
                conn.query("SELECT * FROM tipo_actividad WHERE Id_TipoActv=?", [id], (error, row) => {
                    if (error)
                        res.Json(error);
                    else {
                        res.render("VCriterios/criterios_editar.ejs", { reg: row, usuario: req.session.usuario });
                    }

                });
            }

        });
    } else {
        res.redirect("/");
    }
};

controlador.actualizar = (req, res) => {
    if (req.session.usuario) {
        const id = req.params.Id;

        //Se debe respetar el orden de los campos en la BD.
        const regCriterios = {
                                Id_TipoActv: parseInt(req.body.tfIdTipoActv),
                                Tipo_Actv:   req.body.tfTipoActv,
                                Porcentaje:  parseInt(req.body.tfPorcentaje)
                             };

        req.getConnection((err, conn) => {
            if (err)
                throw err;
            else
             {
                conn.query("UPDATE tipo_actividad SET ? WHERE Id_TipoActv=?", [regCriterios,id], (error, updated) => {
                    if (error)
                        res.json(error);
                    else 
                    {
                      res.redirect("/criterios");
                    }

                });
            }

        });

    } else
    {
      res.redirect("/");
    }

};

controlador.eliminar = (req, res) => {
    if (req.session.usuario) 
    {
        const id = req.params.Id;

        req.getConnection((err, conn) => {
            if(err)
              throw err;
            else
            {
              conn.query("DELETE FROM tipo_actividad WHERE Id_TipoActv=?", [id], (error,removed) => {
                if(error)
                  res.json(error);
                else
                {
                  res.redirect("/criterios");
                }
    
              });
            }
    
         });

    } else 
    {
    res.redirect("/");
    }

};

module.exports = controlador;