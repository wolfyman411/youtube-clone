import React, { useEffect, useState } from 'react'
import './Recommended.css'

import axios from 'axios'
import { API_KEY } from '../../data'
import { valueConverter } from '../../helper_functions'
import { Link } from 'react-router-dom'

export default function Recommended({categoryId}) {

  const [apiData,setApiData] = useState([])

  useEffect(() => {
    fetchData()
  }, [categoryId])

  async function fetchData() {
    const details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    const {data} = await axios.get(details_url)
    setApiData(data.items)
  }

  return (
    <div className='recommended'>
      {apiData.length > 0 ? (
        apiData.map((item,index) => (
          <Link className="side-video-list" to={`/video/${item.snippet.categoryId}/${item.id}`}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{valueConverter(item.statistics.viewCount)}</p>
            </div>
          </Link>
        ))
      ) : (
        null
      )}
    </div>
  )
}
