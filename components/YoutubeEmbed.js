import YouTube from "react-youtube";
import { useState, useRef } from "react";

const opts = {
  height: "280",
  width: "100%",
  // autoplay on loop
  playerVars: {
    autoplay: 1,
    loop: 1,
  },
};

const getVideoId = (url) => {
  const videoId = url.split("v=")[1] || url.split("youtu.be/")[1];
  return videoId;
};

const YoutubeEmbed = ({ videoId }) => {
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);

  const onReady = (event) => {
    setIsReady(true);
    playerRef.current = event.target;
  };

  const onEnd = (event) => {
    if (isReady && playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="my-4 w-full">
      <YouTube
        videoId={getVideoId(videoId)}
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
      />
    </div>
  );
};

export default YoutubeEmbed;
