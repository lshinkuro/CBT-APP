/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalUserProps } from "../../types/user";
import { toast } from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import useProgramStore from "../../stores/programStore";
import { MockUser } from "../../mocks/User";

const FormModalUser: React.FC<FormModalUserProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const { availablePrograms } = useProgramStore();
    const [username, setUsername] = useState<string>(initialValues?.username ?? "");
    const [displayName, setDisplayName] = useState<string>(initialValues?.displayName ?? "");
    const [email, setEmail] = useState<string>(initialValues?.email ?? "");
    const [phoneNumber, setPhoneNumber] = useState<string>(initialValues?.phoneNumber ?? "");
    const [role, setRole] = useState<"admin" | "student" | "sysadmin">(initialValues?.role ?? "student");
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);
    const [multiSelectOptions, setMultiSelectOptions] = useState<{ label: string; value: string }[]>([]);
    const [multiSelectSelected, setMultiSelectSelected] = useState<{ label: string; value: string }[]>([]);
    const [data, setData] = useState<any>(initialValues?.data ?? MockUser.data);

    useEffect(() => {
        if (availablePrograms.length > 0) {
            setMultiSelectOptions(availablePrograms.map((program) => ({ label: program.title, value: program.id })));
        }
    }, [availablePrograms]);

    useEffect(() => {
        setData({ priviledges: { programs: multiSelectSelected.map((option) => option.value) } });
    }, [multiSelectSelected]);

    useEffect(() => {
        setMultiSelectSelected(
            initialValues?.data?.priviledges?.programs.map((programId: string) => ({
                label: availablePrograms.find((program) => program.id === programId)?.title ?? "",
                value: programId,
            })) ?? []
        );
    }, [initialValues, availablePrograms]);

    useEffect(() => {
        setUsername(initialValues?.username ?? "");
        setDisplayName(initialValues?.displayName ?? "");
        setEmail(initialValues?.email ?? "");
        setPhoneNumber(initialValues?.phoneNumber ?? "");
        setRole(initialValues?.role ?? "student");
        setIsActive(initialValues?.isActive ?? true);
        setData(initialValues?.data ?? MockUser.data);
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
        if (!username || !displayName || !email || !phoneNumber || !role) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({ username, displayName, email, phoneNumber, role, isActive, data });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const usr =
        localStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") &&
        JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") ?? "");

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-xs font-medium text-gray-600">
                        Username *
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="displayName" className="block mb-2 text-xs font-medium text-gray-600">
                        Display Name *
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={handleDisplayNameChange}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your display name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-600">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block mb-2 text-xs font-medium text-gray-600">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                {usr?.role === "sysadmin" && role !== "sysadmin" && (
                    <div className="mb-4">
                        <label htmlFor="role" className="block mb-2 text-xs font-medium text-gray-600">
                            Role *
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="programs" className="block mb-2 text-xs font-medium text-gray-600">
                        Programs *
                    </label>
                    <MultiSelect
                        options={multiSelectOptions}
                        value={multiSelectSelected}
                        onChange={setMultiSelectSelected}
                        labelledBy="Select programs"
                        className="text-xs"
                    />
                </div>
                {usr?.role === "sysadmin" && role !== "sysadmin" && (
                    <div className="mb-4">
                        <label htmlFor="isActive" className="block mb-2 text-xs font-medium text-gray-600">
                            Active Status *
                        </label>
                        <select
                            id="isActive"
                            value={isActive.toString()}
                            onChange={handleIsActiveChange}
                            className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                )}
            </form>
        </Modal>
    );
};

export default FormModalUser;
