import { useNavigate } from "react-router-dom";
import AddIcon from "../../assets//Icon/Add.png";

const AddPost = () => {
  const navigate = useNavigate();
  const handlePost = (): void => {
    navigate("/home/create-post");
  };
  return (
    <div
      onClick={handlePost}
      className="h-[56px] w-[56px] z-50 fixed p-0 flex justify-center items-center cursor-pointer bg-black rounded-full bottom-4 max-720:right-5 md:right-[10%] lg:right-[24%] right-[24%]"
    >
      <img src={AddIcon} alt="Add avatar" className="h-[16px] w-[16px]" />
    </div>
  );
};

export default AddPost;
