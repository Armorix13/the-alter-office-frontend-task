import React from "react";

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
                    className="border-0 focus:outline-none text-[14px] font-[600] border-b border-gray-300 text-gray-900 p-0 mt-1 text-base max-720::min-h-[40px] md:min-h-[20px] lg:min-h-[10px] xl:min-h-[10px] resize-none"
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
