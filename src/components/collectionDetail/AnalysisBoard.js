// import React from 'react'
import react, { useEffect, useState } from "react";
import OutWebsite from "../../assets/OutWebsite.svg"
import "./Collection.css"
import ether from "../../assets/ether.svg"
import website from "../../assets/website.svg"
import discord from "../../assets/discord.svg"
import opensea from "../../assets/opensea.svg"
import twitter from "../../assets/twitter.svg"
import loading from "../../assets/loading.svg"
import { BsLightningChargeFill } from "react-icons/bs"
import { OpenSeaSDK, Network } from 'opensea-js';
import {AiFillCopy} from "react-icons/ai"
import {
    AreaChart,
    Area,
} from "recharts";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import AssetsForSale from "./AssetsForSale";
import FloorPrice from "./FloorPrice";
import copy from "copy-to-clipboard"; 
import SaleRanking from "./SaleRanking";
import {AiFillCaretUp, AiFillPlusCircle} from "react-icons/ai"
import { useParams  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {FetchAnalysis_Board_Api, fetch_retrive_collection, fetch_collection_stats,fetchCurrentListing} from "../redux/Action/Action";
import { loadWeb3 } from "../api/api";
import { toast } from 'react-toastify';
const API_KEY = process.env.REACT_APP_API_KEY || "";


function    AnalysisBoard() {
    const [load,setLoad] = useState(true)
    const [listingData, setListingData]= useState(null)
    const params = useParams()
    const [isload,setisLoad]= useState(false)
    const [isCopy, setIsCopy] = useState("");
    const [listingDataLength, setListingDataLength]= useState(0)
    const [tradesDataArray, setTradesDataArray] = useState([])
    const dispatch = useDispatch();
    const Fetch_AnalysisBoard_REducer_Data = useSelector((state)=>state.Fetch_AnalysisBoard_REducer.data)
    let {retriveCollections, retriveIsLoading, retriveCollectionStats,retreiceCollectionVol,retrieceCollectionSale  } = useSelector(state => state.Fetch_Retrive_Collection_Reducer);
  let finalArray = []
      const copyToClipboard = () => {
        copy(retriveCollections?.payout_address);
        toast.success("Address copied!");
        setIsCopy("copy")
     }
    let totalsupply = Fetch_AnalysisBoard_REducer_Data?.stats?.total_supply;
    let floorprice = Fetch_AnalysisBoard_REducer_Data?.stats?.floor_price;
    let osFloor = Fetch_AnalysisBoard_REducer_Data?.stats?.total_volume;
    const data = [
        {
            name: 'Page A',
            vol: retreiceCollectionVol[0],
            sale: retrieceCollectionSale[0],
            avgPrice: retriveCollectionStats[0],
        },
        {
            name: 'Page B',
            vol: retreiceCollectionVol[1],
            sale: retrieceCollectionSale[1],
            avgPrice: retriveCollectionStats[1],
        },
        {
            name: 'Page C',
            vol: retreiceCollectionVol[2],
            sale: retrieceCollectionSale[2],
            avgPrice: retriveCollectionStats[2],
        },
        {
            name: 'Page C',
            vol: retreiceCollectionVol[3],
            sale: retrieceCollectionSale[3],
            avgPrice: retriveCollectionStats[3],
        },
        {
            name: 'Page C',
            vol: retreiceCollectionVol[4],
            sale: retrieceCollectionSale[4],
            avgPrice: retriveCollectionStats[4],
        }
    ];
    const buyNft = async(value,i)=>
    {
        
        try{
            
            let acc= await loadWeb3();
            const web3 = window.web3;

            if (acc=="No Wallet"){
                toast.error("No wallet Connected")
            }      
            else if(acc=="Wrong Network"){ 
                toast.error("Wrong Network")
            }else{
                let nftPrice = listingData[i].event_price;
                let usersBalance =await web3.eth.getBalance(acc);
                usersBalance = web3.utils.fromWei(usersBalance);
                if(parseFloat(usersBalance)>parseFloat(nftPrice)){
                    const provider = window.ethereum;
                    const openseaSDK = new OpenSeaSDK(provider, {
                        networkName: Network.Main,
                        apiKey: API_KEY
                      })
        
                      const {orders} = await openseaSDK.api.getOrders({
                        assetContractAddress:retriveCollections?.payout_address,
                        tokenId:value,
                        side: "ask",
                        orderBy: "eth_price",
                      })
                    if(!orders.length){
                    toast.info("This Nft is not listed for sale")
    
                    }else{
                        
                      await openseaSDK.fulfillOrder({
                        order:orders[0],
                         accountAddress:acc, // The address of your wallet, which will sign the transaction
                         recipientAddress:acc // The address of the recipient, i.e. the wallet you're purchasing on behalf of
                       })
                       toast.success("Transaction Successfull")
                    //    res.send({success:true,result:"NFT have been purchased successfully!"})
                    }
                }else{
                    toast.info("Insufficient Balance Please Recharge")
                }
                
              
            }
        }catch(e){
            console.log("error while buying nft",e.message);
            toast.error(`${e.message}`)
        }
        
    }

const fetchApis= async()=>{
    try{

        const res= await Promise.all([
            fetch(`https://orcanftapi.net:5000/api/collection/LIstedAssets?collectionName=${params.collectionName}`,
            {
                headers: { "X-API-KEY": API_KEY },
              }),
            fetch(`https://orcanftapi.net:5000/api/collection/SaleChart?period=1h&collectionName=${params.collectionName}`,
            {
                headers: { "X-API-KEY": API_KEY },
              }),
        ])
        const data = await Promise.all(res.map(r => r.json()))
        setisLoad(true)
        setListingData(data[0])
        setListingDataLength(data[0].length)
        data[0]?.map((items) => {
            
            let splittedData = items.event_date.split("T")
            let finalSplit = splittedData[1].split("Z")
            finalArray = [...finalArray,finalSplit[0] ] 
          })
        setTradesDataArray(data[1].items)


    }catch(e){
      console.log("Error while fetching listing and trades api",e);
    }
}

useEffect(()=>{
    setLoad(true)
    dispatch(FetchAnalysis_Board_Api(params))
    dispatch(fetch_retrive_collection(params));
    fetchApis()
},[])
    return (
<>
        {retriveIsLoading ? 
            <div className='' style={{ height: "100vh" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <img src={loading} alt="load" height="70px" width="70px" />
        </div>
      </div>:
      <div className='fluid-container ' >
      <div className='container ' >
          <div className="row d-flex justify-content-center text-white mt-5" >
              <div className="col-lg-7 d-flex  justify-content-center" >
                  <div className='row d-flex justify-content-center' >
                      <div className='col-lg-3 col-11 justify-content-center ' >
                          <img src={retriveCollections?.banner_image_url} alt="banner" className="AnalysisBoardImage img-fluid" />
                          <div className="row" >
                          <div className=" col-12 d-flex justify-content-md-between mt-2" >
                              <button className=" btnicon me-sm-0 me-3"><AiFillCaretUp size={15}/>&nbsp;1.5k</button>
                              <button className=" btnicon"><AiFillPlusCircle size={15}/>&nbsp;Watch</button>
                          </div>
                          <span className="text-center mt-2 aTagStyle">Refresh metadata</span>
                          </div>
                      </div>
                      <div className=' col-lg-9 ps-3' >
                          <div className="text-4xl font-bold" >{retriveCollections?.name}</div>
                          <div className="flex items-center space-x-2 py-2 d-flex flex-row" >
                              <div className="text-sm" 
                              > 
                                {retriveCollections?.payout_address}</div>
                              <AiFillCopy className={isCopy == "copy" ? "ms-2 text-primary" : "ms-2 text-light"}size={20} onClick={()=>copyToClipboard()} />

                              <a href="https://etherscan.io/"
                               target="_blank">
                              <img src={OutWebsite} alt="outwebsite" className="ms-2" style={{ width: "15px" }} />
                              </a>
                          </div>
                          <div className="d-flex space-x-8  justify-content-between flex-md-row flex-column" >
                              <div className="bg-blue-860 rounded-full px-1 pe-2 ps-2 py-1 mt-2 textSize" >Created Date : {retriveCollections?.created_date}
                              </div>
                              <div className="bg-blue-860 rounded-full px-1 py-1 mt-2 textSize" >Total Supply : 
                              {totalsupply}
                              </div>
                          </div>

                          <small className="mt-2 text-szzz img-fluid" >{retriveCollections?.description}</small>
                      </div>
                  </div>
              </div>
              <div className="col-lg-5  items-center mt-md-0 mt-3" >
                  <div className='d-flex justify-content-center flex-column'>
                      <div className='d-flex justify-content-center  analysisBoardSpantraderfoollrrrr' >Project Info</div>
                      <div className="flex space-x-3 py-2 d-flex justify-content-center" >
                          <img src={discord} alt="load" className="me-3" style={{ width: "25px" }} />
                          <img src={website} alt="load" className="" style={{ width: "25px" }} />
                      </div>
                  </div>
                  <div className='row d-flex justify-content-center mt-4 mb-3' >
                      <div className="col-md-8 col-11 borders border-blue-820  " >
                          <div className='row d-flex justify-content-center' >
                              <div className="col-6  p-2 justify-content-center text-center" >
                                  <div style={{ borderRight: "2px solid rgba(53, 53, 84)" }}>
                                      <div className="analysisBoardSpantraderfoollr " >OS Floor</div>
                                      <div className="flex items-center  fw-bold space-x-2" ><img src={ether} alt="ether" className="me-3" style={{ width: "12px" }} />
                                          {floorprice.toFixed(3)}
                                      </div>
                                  </div>
                              </div>
                              <div className=" col-6 p-2 justify-content-center text-center pe-2">
                                  <div style={{  }}>
                                      <div className="analysisBoardSpantraderfoollr pe-1">OS Volume</div>
                                      <div className="flex items-center fw-bold  pe-1"><img src={ether} alt="ether" className="me-3" style={{ width: "12px" }} />
                                          {osFloor.toFixed(3)}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row d-flex justify-content-center" >
                      <div className="col-md-8 ">
                          <div className="row">
                              <div className="col-6 align-items-center text-center" >
                                  <div className="analysisBoardSpantraderfoollrrrr">Revealed <span className="Revealed" >&nbsp;&nbsp;100%</span></div>
                              </div>
                              <div className="col-6 align-items-center text-center" >
                                  <div className="analysisBoardSpantraderfoollrrrr " >Ranks Variance <span className="Revealed" >&nbsp;&nbsp;99%</span></div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>
      <div className=" mt-5 d-flex  justify-content-center " style={{ borderTop: '4px solid rgba(53, 53, 84)' }}>

          <div className="row text-white d-flex  justify-content-center justify-content-lg-evenly pt-3 pb-3 w-100 " >
          <div className=" col-md-3 col-11 bg-blue-860 bg-blue-86999   p-1  mt-3">
                  <div className="row d-flex justify-content-between" >
                      <div className="col-sm-5 col-6" >
                          <div className="text-xs text-gray-300 font-bold">Floor Price</div>
                          <div className="space-x-1"> <span className="fs-6 fw-bold">0.015</span><span className="text-sm font-bold">ETH</span></div>
                          <div>---</div>
                      </div>
                      <div className=" col-sm-7 col-6"  >
                          <div className="text-xs text-gray-300">Weekly growth</div>
                          <AreaChart
                              width={150}
                              height={50}
                              data={data}
                              margin={{
                                  top: 10,
                                  right: 0,
                                  left: 0,
                                  bottom: 5,
                              }}
                          >
                              <defs>
                                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#82ca9d" stopOpacity={1} />
                                      <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
                                  </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="avgPrice" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                          </AreaChart>
                          <div className="d-flex justify-content-between text-xs1">
                              <div>7d ago</div>
                              <div>now</div>
                          </div>
                      </div>
                  </div>
              </div>          
              <div className=" col-md-3 col-11 bg-blue-860 bg-blue-86999  p-3  mt-3">
                  <div className="row d-flex" >
                      <div className="col-sm-5 col-6" >
                          <div className="text-xs text-gray-300 font-bold">Listed Assets</div>
                          <div className="space-x-1"> <span className="fs-6 fw-bold">0.0</span><span className="fs-6 fw-bold">/1000 (-%)</span></div>
                          <div>---</div>
                      </div>
                      <div className=" col-sm-7 col-6" >
                          <div className="text-xs text-gray-300">Weekly growth</div>
                          <AreaChart
                              width={150}
                              height={50}
                              data={data}
                              margin={{
                                  top: 10,
                                  right: 0,
                                  left: 0,
                                  bottom: 5,
                              }}
                          >
                              <defs>
                                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="10%" stopColor="#82ca9d" stopOpacity={1} />
                                      <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
                                  </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                          </AreaChart>
                          <div className="d-flex justify-content-between text-xs1">
                              <div>7d ago</div>
                              <div>now</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className=" col-md-3 col-11 bg-blue-860 bg-blue-86999  p-3  mt-3">
                  <div className="row d-flex" >
                      <div className="col-sm-5 col-6" >
                          <div className="text-xs text-gray-300 font-bold">24h Volume</div>
                          <div className="space-x-1"> <span className="fs-6 fw-bold">0.015</span><span className="text-sm font-bold">ETH</span></div>
                          <div>---</div>
                      </div>
                      <div className=" col-sm-7 col-6" >
                          <div className="text-xs text-gray-300">24h growth</div>
                          <AreaChart
                              width={150}
                              height={50}
                              data={data}
                              margin={{
                                  top: 10,
                                  right: 0,
                                  left: 0,
                                  bottom: 5,
                              }}
                          >
                              <defs>
                                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#990033" stopOpacity={1} />
                                      <stop offset="100%" stopColor="#990033" stopOpacity={0} />
                                  </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="sale" stroke="#990033" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                          </AreaChart>
                          <div className="d-flex justify-content-between text-xs1">
                              <div>7d ago</div>
                              <div>now</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className=" col-md-3 col-11 bg-blue-860 bg-blue-86999  p-3  mt-3">
                  <div className="row d-flex" >
                      <div className="col-sm-5 col-6" >
                          <div className="text-xs text-gray-300 font-bold">24h Trades</div>
                          <div className="space-x-1"> <span className="fs-6 fw-bold">0</span><span className="text-sm font-bold">ETH</span></div>
                          <div>---</div>
                      </div>
                      <div className=" col-sm-7 col-6" >
                          <div className="text-xs text-gray-300">24h growth</div>
                          <AreaChart
                              width={150}
                              height={50}
                              data={data}
                              margin={{
                                  top: 10,
                                  right: 0,
                                  left: 0,
                                  bottom: 5,
                              }}
                          >
                              <defs>
                                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#990033" stopOpacity={1} />
                                      <stop offset="100%" stopColor="#990033" stopOpacity={0} />
                                  </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="vol" stroke="#990033" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                          </AreaChart>
                          <div className="d-flex justify-content-between text-xs1">
                              <div>7d ago</div>
                              <div>now</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

      <div className=" d-flex  justify-content-center " >
          <div className="row text-white d-flex  justify-content-center  pt-3 pb-3 w-100 ">
              <div className="col-lg-2 col-11 box-width" >
                  <div className="row d-flex  justify-content-between">
                      <div className="col-2 d-flex align-items-center " >
                          <h6>Listings</h6>&nbsp;&nbsp;
                          <span className="typo-body text-vojta-second  ary font-normal">{listingDataLength}</span>
                      </div>
                      <div className="col-8 d-flex  justify-content-end">
                          <div className="selectFloorPriceAnalysisBoard ms-2">
                              <select className='selectFloorPriceDownAnalysisBoard'>
                                  <option value="1">Recently Listed</option>
                                  <option value="2">Buy Price</option>
                                  <option value="3">Buy rank</option>
                                  <option value="3">Rarity</option>
                              </select>
                          </div>
                         
                      </div>
                  </div>
                  <div className="scrollView">
                    { isload?
                        listingData?.map((items,index)=>{
                            let splittedData = items.event_date.split("T")
                            let finalSplit = splittedData[1].split("Z")
                            return(
                                
                                <div key={index} className="row d-flex justify-content-start mt-2" style={{ backgroundColor: '#1B1B36', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '5px' }}>
                                <div className="col-3 d-flex justify-content-start" >
                                    <div className="position-relative d-flex justify-content-start" >
                                        <img src={items.image} className=" position-relative" width={55} style={{borderRadius: "5px"}}/>
                                        <span className="position-absolute" style={{ top: "35px", left: '8px', fontSize: '13px' }}>#{items.token_id}</span>
                                    </div>
                                    <div className="col-8 align-items-center flex-column ms-1" >
                                        <div className="col-12 " >
                                            <span className="analysisBoardSpan text-white">#{items.token_id}</span>
       
                                        </div>
                                    </div>
                                </div>
                                <div className="col-9  text-end ps-3" >
                                    
                                    <div className="align-items-center me-2" >
                                        <span className="analysisBoardSpan"> {
                                        
                                        finalSplit[0]
                                        } &nbsp;</span>&nbsp;&nbsp;
                                        <span className="analysisBoardSpan12 text-white"><img src={ether} width="8px" /> {parseFloat(items.event_price).toFixed(3)}</span>
                                    </div>
                                    <div className="me-2">
                                        <img src={opensea} width="18px" />
                                        &nbsp;&nbsp;
                                        <button onClick={()=>buyNft(items.token_id,index)} className=" btnBuy btn-sm" ><BsLightningChargeFill color="white" size={12} /> Buy</button>
                                    </div>
                                </div>
                            </div>

                            )
                        })
                        : <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
            <Skeleton count={3} />
        </p>
    </SkeletonTheme> 
                    }
                  </div>
              </div>    
              <div className="col-lg-8 ">
                  <div className="row justify-content-around" >
                      <div className="col-lg-5 col-11 mt-3 box-width-mini-chart">
                          
                          <AssetsForSale />
                      </div>
                      <div className="col-lg-5 col-11 mt-3 box-width-mini-chart">
                          <FloorPrice />
                      </div>
                  </div>
                  <div className="row justify-content-center">
                  <div className="col-lg-11 col-11 box-width-chart">
                          <div className="text-white text-xl font-bold text-center mb-2 mt-4">Sales/Ranking</div>
                          <SaleRanking />
                      </div>
                  </div>
                      
              </div>
              <div className="col-lg-2 col-11 box-width" >
                  <div className="row d-flex  justify-content-between">
                      <div className="col-8 d-flex align-items-center " >
                          <h5>Trades</h5>&nbsp;&nbsp;
                          <span className="typo-body text-vojta-secondary font-normal">(0 new pending)</span>
                      </div>
                  </div>
                  <div className="scrollView">
                    { isload?
                        tradesDataArray?.map((items,index)=>{
                            let splittedData = items.event_date.split("T")
                            let finalSplit = splittedData[1].split("Z")
                            return(
                                <div key={index} className="row d-flex justify-content-between mt-2" style={{ backgroundColor: '#131329',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '5px', borderRight: '4px solid #9190AD' }}>
                                <div className="col-4 d-flex justify-content-start"  >
                                    <div style={{ borderRight: "2px solid rgba(53, 53, 84)" }}></div>
                                    <div className="" >
                                        <img src={items.image} className=" " width={55} style={{borderRadius: "5px"}}/>
                                    </div>
                                    <div className="col-8 flex-column ms-2 mt-1" >
                                        <span className="analysisBoardSpantrader mt-2 ">#{items.token_id}</span><br />
                                        <span className="analysisBoardSpantrader mt-2 ">{finalSplit[0]}</span>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-evenly ">
                                    <div className="" >
                                        <span className="analysisBoardSpantrader ">Sold For</span>
                                        <br />
                                        <span className="analysisBoardSpan122 text-white"><img src={ether} width="8px" /> {parseFloat(items.event_price).toFixed(3)}</span>
                                    </div>
                                    <div className="d-flex flex-column  align-items-center justify-content-evenly" >
                                        <span className="analysisBoardSpantrader " >Market</span>
      
                                        <img src={opensea} width="15px" className="" />
                                    </div>
                                </div>
      
                            </div>
                            )
                        })  : <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
            <Skeleton count={3} />
        </p>
    </SkeletonTheme> 
                    }
                      
               
                  </div>
              </div>

          </div>
      </div>
  </div>
    }
      </> 
    )
}

export default AnalysisBoard
