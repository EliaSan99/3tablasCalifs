const express = require('express');
const router  = express.Router();
const controladorCriterio = require('../../controladores/ctrlsCriterios/controladorCriterio');

router.get('/',                   controladorCriterio.mostrar);
router.get('/nuevo',              controladorCriterio.nuevo);
router.post('/agregar',           controladorCriterio.agregar);
router.get('/editar/:Id',         controladorCriterio.editar);
router.post('/actualizar/:Id',    controladorCriterio.actualizar); //localhost:8000/alumnos/actualizar/57147000168
router.get('/eliminar/:Id',       controladorCriterio.eliminar);

module.exports = router;