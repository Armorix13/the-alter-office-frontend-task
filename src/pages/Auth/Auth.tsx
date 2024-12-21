import React/* , { useState }  */ from "react";
import LoginImage from "../../assets/Login/Login.png";
import Google from "../../assets/Login/Google.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, /* signInWithEmailAndPassword, createUserWithEmailAndPassword */ } from "firebase/auth";
import { auth, googleauthProvider } from "../../Firebase/Firebase";
import { useSocialLoginMutation } from "../../api";
import { toast } from "react-toastify";
import { setAuthenticated } from "../../Redux/reducers/userSlice";
import { useDispatch } from "react-redux";

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const [useSocialLogin] = useSocialLoginMutation();

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
                    isEmailVerified: result.user.emailVerified,
                };
                const res = await useSocialLogin(loginData).unwrap();
                if (res) {
                    localStorage.setItem("token", res.token);
                    navigate("/home");
                    toast.success("Login successful!");
                    dispatch(setAuthenticated(true));
                }
            }
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    // const handleEmailLogin = async () => {
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         toast.success("Login successful!");
    //         navigate("/home");
    //     } catch (error: any) {
    //         setError("Invalid email or password.");
    //         console.error("Email login failed:", error);
    //     }
    // };

    // const handleEmailRegister = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         toast.success("Registration successful!");
    //         navigate("/home");
    //     } catch (error: any) {
    //         setError("Error registering: " + error.message);
    //         console.error("Email registration failed:", error);
    //     }
    // };

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
