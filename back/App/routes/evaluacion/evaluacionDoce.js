const { Router} = require("express");
const router =Router();
const {check}=require('express-validator');
const { validarCampos } = require('../../../middlewares/validarcampos');

const {validarJWT}= require('../../../middlewares/validarjwt');
const {getPreguntas,crearPreguntas,actualizarPreguntas,eliminarPreguntas, buscarpreguntaPorAaspecto, getTipoPreguntas}=require('../../src/evaluacion/admin/preguntas/preguntasController');
const { getRespuestas, crearRespuestas, actualizarRespuestas, eliminarRespuestas } = require('../../src/evaluacion/admin/opcionesRespuestas/respuestasController');
const {crearEncuesta,getEncuesta,actualizarEncuesta,eliminarEncuesta, listarTipoEncuesta}=require('../../src/evaluacion/admin/encuestas/encuestaController');
const {getpersEvaluadora, buscarpersonaEvaluadora}= require('../../src/evaluacion/admin/persEvaluadora/persEvaluadoraController');
const { datosEstudiante } = require('../../src/evaluacion/estudiantes/consultaEstudiante/infoEstudianteController');
const { getAspectos, crearAspectos, eliminarAspectos, actualizarAspectos } = require("../../src/evaluacion/admin/aspectos/aspectosController");
const { isDate } = require("../../../helpers/isDate");
const { getEncuestaPreguntas } = require("../../src/evaluacion/admin/encuestasPreguntas/encuestaPreguntas.controller");
const { datosdocente } = require('../../src/evaluacion/estudiantes/consultaDocente/infoDocenteController');
const { listencuesta, addencuesta } = require("../../src/evaluacion/listEncuesta/listarEncuestas/listEncuestaController");


//router.use(validarJWT);// se valida en todas las rutas 

///////////RUTAS DE ASPECTOS /////
router.get('/listAspecto', getAspectos);
//router.get('/busqueda', buscarpreguntaPorAaspecto);
router.post('/createAspecto',
   [
      check('nombre', 'El titulo es obligatorio').not().isEmpty(),
      
     check('descripcion', 'la descripcion es obligatoria').not().isEmpty(),
     check('estado')
     .optional({ checkFalsy: true }) // Esto permite campos opcionales o valores "falsos" como ""
     .isBoolean().withMessage('El campo activo debe ser booleano.'),
      validarCampos
  ],
     crearAspectos);
router.put('/updateAspecto/:id',  actualizarAspectos);
router.delete('/deleteAspecto/:id', eliminarAspectos);


//////////////////////////////////////////////////////////////////////
///////////////////rutas PREGUNTAS//////////////////////////////////////////

router.get('/listPregunta', getPreguntas);
router.get('/listTipoPregunta', getTipoPreguntas);
router.get('/buscarPorAspecto/:id', buscarpreguntaPorAaspecto);
router.post('/createPregunta',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('subtitulo', 'Ingresar el subtitulo').not().isEmpty(),
        check('imagen', 'no hay imagen'),
        check('valor', 'Debe de ingresar el valor'),
        check('id_tipo_pregunta', 'Debe selecionar el tipo de pregunta'),
        validarCampos
    ],
     crearPreguntas);
router.put('/updatePregunta/:id', actualizarPreguntas);
router.delete('/deletePregunta/:id', eliminarPreguntas);

//////////////////////RESPUESTAS///////////////////////

router.get('/listRes', getRespuestas);
router.post('/createRes',
   /* [
        check('nombre', 'El titulo es obligatorio').not().isEmpty(),
        check('imagen', 'El titulo es obligatorio').not().isEmpty(),
        check('valor', 'El valor de la pregunta es obligatoria').not().isEmpty(),
        check('id_pregunta', 'se debe seleccionara la pregunta').not().isEmpty(),
        check('estado', 'estado ').not().isEmpty(),
        validarCampos 
    ],*/
     crearRespuestas);
router.put('/updateRes/:id', actualizarRespuestas);
router.delete('/deleteRes/:id', eliminarRespuestas);
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////******ENCUESTA****////////////////////////////////////////////////////////
/////////***************************************************** */////////////////////

router.get('/listEncuesta', getEncuesta);
router.get('/listTipoEncuesta',listarTipoEncuesta );//para lista tipo encuesta 
router.post('/createEncuesta',
    // [
    //     check('nombre', 'El titulo es obligatorio').not().isEmpty(),
    //     check('descripcion', 'ingresa la descripcion').not().isEmpty(),
    //     check('fecha_inicio', 'Fecha de inicio es requerida y debe ser una fecha válida').not().isEmpty(),
    //     check('fecha_fin', 'fecha fin de evaluacion').not().isEmpty(),
    //     check('id_pregunta', 'pregunta').not().isEmpty(),
    //     check('id_usuario', 'usuario').not().isEmpty(),
    //     check('id_periodo_academico', 'periodo academico').not().isEmpty(),
    //     check('id_tipo_encuesta','tipo de encuesta,').not().isEmpty(),
    //     check('llave_abreviatura', 'Abreviatura').not().isEmpty(),
    //     check('estado', 'Estado de la encuesta').not().isEmpty(),
    //     //validarCampos
    // ],
    crearEncuesta);
router.put('/updateEncuesta/:id', actualizarEncuesta);
router.delete('/deleteEncuesta/:id', eliminarEncuesta);

///////////////////PERSONA EVALUADORA///////////////////////
/////////////////////////////////////////////////////////////

router.get('/listEvaluador',getpersEvaluadora);
router.get('/buscarEvaluador/:id',buscarpersonaEvaluadora);

///////////////////////encuestasPreguntas/////////////////
router.get('/listEncuestaPregunta/:id',getEncuestaPreguntas);

/////////////////////VISTA ESTUDIANTE CONSULTA DOCENTES Y DATOS ESTUDIANTES ///

////////// por parte del estudiante/////////
router.post('/doc/:id', 
    [
        //check('codigo', 'ingrese el codigo').not().isEmpty(),
        // check('identificacion estudiant', 'identificacion del Estuduante').not().isEmpty(),
        // check('nombres_completos_est', 'Nombres Completos del Estudiante').not().isEmpty(),
        // check('codigo', 'codigo del estudiante').not().isEmpty(),
        // check('estado', 'estado: estudiante').not().isEmpty(),
        // check('semestre_general', 'semestre general del estudiante').not().isEmpty(),
        // check('Identificacion Docente', 'identtificacion del docente').not().isEmpty(),
        // check('nombres_completos_docent', 'nombres completos del docente').not().isEmpty(),
        // check('semestre_asignatura', 'semestre_asignatura docente').not().isEmpty(),
        // check('nombre', 'nombre de la asignatura docente').not().isEmpty(),
        // check('id_docente', 'id del docente').not().isEmpty(),
        // check('iddocente', 'iddocente').not().isEmpty(),
        // check('llave_encuesta', 'EVADOCENTEPROD').not().isEmpty(),
        // check('ruta_foto_estudiante', 'foto del estudiante').not().isEmpty(),
        // check('ruta_foto_docente', 'foto del docente').not().isEmpty(),
        validarCampos

    ],datosdocente);

    //---------------------- Listar Encuesta ------------------------//
    router.post('/listEncuesta/:id',[validarCampos],listencuesta);
    router.post('/addListEncuesta/:id', [validarCampos], addencuesta);


router.get('/estu/:id',
    [check('codigo', 'ingrese el codigo').not().isEmpty(),validarCampos],
    datosEstudiante);




module.exports = router;