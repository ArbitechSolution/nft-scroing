const initialState = {
    data: [],
    isLoading:false
}
export const Fetch_AssetsForSale_Reducer = (state= initialState,action)=>{
    switch(action.type){
        case "ASSETS_FOR_SALE" : 
        return{
            ...state,
            data: action.payload.data,
            isLoading:action.payload.isLoading

        }
        default:
            return state;

    }
}