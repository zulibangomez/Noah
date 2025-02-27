import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../shared/ui/uiSlice";


export const useUiStoreAsp = () => {
  const dispatch = useDispatch();

  // Accede al estado de `isDateModalOpen` desde Redux
  const { isDateModalOpen} = useSelector(state => state.ui);

  // Métodos para abrir y cerrar el modal
  const openDateModal = () => {
    console.log("Intentando abrir el modal. Estado actual:", isDateModalOpen);
    if (isDateModalOpen) {
      console.warn("El modal ya está abierto, evitando duplicación.");
      return; // Evita que se ejecute nuevamente
    }
    
    console.log("Abriendo modal...");
    dispatch(onOpenDateModal());
  };
  const closeDateModal = () => dispatch(onCloseDateModal());
 
  return {
    // Propiedades
    isDateModalOpen,
    // Métodos
    openDateModal,
    closeDateModal
  };
};