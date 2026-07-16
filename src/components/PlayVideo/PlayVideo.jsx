import React, { useEffect, useState } from 'react'
import './PlayVideo.css'

import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY } from '../../data'
import axios from 'axios'
import moment from 'moment'
import { valueConverter } from '../../helper_functions'

export default function PlayVideo({videoId}) {

  const [apiData,setApiData] = useState(null)
  const [channelData,setChannelData] = useState(null)
  const [commentData, setCommentData] = useState(null)

  useEffect(() => {
    fetchVideoData()
  },[])

  useEffect(() => {
    if (apiData) {
      fetchChannelData(apiData.snippet.channelId)
      fetchCommentData()
    }
  },[apiData])

  async function fetchVideoData() {
    const details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    const {data} = await axios.get(details_url) 
    setApiData(data.items[0])
  }

  async function fetchChannelData(channelId) {
    const details_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
    const {data} = await axios.get(details_url) 
    setChannelData(data.items[0])
  }

  async function fetchCommentData() {
    const details_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
    const {data} = await axios.get(details_url) 
    setCommentData(data.items)
    console.log(data)
  }

  return (
    apiData ? (
      <div className='play-video'>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h3>{apiData.snippet.title}</h3>
        <div className="play-video-info">
          <p>{valueConverter(apiData.statistics.viewCount)} views • {moment(apiData.snippet.publishedAt).fromNow()}</p>
          <div>
              <span><img src={like} alt="Like" />{valueConverter(apiData.statistics.likeCount)}</span>
              <span><img src={dislike} alt="Dislike" /></span>
              <span><img src={share} alt="Share" />Share</span>
              <span><img src={save} alt="Save" />Save</span>
          </div>
        </div>
        <hr />
        <div className="publisher">
          {channelData ? (
            <>
              <img src={channelData.snippet.thumbnails.default.url} alt="Publisher" />
              <div>
                  <p>{apiData.snippet.channelTitle}</p>
                  <span>{valueConverter(channelData.statistics.subscriberCount)} subscribers</span>
              </div>
            </>
          ) : (
            null
          )}
          <button>Subscribe</button>
        </div>
        <div className="vid-description">
          <p>{apiData.snippet.description.slice(0,250)}</p>
          <hr />
          <h4>{valueConverter(apiData.statistics.commentCount)} Comments</h4>
          <div className="comments">
            {commentData ? (
              commentData.map((item, index) => {
                return (
                  <div className="comment" key={index}>
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User" />
                    <div>
                      <h3>
                        {item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                      </h3>
                      <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                      <div className="comment-action">
                        <img src={like} alt="Like" /> <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                        <img src={dislike} alt="Dislike" /> <span></span>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    ) : (
      null
    )
  )
}
