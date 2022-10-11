
const initialState = {
    auto_data:[],
    auto_filterdta:[],
    auto_outlierDta :[]
}
export const fetch_Auto_SaleRanking=(state = initialState, action)=>{

    switch(action.type){
   case "SALE_RANKING_AutoCall" :
    return{
        ...state,
        auto_data:action.payload.auto_data,
        auto_filterdta:action.payload.auto_filterdta,
        auto_outlierDta:action.payload.auto_outlierDta
    }
    default:
        return state;
     


        // return{
        //     ...state,
        //     data: action.payload.data,
        //     isLoading:action.payload.isLoading

        // }
    }
}