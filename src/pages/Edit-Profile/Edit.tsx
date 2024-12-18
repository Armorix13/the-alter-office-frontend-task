import Cover from "../../assets/Profile/Cover.png";
import Profile from "../../assets/Sidebar/profile.png";
import Back from "../../assets/Icon/Back.png";
import EditIcon from "../../assets/Icon/Edit.png";
import { useState } from "react";
import EditableField from "../../components/EditableField/Editable";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Edit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("Sakshi Agarwal");
  const [bio, setBio] = useState<string>(
    "Just someone who loves designing, sketching, and finding beauty in the little things 💕"
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="h-full w-full relative flex justify-center">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          <Loader />
        </div>
      )}
      <div className="relative w-full flex flex-col items-center mb-3">
        <div className=" w-[33px] h-[33px] bg-[#f4f4f4f4] absolute top-28 right-2 z-10 mt-15 flex justify-center items-center rounded-full">
          <img src={EditIcon} alt="Edit" className="w-[20px] h-[20px]" />
        </div>

        <div className="absolute flex left-3 top-2">
          <img
            onClick={() => navigate("/home/profile")}
            src={Back}
            alt="back"
            className=" w-[32px] h-[32px]"
          />
          <span className="text-[20px] font-[800] text-white">
            Edit Profile
          </span>
        </div>

        <div className=" w-[33px] h-[33px] bg-[#f4f4f4f4] absolute top-40 left-20 z-10 mt-15 flex justify-center items-center rounded-full">
          <img src={EditIcon} alt="Edit" className="w-[20px] h-[20px]" />
        </div>
        <img
          src={Cover}
          alt="Background"
          className="w-full h-40 object-cover rounded-bl-xl rounded-br-xl"
        />

        <div className="absolute top-28 left-2">
          <img src={Profile} alt="Profile" className="rounded-full w-24 h-24" />
        </div>

        <div className="mt-16 w-full">
          <EditableField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <EditableField
            id="bio"
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself"
            type="textarea"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="bg-black absolute bottom-1 rounded-[36px] w-[328px] h-[48px] text-white text-[16px] font-[700]"
      >
        Save
      </button>
    </div>
  );
};

export default Edit;
