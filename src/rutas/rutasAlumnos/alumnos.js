const express = require('express');
const router = express.Router();
const controladorAlumno = require('../../controladores/ctrlsAlumnos/controladorAlumno');

router.get('/',                     controladorAlumno.mostrar);
router.get('/nuevo',                controladorAlumno.nuevo);
router.post('/agregar',             controladorAlumno.agregar);
router.get('/editar/:Matri',        controladorAlumno.editar);
router.post('/actualizar/:Matri',   controladorAlumno.actualizar); //localhost:8000/alumnos/actualizar/57147000168
router.get('/eliminar/:Matri',      controladorAlumno.eliminar);

module.exports = router;