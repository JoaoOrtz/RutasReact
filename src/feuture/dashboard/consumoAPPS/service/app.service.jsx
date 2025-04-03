import axios from "axios"



export const GetApi = async () => {
    try {
        const response = await axios.get("https://rickandmortyapi.com/api/character/" )
         return{
            success: true,
            message: response 
        }
    } catch (error) {
        return{
            success: false,
            message: "No hay datos"
        }
    }
}


export const GetOneApi = async (id) =>{    
    try {
        const response = await axios.get("https://rickandmortyapi.com/api/character/"+id)
         return{
            success: true,
            message: response.data
        }
    } catch (error) {
        return{
            success: false,
            message: "No hay datos"
        }
    }
}
