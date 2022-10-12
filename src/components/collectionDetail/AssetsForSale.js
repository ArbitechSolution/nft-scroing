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
import { AssetsForSale_Api } from "../redux/Action/Action"
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function AssetsForSale() {
    const params = useParams()
    const dispatch = useDispatch()
    let finalArray = []
    let selectvalue = "15M"
    const getValue = (e) => {
        let slectElement = e.target
        selectvalue = slectElement.value;
        dispatch(AssetsForSale_Api(params, selectvalue))
    }

    // let finalArray=[]
    const { data, isLoading } = useSelector((state) => state.Fetch_AssetsForSale_Reducer)
    // console.log("Data for the asssets listing in assetForSale", data[0])

    data?.map((items) => { 
        // let splittedData = items.timestamp.split(" ")
        let toBeConverted = items.timestamp
            let dateHere = new Date(toBeConverted).toLocaleTimeString('en-US',{
            hour: '2-digit',
            minute: '2-digit',
        })
        // console.log("dateHere hehehhehe", dateHere)
        // console.log("items.timestamp",toBeConverted);
        finalArray = [...finalArray,{ "price": items.price, "date": dateHere}]
      })
    // data?.map((items) => {
    //     let splittedData = items.event_date.split("T")
    //     let finalSplit = splittedData[1].split("Z")
    //     finalArray = [...finalArray, { "price": items.event_price, "date": finalSplit[0] }]
    // })
    useEffect(() => {
        dispatch(AssetsForSale_Api(params, selectvalue))
    }, [])
    return (
        <div className='' style={{ backgroundColor: '#14142B', borderRadius: '10px', paddingLeft: '10px' }}>
            <div className='d-flex pt-1'>
                <div className="text-white text-xl font-bold text-center mb-2">Active Listings</div>
                <div className='d-flex ms-4'>
                    <span>Period</span>
                    <div className="selectFloorPrice ms-2">
                        <select className='selectFloorPriceDown' onChange={(e) => getValue(e)}>
                            <option value="15M" selected>15min</option>
                            <option value="1H" >1H</option>
                            <option value="1D">1D</option>
                            <option value="7D" >7D</option>
                            <option value="30D">30D</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                isLoading ? <ResponsiveContainer width="100%" className="floorpriceheight">
                    <AreaChart data={finalArray}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="85%" stopColor="rgba(53, 53, 84)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis dataKey="price" />
                        <Tooltip />
                        <Area type="monotone" dataKey="date" stroke="#1d1d808c" fillOpacity={1} fill="#14146c6b" />
                        <Area type="monotone" dataKey="price" stroke="#1d1d808c" fillOpacity={1} fill="#27247d" />

                    </AreaChart>
                </ResponsiveContainer> : <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                        <Skeleton count={14} />
                    </p>
                </SkeletonTheme>
            }




        </div>
    )
}

export default AssetsForSale