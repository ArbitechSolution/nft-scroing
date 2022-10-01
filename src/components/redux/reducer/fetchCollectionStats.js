
const initialState = {
    collectionStats: {},
    
    retriveIsLoading:false
}
export const Fetch_Collection_Stats_Reducer = (state= initialState,action)=>{
    switch(action.type){
        case "fetch_collection_stats" : 
        return{
            ...state,
            retriveIsLoading: action.payload.isLoading,
            collectionStats: action.payload.data
        }
        default:
            return state;

    }
}