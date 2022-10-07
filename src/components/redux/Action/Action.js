import {SALE_RANKING, FETCH_cOLLECTON,GET_CURRENT_LIST, ANALYSIS_BOARD, ASSETS_FOR_SALE, FLOOR_PRICE} from "../Type"
import axios from "axios"
import moment from "moment";

const API_KEY = process.env.REACT_APP_API_KEY;
export const Sale_RankingApi = (params, selectvalue) => async(dispatch)=>{
    try{
  let finalArray = []
        dispatch({
            type: SALE_RANKING,
            payload: {
                data:[],
                isLoading:true,
                filterdta:[],
                outlierDta :[]
            }
           });
           let {data} =await axios.get(`https://nft-scoring.herokuapp.com/v2/saleListing?timestamp=${selectvalue}&collection_slug=${params.collectionName}`)

        //    let {data} =await axios.get(`http://localhost:7070/v2/saleListing?timestamp=${selectvalue}&collection_slug=${params.collectionName}`)
           let {result} = data
        //    console.log("result", result);
        //    let res = await axios.get(`https://api.nftinit.io/api/sale_chart/?tc=true&tn=true&get_listings=true&period=${selectvalue}&slug=${params.collectionName}`)
        //    console.log("res", res.data);
//    let res = await axios.get(`https://orcanftapi.net:5000/api/collection/SaleChart?period=${selectvalue}&collectionName=${params.collectionName}`)
//    let typicalData = res?.data?.items;

dispatch({
    type: SALE_RANKING,
    payload: {
        data:result,
        isLoading:true,
        filterdta:[],
        outlierDta :[]
    }
   });
//    result?.map((items) => {
//     // let finalTime =new Date(items.event_date);
//     // finalTime = finalTime.getTime()

//     // console.log("items.finalTime",finalTime);
//     // let splittedData = items.event_date.split("T")
//     // let finalSplit = splittedData[1].split("Z")
//     // let seconsSplit = finalSplit[0].split(":")
//     // let finalTime = `${seconsSplit[0]}:${seconsSplit[1]}`
//     // console.log("finalTime", finalTime)
//     console.log("momentinf sadfddsf",moment(items.timestamp).format('HH:mm'))

//     // finalArray = [...finalArray, { "price": items?.event_price, "date": finalTime }]
//   })

  let values = result?.sort( function(a, b) {
    return a.price - b.price;
  });
//   console.log("values", values);
  var q1 = values[Math.floor((values.length / 4))];
  var q3 = values[Math.ceil((values.length * (3 / 4)))];
  var iqr = q3?.price - q1?.price;
  var maxValue = q3?.price + iqr*1.5;
//   console.log("max", maxValue);
  var minValue = q1?.price - iqr*1.5;
//   console.log("min", minValue);
  let filteredData = values.filter(function(x) {
    if(x.price <= maxValue && x.price >= minValue){
      return x;
    }
  });
//   console.log("filteredData", filteredData);
   dispatch({
    type: SALE_RANKING,
    payload: {
        data:result,
        isLoading:false,
        filterdta:finalArray,
        outlierDta :filteredData

    }
   })
    }catch(error){
        console.log("error while getting saleRanking api ", error);
    }

}

export const Fetch_Collection_Api = (period)=>async(dispatch)=>{
    try{
        dispatch({
            type: FETCH_cOLLECTON,
            payload: {
                data:[],
                isLoading:true
            }
           })
let res = await axios.get(`https://orcanftapi.net:5000/api/collection/Trending?period=${period}`)
       dispatch({
        type: FETCH_cOLLECTON,
        payload: {
            data:res.data,
            isLoading:false
        }
       })
    }catch(error){
        console.log("error", error);
    }
}
export const AssetsForSale_Api = (params)=>async(dispatch)=>{
    try{
        
        dispatch({
            type: ASSETS_FOR_SALE,
            payload: {
                data:[],
                isLoading:false
            }
           
        })
        let res = await axios.get(`https://orcanftapi.net:5000/api/collection/ListedAssets?collectionName=${params.collectionName}`)
     
        dispatch({
            type: ASSETS_FOR_SALE,
            payload: {
                data:res?.data,
                isLoading:true
            }
           
        })
    }catch(error){
        console.log("error", error);
    }
   
}
export const FetchAnalysis_Board_Api = (params)=>async(dispatch)=>{
    try{
let res = await axios.get(`https://nameless-garden-35810.herokuapp.com/collections/${params.collectionName}`)
  dispatch({
    type: ANALYSIS_BOARD,
    payload: res.data.data.collection
  })
    }catch(error){
        console.log();
    }
}


export const Floor_Price_Api = (params,selectvalue)=>async(dispatch)=>{
     try{

        dispatch({

            type: FLOOR_PRICE,
            payload: {
                data:[],
                isLoading:false
            }
        })  

        let valTobepassed ;
        let  currentdate = (new Date()).getTime();
        currentdate = parseInt(currentdate/1000)
        if(selectvalue =="15M"){
            valTobepassed = parseFloat(currentdate)-900
        }else if(selectvalue =="1H"){

            valTobepassed = parseFloat(currentdate)-3600

        }else if(selectvalue =="1D"){

            valTobepassed = parseFloat(currentdate)-86400

        }else if (selectvalue=="7D"){

            valTobepassed = parseFloat(currentdate)-604800

        }else{
            valTobepassed = parseFloat(currentdate)-2592000

        }
        
        let res = await axios.get(`https://orcanftapi.net:5000/api/collection/FloorPrice?timestamp=${valTobepassed}&collectionName=${params.collectionName}`)
        
        dispatch({
            type: FLOOR_PRICE,
            payload: {
                data:res?.data,
                isLoading:true
            }
        

        })
     }catch(error){
        console.log("error", error);
     }
}

export const fetch_retrive_collection = (params) => async (dispatch)=>{
    try {
        dispatch({
            type:"fetch_retrive_collection",
            payload:{
                data:{},
                statsData:{},
                isLoading:true,
                stats:[],
                averagVolume:[],
                averagSale:[]
            }
        })
        let res =await axios.get(`https://api.opensea.io/api/v1/collection/${params.collectionName}`,
        {
            headers: { "X-API-KEY": API_KEY },
          })
          let avgPricesArray = []
          let avgVol=[]
          let avgSales=[]
        let filData = res.data.collection.stats

        let oneHourAvgPrice = filData.one_day_average_price
        avgPricesArray.push(oneHourAvgPrice)

          let oneHrVol = filData.one_hour_volume
          avgVol.push(oneHrVol)

          let oneHrsale = filData.one_hour_sales
          avgSales.push(oneHrsale)

          let sixHrsale = filData.six_hour_sales
          avgSales.push(sixHrsale)

          let onedaysale = filData.one_day_sales
          avgSales.push(onedaysale)

          let sevendaysale = filData.seven_day_sales
          avgSales.push(sevendaysale)

          let thrtyDaysale = filData.thirty_day_sales
          avgSales.push(thrtyDaysale)

            let sixHrVol = filData.six_hour_volume
            avgVol.push(sixHrVol)

        let oneDayVol =filData.one_day_volume
        avgVol.push(oneDayVol)

        let sevenDayVol = filData.seven_day_volume
        avgVol.push(sevenDayVol)

          let thrtyDayVol = filData.thirty_day_volume
          avgVol.push(thrtyDayVol)


        let  sixHourAvgPrice = filData.six_hour_average_price
        avgPricesArray.push(sixHourAvgPrice)

        let oneDayAvgPrice = filData.one_hour_average_price
        avgPricesArray.push(oneDayAvgPrice)

        let sevenDayAvgPrice = filData.seven_day_average_price
        avgPricesArray.push(sevenDayAvgPrice)

        let thirtyDayAvgPrice = filData.thirty_day_average_price
        avgPricesArray.push(thirtyDayAvgPrice)
      
        dispatch({
            type:"fetch_retrive_collection",
            payload:{
                data:res.data.collection,
                statsData:res.data.collection.stats,
                isLoading:false,
                stats:avgPricesArray,
                averagVolume:avgVol,
                averagSale:avgSales
            }
        })
    } catch (error) {
        console.error("error while fetch retrive collection", error);
    }
}


export const fetchCurrentListing=(params) => async (dispatch)=>{
    let {collectionName} = params;
    try {
        dispatch({
            type:GET_CURRENT_LIST,
            payload:{
                currentListingData:[],
                isLoading:true
            }
        })
        let res =await axios.get(`https://orcanftapi.net:5000/api/collection/LIstedAssets?collectionName=kryptic-kids`,
        {
            headers: { "X-API-KEY": API_KEY },
          }
          )
        dispatch({
            type:GET_CURRENT_LIST,
            payload:{
                currentListingData:res.data.stats,
                isLoading:false
            }
        })
    } catch (error) {
        console.error("error while getting List of current Items", error);
    }
}

