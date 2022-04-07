import React, { useEffect } from "react";
// import "./Map.scss";

export const HospitalMap = () => {
  useEffect(()=> {
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });}
    initMap();
  } ,[])



//지도 사이즈 관련 스타일
  const mapStyle = {
    width: "80%",
    height: "600px",
  };

  return (
    <React.Fragment>
      <h1>지도</h1>
      <div id="map" style={mapStyle}></div>
    </React.Fragment>
  );
};

export default HospitalMap;