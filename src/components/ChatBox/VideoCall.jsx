import React, { useEffect } from 'react'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const VideoCall = () => {
    const location = useLocation();
    const {auth} = useSelector(store => store);
    useEffect(() => {
        // const getUrlParams = (url) => {
        //   let urlStr = url.split('?')[1];
        //   const urlSearchParams = new URLSearchParams(urlStr);
        //   const result = Object.fromEntries(urlSearchParams.entries());
        //   return result;
        // };
        const decodeQueryString = decodeURIComponent(location.search);
        const searchParam = new URLSearchParams(decodeQueryString);
        const roomID = searchParam.get("roomId");
        // const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
        const userID = Math.floor(Math.random() * 10000) + "";
        const userName = auth?.user.fullName;
        const appID = 1905452973;
        const serverSecret = "21718513dd4d4f72db9ace7eb1cb4561";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
    
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: document.querySelector("#root"),
          sharedLinks: [{
            name: 'Personal link',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
          }],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
    
          turnOnMicrophoneWhenJoining: false,
          turnOnCameraWhenJoining: false,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 2,
          layout: "Auto",
          showLayoutButton: false,
        });
      }, []);

  return (
      <div className='w-full h-full'>
        <p className='text-lg font-bold'>TEST</p>
        <div className='h-[100vh] w-[100vw]' id="root"></div>
        <script src="https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js"></script>
      </div>
  )
}

export default VideoCall