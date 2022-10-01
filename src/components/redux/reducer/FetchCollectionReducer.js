
const initialState = {
    collections: [],
    isLoading:false
}
export const Fetch_Collection_Reducer = (state= initialState,action)=>{
    switch(action.type){
        case "FETCH_cOLLECTON" : 
        return{
            ...state,
            isLoading: action.payload.isLoading,
            collections: action.payload.data
        }
        default:
            return state;

    }
}