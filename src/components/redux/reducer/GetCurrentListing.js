const initialState = {
    currentListingDatainReducer: []
}

export const GET_CURRENT_LIST_REDUCER = (state= initialState,action)=>{
    switch(action.type){
        case "GET_CURRENT_LIST" : 
        return{
            ...state,
            currentListingDatainReducer: action.payload
        }
        default:
            return state;
    }
}