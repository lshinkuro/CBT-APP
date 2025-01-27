/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "./Modal";
import { FormModalPreviewExcelQuestionProps, PreviewQuestionProps } from "../../types/question";
import useQuestionStore from "../../stores/questionStore";
import DataTable, { IDataTableProps } from "react-data-table-component";

const FormModalPreviewExcelQuestion: React.FC<FormModalPreviewExcelQuestionProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
}) => {
    const { excelQuestions, pathExcelQuestions } = useQuestionStore();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await onSubmit({
                path: pathExcelQuestions,
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };
    const columns: IDataTableProps<PreviewQuestionProps>["columns"] = [
        { name: "ID", selector: (row) => row.id, sortable: true, wrap: true },
        {
            name: "Process",
            cell: (row) =>
                row.id && row.id !== "" ? (
                    <span
                        style={{ backgroundColor: "orange", color: "white", padding: "2px 5px", borderRadius: "3px" }}
                    >
                        Update
                    </span>
                ) : (
                    <span style={{ backgroundColor: "green", color: "white", padding: "2px 5px", borderRadius: "3px" }}>
                        Create
                    </span>
                ),
        },
        { name: "Tryout Section Code", selector: (row) => row["Tryout Section Code"], sortable: true, wrap: true },
        {
            name: "Image",
            selector: (row) => (typeof row["Image Url"] === "object" ? row["Image Url"].text : row["Image Url"]),
            sortable: true,
            wrap: true,
        },
        { name: "Content", selector: (row) => row.Content, sortable: true, wrap: true },
        { name: "Type", selector: (row) => row.Type, sortable: true, wrap: true },
        { name: "Number Of Correct Answers", selector: (row) => row["Number Of Correct Answers"], sortable: true },
        {
            name: "Option a Image",
            selector: (row) =>
                typeof row["Option a Image"] === "object" ? row["Option a Image"].text : row["Option a Image"],
            sortable: true,
            wrap: true,
        },
        { name: "Option a Score", selector: (row) => row["Option a Score"], sortable: true },
        { name: "Option a Content", selector: (row) => row["Option a Content"], sortable: true, wrap: true },
        {
            name: "Option a Correct",
            selector: (row) => (row["Option a Correct"] ? String(row["Option a Correct"]) : ""),
            sortable: true,
        },
        {
            name: "Option b Image",
            selector: (row) =>
                typeof row["Option b Image"] === "object" ? row["Option b Image"].text : row["Option b Image"],
            sortable: true,
            wrap: true,
        },
        { name: "Option b Score", selector: (row) => row["Option b Score"], sortable: true },
        { name: "Option b Content", selector: (row) => row["Option b Content"], sortable: true, wrap: true },
        {
            name: "Option b Correct",
            selector: (row) => (row["Option b Correct"] ? String(row["Option b Correct"]) : ""),
            sortable: true,
        },
        {
            name: "Option c Image",
            selector: (row) =>
                typeof row["Option c Image"] === "object" ? row["Option c Image"].text : row["Option c Image"],
            sortable: true,
            wrap: true,
        },
        { name: "Option c Score", selector: (row) => row["Option c Score"], sortable: true },
        { name: "Option c Content", selector: (row) => row["Option c Content"], sortable: true, wrap: true },
        {
            name: "Option c Correct",
            selector: (row) => (row["Option c Correct"] ? String(row["Option c Correct"]) : ""),
            sortable: true,
        },
        {
            name: "Option d Image",
            selector: (row) =>
                typeof row["Option d Image"] === "object" ? row["Option d Image"].text : row["Option d Image"],
            sortable: true,
            wrap: true,
        },
        { name: "Option d Score", selector: (row) => row["Option d Score"], sortable: true },
        { name: "Option d Content", selector: (row) => row["Option d Content"], sortable: true, wrap: true },
        {
            name: "Option d Correct",
            selector: (row) => (row["Option d Correct"] ? String(row["Option d Correct"]) : ""),
            sortable: true,
        },
        {
            name: "Option e Image",
            selector: (row) =>
                typeof row["Option e Image"] === "object" ? row["Option e Image"].text : row["Option e Image"],
            sortable: true,
            wrap: true,
        },
        { name: "Option e Score", selector: (row) => row["Option e Score"], sortable: true },
        { name: "Option e Content", selector: (row) => row["Option e Content"], sortable: true, wrap: true },
        {
            name: "Option e Correct",
            selector: (row) => (row["Option e Correct"] ? String(row["Option e Correct"]) : ""),
            sortable: true,
        },
    ];
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={handleSubmit}>
                <DataTable columns={columns} data={excelQuestions} pagination highlightOnHover />
            </form>
        </Modal>
    );
};
export default FormModalPreviewExcelQuestion;
