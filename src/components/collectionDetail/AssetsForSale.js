import React, { useEffect } from 'react'
import "./Collection.css"
import {
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    ResponsiveContainer,
} from "recharts"
import {AssetsForSale_Api} from "../redux/Action/Action"
import { useSelector, useDispatch } from 'react-redux';
import { useParams  } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function AssetsForSale() {
    const params = useParams()
    const dispatch = useDispatch()
    let finalArray = []

const {data,isLoading} = useSelector((state)=>state.Fetch_AssetsForSale_Reducer)
data?.map((items) => {
    let splittedData = items.event_date.split("T")
    let finalSplit = splittedData[1].split("Z")
    finalArray = [...finalArray, { "price": items.event_price, "date": finalSplit[0] }]
  })
console.log("AssetsForSaleData", isLoading);
    useEffect(()=>{
        dispatch(AssetsForSale_Api(params))
    }, [])
    return (
        <div className='' style={{backgroundColor: '#14142B',borderRadius: '10px', paddingLeft: '10px'}}>
            <div className='d-flex pt-1'>
            <div className="text-white text-xl font-bold text-center mb-2">Active Listings</div>
            <div className='d-flex ms-4'>
                <span>Period</span>
                <div className="selectFloorPrice ms-2">
                    <select className='selectFloorPriceDown'>
                        <option value="1">15 min</option>
                        <option value="2">30 min</option>
                        <option value="3">45 min</option>
                        <option value="3">1 hour</option>
                    </select>
                </div>
            </div>
            </div>
            {
                isLoading?  <ResponsiveContainer width="99%"  className="floorpriceheight">
                <AreaChart   data={finalArray}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="85%" stopColor="rgba(53, 53, 84)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis dataKey="price"/>
                    <Tooltip />
                    <Area type="monotone" dataKey="date" stroke="#1d1d808c" fillOpacity={1} fill="#14146c6b" />
                    <Area type="monotone" dataKey="price" stroke="#1d1d808c" fillOpacity={1} fill="#27247d" />
                   
                </AreaChart>
                </ResponsiveContainer>:<SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
            <Skeleton count={12} />
        </p>
    </SkeletonTheme>
            }
          


            
        </div>
    )
}

export default AssetsForSale