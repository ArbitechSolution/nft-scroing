
const initialState = {
    retriveCollections: {},
    payoutAddress:"",
    retriveCollectionStats:[],
    retriveIsLoading:true,
    retreiceCollectionVol:[],
    retrieceCollectionSale:[]
}
export const Fetch_Retrive_Collection_Reducer = (state= initialState,action)=>{
    switch(action.type){
        case "fetch_retrive_collection" : 
        return{
            ...state,
            retriveIsLoading: action.payload.isLoading,
            payoutAddress:action.payload.payoutAddress,
            retriveCollections: action.payload.data,
            retrieveCollectionsStatsData:action.payload.statsData,
            retriveCollectionStats:action.payload.stats,
            retreiceCollectionVol:action.payload.averagVolume,
            retrieceCollectionSale:action.payload.averagSale
        }
        default:
            return state;
    }
}