import React, { useEffect, useState } from 'react'
import "./Collection.css"
import {
    AreaChart,
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

let [selectvalue, setSelectvalue] = useState("30D")
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let finalArray = floorData.result
    finalArray?.map((items) => { 
        let splittedData = items.timestamp.split(" ")
        if( selectvalue == "7D" || selectvalue == "30D"){
            let toBeConverted = items.timestamp
            toBeConverted = toBeConverted.split(" ")
            toBeConverted = toBeConverted[0].split("-")
            let month = monthNames[parseInt(toBeConverted[1])-1];
            let day = toBeConverted[0]
            finalArrayOne = [...finalArrayOne, { "price": items.floor_price, "date": `${month} 
            ${day}`}]
        }else{
            let intoHours = splittedData[1];
            intoHours = intoHours.split(":")
    finalArrayOne = [...finalArrayOne, { "price": items.floor_price, "date": `${intoHours[0]}:${intoHours[1]}`}]

        }
      })
const getValue = (e) =>{
let {value} = e.target
 setSelectvalue(value);
dispatch(Floor_Price_Api(params, value))
}
    useEffect(()=>{
        dispatch(Floor_Price_Api(params))
    },[])
    return (
      
        <div style={{ backgroundColor: '#14142B', borderRadius: '10px' }} className="">
            <div className='d-flex justify-content-between pt-1'>
            <div className="text-white text-xl font-bold text-start mb-2 ms-2">Floor Price</div>
            <div className=''>
                <div className="selectFloorPrice me-2">
                <span className="text-white text-xl font-bold">Period</span>&nbsp;
                    <select className='selectFloorPriceDown text-white text-xl font-bold' onChange={(e)=>getValue(e)}>
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
                    margin={{ top: 10, right: 30, left: 10, bottom: 15 }}>
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