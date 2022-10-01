const initialState = {
    data: []
}

export const Fetch_AnalysisBoard_REducer = (state= initialState,action)=>{
    switch(action.type){
        case "ANALYSIS_BOARD" : 
        return{
            ...state,
            data: action.payload
        }
        default:
            return state;

    }
}