const initialState = {
    floorData: [],
    isLoading:true

}
export const Floor_Price_Reducer = (state= initialState,action)=>{
    switch(action.type){
        case "FLOOR_PRICE" : 
        return{
            ...state,
            floorData: action.payload.data,
            isLoading:action.payload.isLoading
        }
        default:
            return state;

    }
}