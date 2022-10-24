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
import {Dropdown, DropdownButton} from 'react-bootstrap';
import { AssetsForSale_Api } from "../redux/Action/Action"
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function AssetsForSale() {
    const params = useParams()
    const dispatch = useDispatch()
    let finalArray = []
    let selectvalue = "7D"
    const getValue = (e) => {
        let slectElement = e.target
        selectvalue = slectElement.value;
        dispatch(AssetsForSale_Api(params, selectvalue))
    }

    // let finalArray=[]
    const { data, isLoading } = useSelector((state) => state.Fetch_AssetsForSale_Reducer)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
    data?.map((items) => { 
        let toBeConverted = items.timestamp;
            toBeConverted = toBeConverted.split(" ")
            toBeConverted = toBeConverted[0].split("-")
            let month = monthNames[parseInt(toBeConverted[1])-1];
            let day = toBeConverted[0]
        finalArray = [...finalArray,{ "Listing": items.listed_count, "date": `${month}:${day}`}]
      })
    useEffect(() => {
        dispatch(AssetsForSale_Api(params, selectvalue))
    }, [])
    return (
        <div className='' style={{ backgroundColor: '#14142B', borderRadius: '10px', paddingLeft: '10px' }}>
            <div className='d-flex justify-content-between pt-1'>
                <div className="text-white text-xl font-bold text-center mb-2">Active Listings</div>
                <div className=''>
                    <div className="selectFloorPrice me-2">
                    <span className="text-white text-xl font-bold">Period</span>&nbsp;
                    {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton> */}
                        <select className='selectFloorPriceDown text-white text-xl font-bold' onChange={(e) => getValue(e)}>
                            <option value="3D" >3D</option>
                            <option value="7D" selected >7D</option>
                            <option value="14D">14D</option>
                            <option value="30D" >30D</option>
                            <option value="60D">60D</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                isLoading ? <ResponsiveContainer width="100%" className="floorpriceheight">
                    <AreaChart data={finalArray}
                        margin={{ top: 10, right: 30, left: 0, bottom: 15 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="85%" stopColor="rgba(53, 53, 84)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis dataKey="Listing" />
                        <Tooltip />
                        <Area type="monotone" dataKey="date" stroke="#1d1d808c" fillOpacity={1} fill="#14146c6b" />
                        <Area type="monotone" dataKey="Listing" stroke="#1d1d808c" fillOpacity={1} fill="#27247d" />

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