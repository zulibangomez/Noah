import noahApi from "../../app/pages/full-layout-page/api/noahApi";



export const menuservice = async() => {
 
 

    try {
        const { data } = await noahApi.get('/menu/menuLis');
        console.log('llego a qui ', data );
        return Array.isArray(data) ? data : []; // Garantiza que sea un arreglo
    } catch (error) {
        console.error('Error al obtener los datos del menú:', error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
    
}
