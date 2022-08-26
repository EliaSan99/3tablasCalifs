const controlador = {}

controlador.iniciar = (req, res) => {
    var user = req.body.tfUsuario;
    var pass = req.body.tfPassword;
    
    req.getConnection((err, conn) => {
        if (err)
          throw err;
        else
        { 
          conn.query("SELECT * FROM usuarios WHERE usuario=? AND password=?",[user, pass], (error, row) => {
            if(error)
              res.Json(error);
            else if(row.length==1)
              {
                req.session.usuario  = user;
                req.session.password = pass;
                res.redirect("/alumnos");
              }
            else
            {
              res.redirect('/');
            }

          });

        }

    });
};

controlador.cerrar = (req, res) => {
    delete req.session.usuario;
    delete req.session.password;
    res.redirect('/');
};

module.exports = controlador;