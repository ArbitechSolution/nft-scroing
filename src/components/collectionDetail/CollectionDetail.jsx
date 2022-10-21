import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import './Collection.css'
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loading from "../../assets/loading.svg";
import website from "../../assets/website.svg";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.svg";
import opensea from "../../assets/opensea.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {Fetch_Collection_Api} from "../redux/Action/Action"
import Skeleton from 'react-loading-skeleton'

function CollectionDetail() {
  const dispatch = useDispatch()
  const [period, setPeriod] = useState(60);
  const {collections, isLoading} = useSelector((state)=> state.Fetch_Collection_Reducer);
  useEffect(() => {
      dispatch(Fetch_Collection_Api(period))
  }, [period]);
 
  const handlePeriod = (period) => {
    setPeriod(period)
  }
  return (
    <>
      {isLoading ?
        <div className='' style={{ height: "100vh" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <img src={loading }  alt="load" height="70px" width="70px" />
          </div>
        </div>
        :
        <div className='container-fluid '>
          <div className='row text-light mt-5'>
            <div className='col-12  d-flex justify-content-between flex-row align-items-center'>
              <span className='periodBTN px-5 py-2 rounded'>Trending</span>
              <div className=''>
                <span className='me-3'>Period:</span>
                <button className={"py-1 px-1 btn text-white me-2" + (period === Number(30) ? ' periodBTN' : '')} onClick={() => handlePeriod(30)}>30 m</button>
                <button className={"py-1 px-1 btn text-white me-2" + (period === Number(60) ? ' periodBTN' : '')} onClick={() => handlePeriod(60)}>1 h</button>
                <button className={"py-1 px-1 btn text-white me-2" + (period === Number(240) ? ' periodBTN' : '')} onClick={() => handlePeriod(240)}>4 h</button>
                <button className={"py-1 px-1 btn text-white  me-5" + (period === Number(1440) ? ' periodBTN' : '')} onClick={() => handlePeriod(1440)}>1 d</button>
              </div>
            </div>
          </div>
          <div className='row mt-3'>

            <div className='col-md-12'>
              <Table  className="borderless " responsive="lg" >
                <thead>
                  <tr>
                    <th>COLLECTIONS</th>
                    <th>1H SALES</th>
                    <th>1H VOLUME</th>
                    <th>MAX SALE</th>
                    <th>FLOOR</th>
                    <th>EXPLORE</th>

                  </tr>
                </thead>

                <tbody>
                  {collections?.map((item, index) => {
                    return <tr key={item.id} className="hoverColor">
                      <NavLink to={`/AnalysisBoard/${item.slug} `} style={{ textDecoration: 'none', color: 'white' }} onClick={()=>window.scrollTo(0,0)}>
                      <td >
                        <div className='d-flex'>

                          <img className='rounded' src={item.image}
                            width="45"
                            height="45" />
                          <div className='mx-5'>
                            <div>{item.name}</div>
                            <div>{item.assets } assets</div>
                          </div>
                        </div>
                      </td>
                      </NavLink>
                      <td ><div className='mx-1'>
                        <div className="" >
                          {item.sales }
                        </div>
                        {item.sales_percentage > 0 ?
                          <div className="d-flex text-sm  mt-1">
                            <FontAwesomeIcon icon={faArrowTrendUp } className="mt-1 text-success" />
                            <div className='ms-1'>{item.sales_percentage}%</div>
                          </div> :
                          <div className="d-flex text-sm  mt-1">
                            <FontAwesomeIcon icon={faArrowTrendDown} className="mt-1 text-danger" />
                            <div className='ms-1'>{Math.abs(item.sales_percentage)}%</div>
                          </div>
                        }
                      </div></td>
                      
                      <td>
                        <div className='mx-1'>
                          <div className="" >
                            {Math.floor(item.volume * 10) / 10 }
                          </div>
                          {item.volume_percentage > 0 ?
                            <div className="d-flex text-sm  mt-1">
                              <FontAwesomeIcon icon={faArrowTrendUp} className="mt-1 text-success" />
                              <div className='ms-1'>{item.volume_percentage }%</div>
                            </div> :
                            <div className="d-flex text-sm  mt-1">
                              <FontAwesomeIcon icon={faArrowTrendDown} className="mt-1 text-danger" />
                              <div className='ms-1'>{Math.abs(item.volume_percentage) }%</div>
                            </div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className='mx-1'>
                          <div className="" >
                            {Math.floor(item.max_sale * 100) / 100 }
                          </div>
                          {item.max_sale_percentage > 0 ?
                            <div className="d-flex text-sm  mt-1">
                              <FontAwesomeIcon icon={faArrowTrendUp } className="mt-1 text-success" />
                              <div className='ms-1'>{item.max_sale_percentage}%</div>
                            </div> :
                            <div className="d-flex text-sm  mt-1">
                              <FontAwesomeIcon icon={faArrowTrendDown } className="mt-1 text-danger" />
                              <div className='ms-1'>{Math.abs(item.max_sale_percentage)}%</div>
                            </div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className='mx-1 mt-2'>
                          {Math.floor(item.floor_price * 1000) / 1000}

                        </div>
                      </td>
                      <td>
                        <div className='mx-1 mt-2 d-flex'>
                          {item.image && <a href={item.image} target="blank" className='mx-2'><img src={opensea} alt="load" className="" width="30" height="30" /></a> }
                          {item.discord_url && <a href={item.discord_url} target="blank" className='mx-2'><img src={discord} alt="load" className="" width="30" height="30" /></a> }
                          {item.twitter_username && <a href={`https://twitter.com/${item.twitter_username}`} target="blank" className='mx-2'><img src={twitter} alt="load" className="" width="30" height="30" /></a> }
                          {item.website && <a href={item.website} target="blank" className='mx-2'><img src={website} alt="load" className="" width="30" height="30" /></a> }
                        </div>
                      </td>
                    </tr>
                  })
                  }
                </tbody>

              </Table>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default CollectionDetail