export const IS_NOT_EXIST_USER_IN_THE_API = 'IS_NOT_EXIST_USER_IN_THE_API'

export const isNotExistUserInTheAPI = (isNotExistUserInTheAPIParams) => {
    /* 
    Esta función se encarga de pasar un parametro a la vista de autenticación,
    siempre y cuando el usuario no haya creado en la API un perfil, esto prevee que el usaurio
    por obligación cree dicho perfil, ya que se da la situación en donde el usuario
    crea un perfil en cognito pero no termina el flow de registro y al momento de 
    reconectar la app, cognito mantiene sesión y envía al usuario al pantalla de Home.

    Como parametro recibe el número dos, ya que es el indice que se necesita para el componemte swiper
    en la vista de <MoreAboutuser>.
    */

    return (dispatch) => {
        return dispatch({
            type: IS_NOT_EXIST_USER_IN_THE_API,
            isNotExistUserInTheAPI: isNotExistUserInTheAPIParams
        })
    }
}