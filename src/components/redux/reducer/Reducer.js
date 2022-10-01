const initialState = {
    saleData: [],
    isLoading:true,
    filterdta:[],
    outlierDta:[]

}

export const Sale_RankingReducer = (state= initialState,action)=>{
    switch(action.type){
        case "SALE_RANKING" : 
        return{
            ...state,
            saleData: action.payload.data,
            isLoading:action.payload.isLoading,
            filterdta:action.payload.filterdta,
            outlierDta:action.payload.outlierDta
        }
        default:
            return state;

    }
}