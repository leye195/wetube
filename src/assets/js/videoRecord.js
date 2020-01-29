const recorderContainer = document.querySelector("#record-container"),
  recordBtn = document.querySelector("#jsRecordBtn"),
  videoPreview = document.querySelector("#video__preview");
let streamObj, mediaRecorder;
const handleVideoData = e => {
  const { data: videoFile } = e;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click(); //faking click
};
const handleStartRecord = () => {
  mediaRecorder = new MediaRecorder(streamObj);
  mediaRecorder.start();
  mediaRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", handleStopRecording);
};
const handleStopRecording = () => {
  videoPreview.pause();
  videoPreview.src = "";
  mediaRecorder.stop();
  streamObj.getTracks()[0].stop();
  console.log(streamObj.getVideoTracks);
  recordBtn.removeEventListener("click", handleStopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
  videoPreview.srcObject = null;
  //streamObj.getVideoTracks()[0].stop();
};
const getVideo = async () => {
  try {
    const constraints = (window.constraints = {
      audio: true,
      video: { width: 1280, height: 720 }
    });
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObj = stream;
    handleStartRecord();
  } catch (error) {
    recordBtn.innerHTML = "Can not Record :(";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};
if (recorderContainer) {
  init();
}
