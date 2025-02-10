import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../shared/ui/uiSlice";


export const useUiStoreAsp = () => {
  const dispatch = useDispatch();

  // Accede al estado de `isDateModalOpen` desde Redux
  const { isDateModalOpen} = useSelector(state => state.ui);

  // Métodos para abrir y cerrar el modal
  const openDateModal = () => {
    if (!isDateModalOpen) {
      dispatch(onOpenDateModal());
    }
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