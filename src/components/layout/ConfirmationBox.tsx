import React from "react";

export interface ConfirmationBoxProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    message: string;
    useLoading?: boolean;
    isLoading?: boolean;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    useLoading = false,
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="p-4">
                    <p className="text-gray-800">{message}</p>
                </div>
                <div className="flex justify-end px-4 py-2 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`
                            px-4 py-2 ml-2 text-sm font-semibold
                            ${useLoading && isLoading ? "bg-blue-300" : "bg-blue-500"}
                            rounded-md
                            ${useLoading && isLoading ? "hover:bg-blue-300" : "hover:bg-blue-600"}
                        `}
                    >
                        {useLoading && isLoading ? "Submitting..." : "OK"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationBox;
