import Modal from "./Modal";
import { FormModalExamProps } from "../../types/exam";

const FormModalExam: React.FC<FormModalExamProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const handleSubmit = async () => {
        onSubmit();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit} disableSubmit={true}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    {initialValues?.title}
                </div>
            </form>
        </Modal>
    );
};

export default FormModalExam;
