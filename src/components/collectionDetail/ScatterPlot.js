import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { Sale_RankingApi} from '../redux/Action/Action';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'chartjs-adapter-moment'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

function MyScatterPlot() {
    const [loadingSetTimeOut, setLoadingsetTimeout] = useState(true)
    const dispatch = useDispatch()
    const { saleData, isLoading, filterdta, outlierDta } = useSelector((state) => state.Sale_RankingReducer);
    const [timeScale, setTimeScale] = useState('day')
    const [isOutlierData, setisLierData] = useState(true)

    let selectvalue = "7D"
    if(isOutlierData){
        // console.log("true whowing",outlierDta);
    }else{
        // console.log("fasle whowing",saleData);
    }
  
    const getValue = (e) => {
        let { value } = e.target
        selectvalue = value;
        if (selectvalue == "15M") {
            setTimeScale("minute")

        } else if (selectvalue == "1H") {
            setTimeScale("minute")

        }else if (selectvalue == "1D") {
            setTimeScale("hour")

        }  else if (selectvalue == "7D") {
            setTimeScale("day")

        }else if(selectvalue =="30D"){
            setTimeScale("day")
        }
        dispatch(Sale_RankingApi(params, selectvalue))
    }
    const data = {
        datasets: [
            {
                label: 'A dataset',
                data: isOutlierData?
                outlierDta?.map((items) => {
                        return { x: items.timestamp, y: items.price }
                    }
                    ):saleData?.map((items) => {
                        return { x: items.timestamp, y: items.price }
                    }
                    ),
                backgroundColor: '#00FF00',
            },
        ],
    };
    const options = {
        data: isOutlierData?data:saleData,
        plugins: {
            legend: {
              display: false
            }
          },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit:timeScale
                },
                grid: {
                    display: false,
                    lineWidth: 0
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: false,
                    lineWidth: 0
                },
            },
        },
    };
   
   

  

    const params = useParams()
    useEffect(() => {
        dispatch(Sale_RankingApi(params, selectvalue))
    //      setInterval(()=>{
    //     console.log("calling after 30 seconds ")
    //     dispatch(Sale_RankingApi(params, selectvalue))
    // },60000)
    }, [])

    return (
        <div className='mt-4' style={{ backgroundColor: '#14142B', borderRadius: '10px' }}>
            <div className='d-flex pt-1 justify-content-between pt-3'>
                <div className='d-flex ms-4'>
                    <span>Period</span>
                    <div className="selectFloorPrice ms-2">
                        <select className='selectFloorPriceDown' onChange={(e) => getValue(e)}>
                            <option value="15M">15min</option>
                            <option value="1H" >1H</option>
                            <option value="1D">1D</option>
                            <option value="7D" selected>7D</option>
                            <option value="30D">30D</option>
                        </select>
                    </div>
                </div>
                <div className=' col-md-2 d-flex  justify-content-evenly'>
                    <label className="form-check-label" for="flexSwitchCheckDefault">Outliers</label>&nbsp;
                    <div className="form-check form-switch" >
                        <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault"
                        onChange={()=>setisLierData(!isOutlierData)}
                        />
                    </div>
                </div>
            </div>
            {
                !isLoading ?
                    <Scatter options={options} data={data} width={380} height={180}/>
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

export default MyScatterPlot