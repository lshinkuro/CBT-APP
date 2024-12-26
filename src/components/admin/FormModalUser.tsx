import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalUserProps } from "../../types/user";

const FormModalUser: React.FC<FormModalUserProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const [username, setUsername] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [role, setRole] = useState<"admin" | "student">("student");
    const [isActive, setIsActive] = useState<boolean>(true);

    useEffect(() => {
        setUsername(initialValues?.username ?? "");
        setDisplayName(initialValues?.displayName ?? "");
        setEmail(initialValues?.email ?? "");
        setPhoneNumber(initialValues?.phoneNumber ?? "");
        setRole(initialValues?.role ?? "student");
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value);
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setRole(e.target.value as "admin" | "student");
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await onSubmit({ username, displayName, email, phoneNumber, role, isActive });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-600">
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={handleDisplayNameChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your display name"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-600">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-600">
                        Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="isActive" className="block mb-2 text-sm font-medium text-gray-600">
                        Active Status
                    </label>
                    <select
                        id="isActive"
                        value={isActive.toString()}
                        onChange={handleIsActiveChange}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};

export default FormModalUser;
