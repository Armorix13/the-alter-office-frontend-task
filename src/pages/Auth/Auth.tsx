import React from "react";
import LoginImage from "../../assets/Login/Login.png";
import Google from "../../assets/Login/Google.png";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
    const navigate = useNavigate();


    const handleGoogleLogin = () => {
        navigate("/home");
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#444444]">
            <div className="h-[520px] w-[360px] sm:w-[320px] md:w-[400px] lg:w-[400px] rounded-3xl relative">
                <div className="h-[250px] w-[360px] sm:w-[320px] md:w-[380px] lg:w-[360px] rounded-tl-[63px] rounded-tr-[63px] bg-[#ffffff] absolute bottom-[-40px] flex flex-col items-center">
                    <div className="w-[286px] sm:w-[260px] md:w-[280px] lg:w-[320px] h-[62px]">
                        <div className="flex w-full justify-center mt-2">
                            <div>
                                <img
                                    src={"/fav.png"}
                                    alt="login"
                                    className="rounded-3xl w-[46px] h-[34px]"
                                />
                            </div>
                            <div className="text-[26px] sm:text-[20px] font-[600] ml-2">Vibesnap</div>
                        </div>

                        <div className="text-[16px] text-center">
                        Moments That Matter, Shared Forever.
                        </div>
                    </div>

                    <div onClick={handleGoogleLogin} className="text-white mt-7 cursor-pointer flex p-2 gap-2 justify-center items-center w-[232px] sm:w-[200px] md:w-[220px] lg:w-[250px] h-[50px] bg-black rounded-full">
                        <div>
                            <img
                                src={Google}
                                alt="login"
                                className="rounded-3xl w-[18px] h-[18px]"
                            />
                        </div>
                        <div className="text-sm sm:text-xs md:text-base">Continue with Google</div>
                    </div>
                </div>

                <img
                    src={LoginImage}
                    alt="login"
                    className="rounded-3xl w-[90%] max-lg:w-full h-[500px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
                    width={360}
                />
            </div>
        </div>
    );
};

export default Auth;
