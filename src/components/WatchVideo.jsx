import React from "react";

const WatchVideo = ({ videoUrl, setVideoUrl, isOpen ,setIsOpen}) => {
  if (!videoUrl) return null;
  let videoId = videoUrl.split("v=")[1].split("&")[0];
  //& removes any extra parameters after the videoId
  return (
    <>
      <div className={`video-main-body ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => {
          setIsOpen(!isOpen)
          setVideoUrl("")}}>
          ✖
        </button>
        <iframe title="Watch-recipe"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default WatchVideo;
