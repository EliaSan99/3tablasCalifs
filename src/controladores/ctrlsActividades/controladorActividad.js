const controlador = {}

controlador.mostrar = (req, res) => {
    if(req.session.usuario) 
    {
        req.getConnection((err, conn) => {
            if(err)
              throw err;
            else
            {
              conn.query("SELECT Id_Actv, Descripción, DATE_FORMAT(Fecha_Limite,' %a- %d - %b - %Y - %H : %i - %p') AS Limite, DATE_FORMAT(Fecha_Entregado,'%a - %d - %b - %Y - %H : %i - %p') AS Entregado, Calificación,"
                       + "CONCAT(alumnos.Nombre,' ',alumnos.Paterno,' ', alumnos.Materno) AS Alumno,"
                       + "Tipo_Actv FROM actividades, alumnos, tipo_actividad WHERE actividades.Matricula=alumnos.Matricula "
                       + "AND actividades.Id_TipoActv=tipo_actividad.Id_TipoActv;", (error, success) => {
                if(error)
                  res.json(error);
                else
                
                  res.render("VActividades/actividades.ejs", { data: success, usuario: req.session.usuario});
                
              });
            }
    
         });
    }else
    {
      res.redirect("/");
    }

};

controlador.nuevo = (req, res) => {
    if(req.session.usuario) 
    {
     res.render("VActividades/actividades_nuevo.ejs", {usuario: req.session.usuario});
    }else
    {
      res.redirect("/"); 
    }

};

controlador.agregar = (req, res) => {
    if(req.session.usuario) 
    {
      //Se debe respetar el orden de los campos en la BD.
      const regActividades = {
                               Descripción:     req.body.tfDescripcion,
                               Fecha_Limite:    req.body.tfFechaLimite,
                               Fecha_Entregado: req.body.tfFechaEntregado,
                               calificación:    req.body.tfCalificacion,
                               Matricula:       req.body.tfMatricula,
                               Id_TipoActv:     req.body.tfIdTipoActv
                             };

      req.getConnection((err, conn) => {
          if (err)
            throw err;
          else
          {
              conn.query("INSERT INTO actividades SET ?", [regActividades], (error, success) => {
                if(error)
                  res.json(error);
                else
                {
                  res.redirect("/actividades");
                }

              });
          }

      });
    }else
    {
      res.redirect("/");
    }

};

controlador.editar = (req, res) => {
    if(req.session.usuario) 
    {
     const id = req.params.Id;

      req.getConnection((err, conn) => {
            if(err)
              throw err;
            else
            {
                conn.query("SELECT Id_Actv, Descripción, DATE_FORMAT(Fecha_Limite, '%Y-%m-%d   %H:%i') AS Limite," + " " 
              + "DATE_FORMAT(Fecha_Entregado, '%Y-%m-%d  %H:%i') AS Entregado, Calificación, Matricula, Id_TipoActv  FROM `actividades` WHERE Id_Actv=?", [id], (error, row) => {
                    if(error)
                    {
                      res.json(error);
                    }else
                    {
                      res.render("VActividades/actividades_editar.ejs", {reg: row, usuario: req.session.usuario});
                    }
                });
            }

      });
    }else
    {
      res.redirect("/");
    }

};

controlador.actualizar = (req, res) => {
    if(req.session.usuario) 
    {
      const id = req.params.Id;

      //Se debe respetar el orden de los campos en la BD.
      const regActividades = {
                              Id_Actv:         req.body.tfIdActv,
                              Descripción:     req.body.tfDescripcion,
                              Fecha_Limite:    req.body.tfFechaLimite,
                              Fecha_Entregado: req.body.tfFechaEntregado,
                              calificación:    req.body.tfCalificacion,
                              Matricula:       req.body.tfMatricula,
                              Id_TipoActv:     req.body.tfIdTipoActv
                            };

          req.getConnection((err, conn) => {
            if (err)
              throw err;
            else
            {
                  conn.query("UPDATE actividades SET ? WHERE Id_Actv=?", [regActividades, id], (error, updated) => {
                        if (error)
                          res.json(error);
                        else
                        {
                          res.redirect("/actividades");
                        }

                  });
            }
          });
    }else
    {
      res.redirect("/");
    }

};

controlador.eliminar = (req, res) => {
    if(req.session.usuario) 
    {
      const id = req.params.Id;

      req.getConnection((err, conn) => {
        if(err)
          throw err;
        else
        {
          conn.query("DELETE FROM actividades WHERE Id_Actv=?",[id], (error, removed) => {
              if(error)
                res.json(error);
              else
              {
                res.redirect("/actividades");
              }

          });
        }

      });
    }else
    {
      res.redirect("/"); 
    }

}; 

module.exports = controlador;