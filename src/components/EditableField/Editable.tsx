import React from "react";

interface EditableFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    type?: "text" | "textarea";
}

const EditableField: React.FC<EditableFieldProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}) => {
    return (
        <div className="flex flex-col mb-6">
            <label htmlFor={id} className="text-[14px] font-[400] text-gray-500 tracking-wide">
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    rows={1}
                    className="border-0 focus:outline-none text-[14px] font-[600] border-b border-gray-300 text-gray-900 p-0 mt-1 text-base resize-none"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="border-0 text-[14px] focus:outline-none font-[600] border-b border-gray-300 p-0 mt-1 text-base"
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default EditableField;
