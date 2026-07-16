import React, { useEffect, useState } from 'react'
import './Feed.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { API_KEY } from '../../data'
import { valueConverter } from '../../helper_functions'

export default function Feed({category}) {

  const [feedData,setFeedData] = useState([])

  useEffect(() => {
    fetchData()
  }, [category])

  async function fetchData() {
    const link = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
    const {data} = await axios.get(link)
    setFeedData(data.items || [])
  }

  return (
    <div className="feed">
      {feedData.length > 0 ? (
        feedData.map((item, index) => {
          return (
            <Link key={item.id || index} to={`/video/${category}/${item.id}`} className='card'>
              <img src={item.snippet?.thumbnails.medium.url} alt={item.snippet?.title || ''} />
              <h2>{item.snippet?.title || 'Video Title'}</h2>
              <h3>{item.snippet?.channelTitle || 'Channel Name'}</h3>
              <p>{valueConverter(item.statistics?.viewCount) || '0'} views • {moment(item.snippet?.publishedAt).fromNow()}</p>
            </Link>
          )
        })
      ) : null}
    </div>
  )
}
