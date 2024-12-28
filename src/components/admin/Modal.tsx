/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

interface ModalProps {
    disableSubmit?: boolean;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => Promise<void>;
    title: string;
    children: React.ReactNode;
    isLoading?: boolean;
    maxWidth?: string;
}

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    children,
    isLoading,
    maxWidth = "max-w-md",
    disableSubmit = false,
}: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`relative w-full ${maxWidth} bg-white rounded-lg shadow-lg overflow-y-auto max-h-full mt-20 mb-20`}
            >
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &#10006;
                    </button>
                </div>
                <div className="p-4 overflow-y-auto max-h-full">{children}</div>
                <div className="flex justify-end px-4 py-2 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        {disableSubmit ? "Close" : "Cancel"}
                    </button>
                    {!disableSubmit && (
                        <button
                            onClick={onSubmit}
                            className={`px-4 py-2 ml-2 text-sm font-semibold text-white ${
                                isLoading && "opacity-50 cursor-not-allowed"
                            } bg-blue-500 rounded-md hover:bg-blue-600`}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
