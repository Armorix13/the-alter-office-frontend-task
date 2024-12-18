import Back from "../../assets/Icon/Back.png";
import EditIcon from "../../assets/Icon/Edit.png";
import { useEffect, useRef, useState } from "react";
import EditableField from "../../components/EditableField/Editable";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useUpdate } from "../../hooks/useUpdate";
import { BASE_URL, updateUserData } from "../../api";
import { setUserDetail } from "../../Redux/reducers/userSlice";
import { headers } from "../../utils";

const Edit = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state: RootState) => state.user);
  const { executeUpdate, data } = useUpdate();
  const navigate = useNavigate();
  const [name, setName] = useState<string | any>(userDetail?.fullName);
  const [bio, setBio] = useState<string>(
    "Just someone who loves designing, sketching, and finding beauty in the little things 💕"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: "cover" | "profile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imageType === "cover") {
        setCoverImage(file);
      } else {
        setProfile(file);
      }
    }
  };

  const handleEditClick = (imageType: "cover" | "profile") => {
    if (imageType === "cover" && coverImageInputRef.current) {
      coverImageInputRef.current.click();
    } else if (imageType === "profile" && profileImageInputRef.current) {
      profileImageInputRef.current.click();
    }
  };



  const handleSave = async (): Promise<void> => {
    setLoading(true);
    const formData = new FormData();
    if (profile) formData.append("profileImage", profile);
    if (coverImage) formData.append("coverImage", coverImage);
    formData.append("fullName", name);
    formData.append("boi", bio);
    try {
      await executeUpdate(updateUserData, formData, headers);
      navigate("/home/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(userDetail?.fullName);
  }, [userDetail]);

  useEffect(() => {
    if (data) {
      dispatch(setUserDetail(data?.userExists));
    }
  }, [data])


  return (
    <div className="h-full w-full relative flex justify-center">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          <Loader />
        </div>
      )}
      <div className="relative w-full flex flex-col items-center mb-3">
        <div
          onClick={() => handleEditClick("cover")}
          className="cursor-pointer w-[33px] h-[33px] bg-[#f4f4f4f4] absolute top-28 right-2 z-10 mt-15 flex justify-center items-center rounded-full"
        >
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

        <div
          onClick={() => handleEditClick("profile")}
          className="cursor-pointer w-[33px] h-[33px] bg-[#f4f4f4f4] absolute top-40 left-20 z-10 mt-15 flex justify-center items-center rounded-full"
        >
          <img src={EditIcon} alt="Edit" className="w-[20px] h-[20px]" />
        </div>
        <img
          src={coverImage ? URL.createObjectURL(coverImage) : `${BASE_URL}${userDetail?.coverImage}`}
          alt="Background"
          className="w-full h-40 object-cover rounded-bl-xl rounded-br-xl"
        />

        <input
          ref={coverImageInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "cover")}
          className="absolute hidden top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="absolute top-28 left-2">
          <img
            src={
              profile ? URL.createObjectURL(profile) : `${BASE_URL}${userDetail?.profileImage}`
            }
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
        </div>

        <input
          ref={profileImageInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "profile")}
          className="absolute hidden top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />

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
