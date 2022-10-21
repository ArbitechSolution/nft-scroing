import React, { useState, useEffect } from 'react'
import "./Collection.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
  ScatterChart,
  Legend,
  Cell
} from "recharts"
import moment from "moment";

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Sale_RankingApi } from '../redux/Action/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function SaleRanking() {
  let maxPrice;
  let minPrice;
  const dispatch = useDispatch()
  const [shuffledData, setShuffledData]= useState([])
  const [isOutlierData, setisLierData] = useState(true)
  const colors = scaleOrdinal(schemeCategory10).range();

  const {saleData, isLoading,filterdta,outlierDta} = useSelector((state) => state.Sale_RankingReducer);
  let selectvalue ="15M"
  const getValue = (e) =>{
  let {value} = e.target
   selectvalue = value;
  dispatch(Sale_RankingApi(params, selectvalue))
  }

function shuffle(array) {
  console.log("the array inside Shuffle",array)
  const prices = array.map((obj)=>{
    return obj.price
  })
  minPrice =Math.min(...prices)
  maxPrice =Math.max(...prices)
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  setShuffledData( array);
}
let len = outlierDta.length


useEffect(()=>{
  shuffle(outlierDta)
},[isLoading])  


  const params = useParams()
  useEffect(() => {
    dispatch(Sale_RankingApi(params, selectvalue))
  }, [])

  return (

    <div className='mt-4' style={{ backgroundColor: '#14142B', borderRadius: '10px' }}>
      <div className='d-flex pt-1 justify-content-between pt-3'>
        <div className='d-flex ms-4'>
          <span>Period</span>
          <div className="selectFloorPrice ms-2">
            <select  className='selectFloorPriceDown' onChange={(e)=>getValue(e)}>
              <option value="15M">15 min</option>
              <option value="1H" >1H</option>
              <option value="4H">4H</option>
              <option value="12H">12H</option>
              <option value="1D">1D</option>
              <option value="3D">3D</option>
              <option value="7D">7D</option>

            </select>
          </div>
        </div>

        <div className=' col-md-2 d-flex  justify-content-evenly'>
          <label className="form-check-label" for="flexSwitchCheckDefault">Remove Outliers</label>&nbsp;
          <div className="form-check form-switch" >
            <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault" 
            onChange={()=>setisLierData(!isOutlierData)}
            />
          </div>
        </div>
      </div>
      {
        !isLoading?
        <ResponsiveContainer  className="floorpriceheight">
        <ScatterChart
         width={400}
         height={600}
          margin={{ top: 30, right: 20, bottom: 10, left: 10 }}>
            
          <XAxis dataKey="timestamp" name="date"
          type = "category"

            domain={[saleData[0]?.timestamp, saleData[saleData.length]?.timestamp]}

          tickFormatter={timeStr => moment(timeStr).format('HH:mm')} 
            />
          <YAxis dataKey="price" name="price" 

          />
          <Tooltip cursor={{ strokeDasharray: "1 1"}} />
         
          <Scatter   data={isOutlierData?shuffledData:saleData} fill="#8884d8" >


          {saleData.map((entry, index) => (
              <Cell r={0.002} key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Scatter>
          
        </ScatterChart>
      </ResponsiveContainer>
    
      :
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
            <Skeleton count={12} />
        </p>
    </SkeletonTheme>
      }
     

    </div>
  )
}

export default SaleRanking