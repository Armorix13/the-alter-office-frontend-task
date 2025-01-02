import { useEffect } from 'react';
import Camera from "../../assets/Camera/Camera.png";

export function CameraView({ onCapture, videoRef }: CameraViewProps) {
  useEffect(() => {
    if (videoRef.current) {
      console.log('Video element ready:::');
      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded:::::::::');
      };
    }
  }, [videoRef]);
  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full"
        onPlay={() => console.log('Video started playing')}
        onError={(e) => console.error('Video error:', e)}
      />
      <button
        onClick={onCapture}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-100 transition-all active:scale-95"
      >
        <img src={Camera} height={70} width={70} />
      </button>
    </div>
  );
}