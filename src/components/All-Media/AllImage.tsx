import React from 'react';
import { FaTimes } from "react-icons/fa";
import "./style.css";
import { BASE_URL } from '../../api';
import { getMediaType } from '../../utils';
import useVideoInViewport from '../../hooks/useViewPort';

interface AllImageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  images: string[];
}

const AllImageModal: React.FC<AllImageModalProps> = ({ onClose, images }) => {

  const { videoRef } = useVideoInViewport();

  return (
    <div className="modal-overlay">
      <div className="modal-content max-720:w-[330px] w-[700px]">
        <button onClick={onClose} className="close-button">
          <FaTimes />
        </button>
        <div className="carousel">
          <div className="image-grid">
            {images.map((image, index) => {
              const mediaType = getMediaType(image);
              return (
                <div key={index} className="image-item">
                  {mediaType === 'image' ? (
                    <img
                      src={`${BASE_URL}${image}`}
                      alt={`Image ${index + 1}`}
                      className="carousel-image1 cursor-pointer"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      className="carousel-video1"
                      loop
                      muted={false}
                      autoPlay
                      playsInline
                      preload="auto"
                      src={`${BASE_URL}${image}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllImageModal;
