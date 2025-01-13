import { useState, useEffect } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FormModalSymbolProps } from "../../types/symbol";

const FormModalSymbol: React.FC<FormModalSymbolProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const [name, setName] = useState<string>(initialValues?.name ?? "");
    const [code, setCode] = useState<string>(initialValues?.code ?? "");
    const [characters, setCharacters] = useState<string>(initialValues?.characters ?? "");
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setName(initialValues?.name ?? "");
        setCode(initialValues?.code ?? "");
        setCharacters(initialValues?.characters ?? "");
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);
    const handleCharactersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCharacters(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !code || !characters) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({ code, name, characters, isActive });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 text-xs font-medium text-gray-600">
                        Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="code" className="block mb-1 text-xs font-medium text-gray-600">
                        Code *
                    </label>
                    <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="characters" className="block mb-1 text-xs font-medium text-gray-600">
                        Characters *
                    </label>
                    <textarea
                        id="characters"
                        value={characters}
                        onChange={handleCharactersChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="isActive" className="block mb-1 text-xs font-medium text-gray-600">
                        Active Status *
                    </label>
                    <select
                        id="isActive"
                        value={isActive ? "true" : "false"}
                        onChange={handleIsActiveChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};

export default FormModalSymbol;
