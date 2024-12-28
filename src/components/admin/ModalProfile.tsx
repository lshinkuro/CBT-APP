import Modal from "./Modal";
import { ModalProfileProps } from "../../types/user";

export const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose, title, isLoading, initialValues }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            isLoading={isLoading}
            maxWidth="max-w-4xl"
            disableSubmit={true}
        >
            <div className="mt-4">
                <div className="flex justify-center">
                    <img
                        src={
                            initialValues?.profilePhoto === ""
                                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                : initialValues?.profilePhoto
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                    />
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Username</span>
                        <span className="text-lg text-gray-800">{initialValues?.user.username}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Display Name</span>
                        <span className="text-lg text-gray-800">{initialValues?.user.displayName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Email</span>
                        <span className="text-lg text-gray-800">{initialValues?.user.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Phone Number</span>
                        <span className="text-lg text-gray-800">{initialValues?.user.phoneNumber}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Bio</span>
                        <span className="text-lg text-gray-800">{initialValues?.bio}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">Gender</span>
                        <span className="text-lg text-gray-800">{initialValues?.gender}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
