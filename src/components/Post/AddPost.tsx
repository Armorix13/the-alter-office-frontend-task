import AddIcon from "../../assets//Icon/Add.png";

const AddPost = () => {
    return (
        <div className="h-[56px] w-[56px] z-10 fixed p-0 flex justify-center items-center cursor-pointer bg-black rounded-full bottom-4 max-720:right-5 md:right-[10%] lg:right-[24%] right-[24%]">
            <img src={AddIcon} alt="Add avatar" className="h-[16px] w-[16px]" />
        </div>
    )
}

export default AddPost
