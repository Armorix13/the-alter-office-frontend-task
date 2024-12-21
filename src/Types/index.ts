interface User {
    _id: string;
    fullName: string;
    email: string;
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
}

export interface ApiResponseUserData<_T> {
    success: boolean;
    message: string;
    userExists: User;
}

export interface LoginResponse {
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


