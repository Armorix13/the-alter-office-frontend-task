import React, { ReactNode } from "react";

interface ReusableModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const Modal: React.FC<ReusableModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-[90%] md:w-[500px] p-5 relative">
                <button
                    onClick={onClose}
                    className="absolute rounded-full top-2 right-2 h-[32px] w-[32px] bg-gray-100 text-black hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                {title && (
                    <h2 className="text-xl font-[800] text-[22px] text-gray-800 mb-4">
                        {title}
                    </h2>
                )}

                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
