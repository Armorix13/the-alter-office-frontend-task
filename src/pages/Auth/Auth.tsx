import React, { useEffect } from "react";
import LoginImage from "../../assets/Login/Login.png";
import Google from "../../assets/Login/Google.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleauthProvider } from "../../Firebase/Firebase";
import { usePostApi } from "../../hooks/usePost";
import { socialLogin } from "../../api/indexold";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../Redux/reducers/userSlice";

interface LoginRequest {
    fullName: string | null;
    socialId: string | null;
    socialType: number;
    email: string | null;
    profileImage: string | null;
    isEmailVerified: boolean;
}

interface LoginResponse {
    success: boolean;
    message: string;
    userExists: {
        _id: string;
        fullName: string;
        profileImage: string;
        coverImage: string;
        boi: string;
        isEmailVerified: boolean;
        socialId: string;
        socialType: number;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    token: string;
}

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const { executePost, data } = usePostApi<LoginRequest, LoginResponse>();
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleauthProvider);
            if (result) {
                console.log("Google login successful:", result);
                const loginData: LoginRequest = {
                    fullName: result.user.displayName,
                    socialId: result.user.uid,
                    socialType: 1,
                    email: result.user.email,
                    profileImage: result.user.photoURL,
                    isEmailVerified: result.user.emailVerified,
                };
                await executePost(socialLogin, loginData);
            }
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    useEffect(() => {
        if (data) {
            console.log("API response:", data);
            if (data.success) {
                dispatch(setAuthenticated(true));
                localStorage.setItem("token", data.token);
                toast.success(data?.message);
                navigate("/home");
            } else {
                console.error("Login failed:", data.message);
            }
        }
    }, [data, navigate]);
    

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#444444]">
            <div className="h-[520px] flex justify-center w-[360px] sm:w-[320px] md:w-[400px] lg:w-[400px] rounded-3xl relative">
                <div className="h-[250px] max-720:w-[325px] md:w-[360px] lg:w-[360px] rounded-tl-[63px] rounded-tr-[63px] bg-[#ffffff] absolute bottom-[-40px] flex flex-col items-center">
                    <div className="w-[286px] sm:w-[260px] md:w-[280px] lg:w-[320px] h-[62px]">
                        <div className="flex w-full justify-center mt-2">
                            <div>
                                <img
                                    src={"/fav.png"}
                                    alt="login"
                                    className="rounded-3xl w-[46px] h-[34px]"
                                />
                            </div>
                            <div className="text-[26px] sm:text-[20px] font-[600] ml-2">
                                Vibesnap
                            </div>
                        </div>

                        <div className="text-[16px] text-center">
                            Moments That Matter, Shared Forever.
                        </div>
                    </div>

                    <div
                        onClick={handleGoogleLogin}
                        className="text-white mt-7 cursor-pointer flex p-2 gap-2 justify-center items-center w-[232px] sm:w-[200px] md:w-[220px] lg:w-[250px] h-[50px] bg-black rounded-full"
                    >
                        <div>
                            <img
                                src={Google}
                                alt="login"
                                className="rounded-3xl w-[18px] h-[18px]"
                            />
                        </div>
                        <div className="text-sm sm:text-xs md:text-base">
                            Continue with Google
                        </div>
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
