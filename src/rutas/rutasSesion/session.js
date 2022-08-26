const express = require("express");
const router = express.Router();
const controladorSession = require("../../controladores/ctrlsAlumnos/controladorSession.js");

router.post('/iniciar',   controladorSession.iniciar);
router.post('/cerrar',    controladorSession.cerrar);

module.exports = router;

