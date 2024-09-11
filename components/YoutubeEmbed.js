import YouTube from "react-youtube";

const opts = {
  height: "300",
  width: "100%",
};

const YoutubeEmbed = ({ videoId }) => {
  return (
    <div className="my-4 w-full">
      <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={() => console.log("ready")}
      />
    </div>
  );
};

export default YoutubeEmbed;
