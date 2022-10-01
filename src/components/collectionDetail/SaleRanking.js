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
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Sale_RankingApi } from '../redux/Action/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SaleRanking() {
  const dispatch = useDispatch()
  const [isOutlierData, setisLierData] = useState(true)
const colors = scaleOrdinal(schemeCategory10).range();

  const {saleData, isLoading,filterdta,outlierDta} = useSelector((state) => state.Sale_RankingReducer)
  let selectvalue ="15m"
  const getValue = (e) =>{
  let slectElement = e.target
   selectvalue = slectElement.value;
  dispatch(Sale_RankingApi(params, selectvalue))
  }

  

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
              <option value="15m">15 min</option>
              <option value="30m">30 min</option>
              <option value="45m">45 min</option>
              <option value="1h">1 hour</option>
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
         height={400}
          margin={{ top: 30, right: 20, bottom: 10, left: 10 }}>
          <XAxis dataKey="date" name="date"  />
          <YAxis dataKey="price" name="price" />
          <Tooltip cursor={{ strokeDasharray: "1 1"}} />
         
          <Scatter   data={isOutlierData?outlierDta:filterdta} fill="#8884d8" >
          {outlierDta.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Scatter>
          
        </ScatterChart>
      </ResponsiveContainer>:
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