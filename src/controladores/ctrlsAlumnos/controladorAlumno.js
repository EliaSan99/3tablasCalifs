const controlador ={}

controlador.mostrar = (req, res) => {

    if(req.session.usuario)
    {
        req.getConnection((err,conn) => {
            if(err)
            throw err;
            else
            {
                conn.query("SELECT * FROM alumnos", (error, success) => {
                    if(error)
                       res.json(eror);
                    else
                    res.render("VAlumnos/alumnos.ejs", {data: success, usuario: req.session.usuario });

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
      res.render("VAlumnos/alumnos_nuevo.ejs",{usuario: req.session.usuario });
     }else
     {
      res.redirect("/");
     }
     
};

controlador.agregar = (req, res) => {
   //Se debe respetar el orden de los campos en la BD.
   const regAlumnos = {
                       Matricula: req.body.tfMatricula,
                       Nombre   : req.body.tfNombre,
                       Paterno  : req.body.tfPaterno,
                       Materno  : req.body.tfMaterno,
                       Sexo     : req.body.tfSexo,
                       Telefono : req.body.tfTelefono,
                       Carrera  : req.body.tfCarrera,
                       Mcpio    : req.body.tfMcpio,
                       Calle    : req.body.tfCalle,
                       Num_Ext  : req.body.tfNumExt
                      };

   req.getConnection((err,conn) => {
        if(err)
          throw err;
        else
        {
            conn.query("INSERT INTO alumnos SET ?", [regAlumnos], (error, success) => {
                if(error)
                 res.json(error);
                 else
                 {
                   res.redirect("/alumnos");
                 }

            });
        }
   });

};

controlador.editar = (req, res) => {
    if(req.session.usuario)
    {
      const matri = req.params.Matri;
    
      req.getConnection((err, conn) => {
           if (err) 
            throw err;
          else
          {
            conn.query("SELECT * FROM alumnos WHERE Matricula=?", [matri], (error, row) => {
               if(error) 
                res.json(error);
              else 
              {
                res.render("VAlumnos/alumnos_editar.ejs", {reg: row, usuario: req.session.usuario});
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
    const matri = req.params.Matri;

   //Se debe respetar el orden de los campos en la BD.
   const regAlumnos = {
                        Matricula: req.body.tfMatricula,
                        Nombre   : req.body.tfNombre,
                        Paterno  : req.body.tfPaterno,
                        Materno  : req.body.tfMaterno,
                        Sexo     : req.body.tfSexo,
                        Telefono : req.body.tfTelefono,
                        Carrera  : req.body.tfCarrera,
                        Mcpio    : req.body.tfMcpio,
                        Calle    : req.body.tfCalle,
                        Num_Ext  : req.body.tfNumExt
                      };

    req.getConnection((err, conn)=> {
        if (err) 
         throw err;
        else
        {
          conn.query("UPDATE alumnos SET ? WHERE Matricula=?", [regAlumnos,matri], (error, updated) => {
               if(error)
                  res.json(error);
                else
                {
                    res.redirect("/alumnos");
                }
          });
        }

    });
};

controlador.eliminar = (req, res) => {
    if(req.session.usuario)
    {
      const matri = req.params.Matri;
      req.getConnection((err, conn)=> {
          if(err)
             throw err;
          else
          {
            conn.query("DELETE FROM alumnos WHERE Matricula=?", [matri], (error, removed) => {
              if(error)
                res.json(error);
              else 
              {
                res.redirect("/alumnos");
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