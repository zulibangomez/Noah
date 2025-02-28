import { useEffect, useState } from "react";
import { useEstudianteStore } from "./useEstudianteStore";
import "./evaluadorView.css"; // Asegúrate de importar el CSS
import imagenDocente from "../../../../../../assets/img/recursos/usuarioSinFoto.jpg";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import EvaluacionDocenteModal from "./EvaluacionDocenteModal";


const EvaluadorView = () => {
  const { buscar, evaluador } = useEstudianteStore();

  // abrir modal
  const [openModal, setOpenModal] = useState(false);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);

  const handleOpenModal = (docente) => {
    setDocenteSeleccionado(docente);
    setOpenModal(true);
  };
// cerrar modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setDocenteSeleccionado(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      await buscar(); // Cargar datos iniciales
    };
    fetchData();
  }, []);

  const [formValue, setFormValue] = useState({
    codigo: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!formValue.codigo.trim()) {
      alert("Por favor ingrese un código");
      return;
    }
    await buscar(formValue.codigo);
  };

  const estudiante = evaluador.length > 0 ? evaluador[0] : null;

  return (
    <div>
      <h1>Buscar docentes para evaluación</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="codigo"
          value={formValue.codigo || ""}
          onChange={handleChange}
          placeholder="Ingrese el código"
        />
        <button type="submit">Buscar</button>
      </form>

      {estudiante && (
        <div className="cardEstudiante">
          <div className="card-perfil">
            <center>
              <p>
                <strong>
                  <PersonIcon />
                </strong>
                {estudiante.nombres_completos_est}
                <br />
                <strong>ESTADO:</strong> {estudiante.estado}
              </p>
            </center>
          </div>
          <div className="card-datos">
            <div>
              <p>
                <strong>Código:</strong> {estudiante.codigo}
              </p>
              <p>
                <strong>Programa:</strong> {estudiante.nombre_programa}
              </p>
            </div>
            <div>
              <p>
                <strong>Identificación:</strong>{" "}
                {estudiante.identificacion_estudiant}
              </p>
              <p>
                <strong>Plan de estudio:</strong> {estudiante.plan_estudio}
              </p>
              {/* <p>
                <strong>Semestre General:</strong> {estudiante.semestre_general}
              </p> */}
            </div>
            {estudiante.ruta_foto_estudiante && (
              <img
                className="card-foto-docente"
                src={estudiante.ruta_foto_estudiante?.trim() || imagenDocente}
                alt="Foto Estudiante"
              />
            )}
          </div>
        </div>
      )}

      {evaluador.length > 0 && (
        <div>
          <div className="grid-container">
            {evaluador.map((docente, index) => (
              <div key={index} className="cardEvaluador">
                {/* <Button type="submit" className="Btn button-evaluar" startIcon={<ListAltIcon/>} >evaluar</Button> */}
                <button className="buttonEvaluador"
                  onClick={() => handleOpenModal(docente)} >
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <ListAltIcon />
                    </div>
                  </div>
                  <div className="text">Evaluar al Docente</div>
                </button>
                {/* <BotonAddEeva/><EvaluacionDocenteModal/> */}

                <div className="profile-pic">
                  <center>
                    <img
                      src={docente.ruta_foto_docente?.trim() || imagenDocente}
                      alt="Foto Docente"
                    />
                  </center>
                </div>
                <div className="bottom">
                  <div className="content">
                    <span className="name">
                      {docente.nombres_completos_docent}
                    </span>
                    <span className="about-me">
                      <strong>Identificación:</strong>{" "}
                      {docente.identificacion_docente}
                      <br />
                    </span>
                    <span className="about-me">
                      <strong>Semestre Asignatura:</strong>{" "}
                      {docente.semestre_asignatura}
                      <br />
                    </span>
                    <span className="about-me">
                      <strong>Asignatura:</strong> {docente.nombre}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal */}
      {openModal && (
        <EvaluacionDocenteModal
          estudiante={estudiante}
          docente={docenteSeleccionado}  // Pasa la información del docente al modal
          onClose={handleCloseModal}  // Función para cerrar el modal
        />
      )}
    </div>
  );
};

export default EvaluadorView;


