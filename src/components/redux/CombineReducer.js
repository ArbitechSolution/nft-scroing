import {combineReducers} from "redux"
import { Sale_RankingReducer } from "./reducer/Reducer"
import { Fetch_Collection_Reducer } from "./reducer/FetchCollectionReducer"
import {Fetch_AssetsForSale_Reducer} from "./reducer/AssetsForSaleReducer"
import {Fetch_AnalysisBoard_REducer} from "./reducer/FetchAnalysis_Board_Reducer"
import {Floor_Price_Reducer} from "./reducer/Floor_Price_Reducer";
import {Fetch_Retrive_Collection_Reducer} from "./reducer/fetchRetriveCollection";
import {Fetch_Collection_Stats_Reducer} from './reducer/fetchCollectionStats'
import {GET_CURRENT_LIST_REDUCER} from './reducer/GetCurrentListing'
import {fetch_Auto_SaleRanking} from './reducer/fetchAutoSaleRanking'
export const rootReducers = combineReducers({
    Sale_RankingReducer,
    Fetch_Collection_Reducer,
    Fetch_AssetsForSale_Reducer,
    Fetch_AnalysisBoard_REducer,
    Floor_Price_Reducer,
    Fetch_Retrive_Collection_Reducer,
    Fetch_Collection_Stats_Reducer,
    GET_CURRENT_LIST_REDUCER,
    fetch_Auto_SaleRanking
})

