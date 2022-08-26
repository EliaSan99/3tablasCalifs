const express = require('express');
const router  = express.Router();
const controladorActividades = require('../../controladores/ctrlsActividades/controladorActividad');

router.get('/',                   controladorActividades.mostrar);
router.get('/nuevo',              controladorActividades.nuevo);
router.post('/agregar',           controladorActividades.agregar);
router.get('/editar/:Id',         controladorActividades.editar);
router.post('/actualizar/:Id',    controladorActividades.actualizar); //localhost:8000/alumnos/actualizar/57147000168
router.get('/eliminar/:Id',       controladorActividades.eliminar); 

module.exports = router;