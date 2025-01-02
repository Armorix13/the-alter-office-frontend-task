import React from 'react';
import Webcam from 'react-webcam';
import CameraICon from "../../assets/Camera/Camera.png";



const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };


interface CameraProps {
//   videoConstraints: any;
  webcamRef: React.RefObject<Webcam>;
  handleUserMediaError: (error: any) => void;
  capture: () => void;
  setIsCameraOpen: (open: boolean) => void;
  setError: (error: string) => void;
}

const Camera: React.FC<CameraProps> = ({
//   videoConstraints,
  webcamRef,
  handleUserMediaError,
  capture,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMediaError={handleUserMediaError}
          className="w-full"
        />
        <button
          onClick={capture}
          className="absolute bottom-[0.25rem] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all active:scale-95"
        >
        <div>
        <img src={CameraICon} height={30} width={30} />
        </div>
        </button>
      </div>
    </div>
  );
};

export default Camera;
