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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            disableSubmit={true}
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">{initialValues?.title}</h2>
                    <div>
                        <span className="text-sm text-gray-500">Student Name: {initialValues?.studentName}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-sm text-gray-500">
                            Created At:{" "}
                            {initialValues
                                ? new Date(initialValues.createdAt).toLocaleString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  })
                                : null}
                        </span>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b py-2 px-4 font-medium">Title</th>
                                <th className="border-b py-2 px-4 font-medium">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(initialValues?.data?.totalScores || {}).map((key) => (
                                <tr key={key}>
                                    <td className="border-b py-2 px-4">
                                        {initialValues?.data?.totalScores[key].title}
                                    </td>
                                    <td className="border-b py-2 px-4">
                                        {initialValues?.data?.totalScores[key].score}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border-b py-2 px-4 font-bold">Total</td>
                                <td className="border-b py-2 px-4 font-bold">
                                    {Object.keys(initialValues?.data?.totalScores || {}).reduce(
                                        (acc, curr) => acc + initialValues?.data?.totalScores[curr].score,
                                        0
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </Modal>
    );
};

export default FormModalExam;
