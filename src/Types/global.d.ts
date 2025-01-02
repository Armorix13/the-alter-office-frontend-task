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

interface ApiResponseUserData<_T> {
    success: boolean;
    message: string;
    userExists: User;
}

interface LoginResponse {
    success: boolean;
    message: string;
    userExists: User;
    token: string;
}

interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    posts?: any;
    currentPage?: number | any;
    totalPages?: number | any;
    limit?: number | any;
    pagination?: {
        totalPosts: number;
        currentPage: number;
        totalPages: number;
        limit: number;
    };
}

interface LikeApiResponse {
    message: string;
    success: boolean;
}

interface AllImageModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    images: string[];
}

interface EditableFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    placeholder: string;
    type?: "text" | "textarea";
}

interface FeedCardProps {
    username: string;
    postTime: string;
    content: string;
    hashtags: string;
    userImage?: string;
    imageUrls: string[];
    likes: number;
    isLiked?: boolean | any;
    _id?: string;
    isShare?: boolean
}

interface MediaOptionProps {
    image: string;
    content: string;
    onChange?: any;
}

interface PostCardProps {
    image: string[];
    title: string;
    likes: number;
    size?: string;
    id: number;
}

interface ReusableModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

interface SidebarItemType {
    path: string;
    content: string;
    icon: React.ReactNode;
}

interface SidebarItemProps {
    path: string;
    content: string;
    icon: React.ReactNode;
}

interface SuggestedUserCardProps {
    name: string;
    photoUrl: string;
}

interface LoginRequest {
    fullName: string | null;
    socialId: string | null;
    socialType: number;
    email: string | null;
    isEmailVerified: boolean;
}

interface UserState {
    isAuthenticated: boolean;
    userDetail: User | null;
}

interface CameraViewProps {
    onCapture: () => void;
    videoRef: React.RefObject<HTMLVideoElement>;
}