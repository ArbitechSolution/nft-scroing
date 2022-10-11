import React, { useEffect } from 'react'
import "./Collection.css"
import {
    AreaChart, Bar,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    ResponsiveContainer,
} from "recharts"
import { useSelector, useDispatch } from 'react-redux';
import { useParams  } from "react-router-dom";
import {Floor_Price_Api} from "../redux/Action/Action"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function FloorPrice() {
    
    const params = useParams()
    const dispatch = useDispatch()
  let finalArrayOne = []

  const {floorData,isLoading} = useSelector((state)=>state.Floor_Price_Reducer);
//   console.log("floor Data", floorData.result)
  let finalArray = floorData.result
    finalArray?.map((items) => { 
        let splittedData = items.timestamp.split(" ")
        finalArrayOne = [...finalArrayOne, { "price": items.floor_price, "date": splittedData[1]}]
      })

let selectvalue ="30D"
const getValue = (e) =>{
let slectElement = e.target
 selectvalue = slectElement.value;
dispatch(Floor_Price_Api(params, selectvalue))
}
    useEffect(()=>{
        dispatch(Floor_Price_Api(params))
    },[])
    return (
      
        <div style={{ backgroundColor: '#14142B', borderRadius: '10px' }}>
            <div className='d-flex pt-1'>
            <div className="text-white text-xl font-bold text-start ms-2">Floor Price</div>
            <div className='d-flex ms-4'>
                <span>Period</span>
                <div className="selectFloorPrice ms-2">
                    <select className='selectFloorPriceDown' onChange={(e)=>getValue(e)}>
                    <option value="15M">15min</option>
                            <option value="1H" >1H</option>
                            <option value="1D">1D</option>
                            <option value="7D" >7D</option>
                            <option value="30D" selected>30D</option>
                    </select>
                </div>
            </div>
            </div>
            {
                isLoading?
                <ResponsiveContainer width="100%" className="floorpriceheight">
                <AreaChart   data={finalArrayOne}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#990033" opacity={0.2} />
                            <stop offset="95%" stopColor="#990033" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis dataKey="price"/>
                    <Tooltip />
                    <Area type="monotone" dataKey="date" stroke="#990033" fillOpacity={1} fill="#990033b3" />
                    <Area type="monotone" dataKey="price" stroke="#990033" fillOpacity={1} fill="#990033b3" />
                </AreaChart>
                </ResponsiveContainer>:<SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
            <Skeleton count={14} />
        </p>
    </SkeletonTheme>
            }
        
        </div>
    )
}

export default FloorPrice