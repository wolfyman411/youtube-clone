import React from 'react'
import './PlayVideo.css'

import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'

export default function PlayVideo({videoId}) {

  return (
    <div className='play-video'>
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>Video Title</h3>
      <div className="play-video-info">
        <p>1523 views • 2 days ago</p>
        <div>
            <span><img src={like} alt="Like" />125</span>
            <span><img src={dislike} alt="Dislike" />2</span>
            <span><img src={share} alt="Share" />Share</span>
            <span><img src={save} alt="Save" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="Publisher" />
        <div>
            <p>Channel Name</p>
            <span>1M subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>Video description will be displayed here.</p>
        <p>Subscribe to the channel for more videos!</p>
        <hr />
        <h4>130 Comments</h4>
        <div className="comments">
          <div className="comment">
            <img src={user_profile} alt="User" />
            <div>
              <h3>
                User Name <span>2 days ago</span>
              </h3>
              <p>This is a comment on the video.</p>
              <div className="comment-action">
                <img src={like} alt="Like" /> <span>5</span>
                <img src={dislike} alt="Dislike" /> <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
