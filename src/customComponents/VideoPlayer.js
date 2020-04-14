import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./VideoPlayer.css";
import "videojs-contrib-ads";
import "videojs-ima";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    this.imaOptions = {
      adTagUrl: 
        "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinearvpaid2js&correlator="    
    };

  }

  componentDidMount() {
    // instantiate Video.js
    console.log("props of player", this.props);
    this.player = videojs(
      this.playerRef.current,
      this.props,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
      this.player.ima(this.imaOptions);


  }

  // destroy player on unmount
  componentWillUnmount() {
    console.log("Player is getting removed!!");
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {


    return (
      <div>
        <div data-vjs-player>
          <video ref={this.playerRef} className="video-js player"></video>
        </div>
        {/* <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js player"></video>
        </div> */}
      </div>
    );
  }
}
