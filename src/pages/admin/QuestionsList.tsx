/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useQuestionStore from "../../stores/questionStore";
import FormModalQuestion from "../../components/admin/FormModalQuestion";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { Question } from "../../types/question";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import useTryoutStore from "../../stores/tryoutStore";
import { SelectTryoutProps } from "../../types/tryout";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import { SelectTryoutSectionProps } from "../../types/tryoutSection";

const QuestionsList = () => {
    const {
        questions,
        isLoading,
        getAllQuestions,
        createQuestion,
        updateQuestion,
        deleteQuestion,
        error,
        message,
        totalRows,
    } = useQuestionStore();
    const { getAllAvailableTryoutSectionsByTryoutId, availableTryoutSections } = useTryoutSectionStore();
    const [tryoutId, setTryoutId] = useState<string>("");
    const [tryoutSectionId, setTryoutSectionId] = useState<string>("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [limit, setLimit] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedQuestion, setSelectedQuestion] = useState<Question>({
        id: "",
        content: "",
        image: "",
        type: "",
        isActive: false,
        data: {},
        createdAt: "",
    });
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
    });

    const columns: IDataTableProps<Question>["columns"] = [
        {
            name: "Content",
            selector: (row) => row.content,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) => row.createdAt,
            sortable: false,
        },
        {
            name: "Active",
            cell: (props) =>
                props.isActive ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold leading-none text-white rounded-full bg-green-500 items-center justify-center">
                        Active
                    </span>
                ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold leading-none text-white rounded-full bg-red-500 items-center justify-center">
                        Inactive
                    </span>
                ),
            sortable: true,
            grow: 0.2,
        },
        {
            name: "Actions",
            cell: (props) => (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleClickEdit(props)}
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleDeleteQuestion(props.id)}
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllQuestions();
    }, [getAllQuestions]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useQuestionStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useQuestionStore.setState({ message: null });
    }, [message]);

    useEffect(() => {
        if (tryoutId !== "") {
            getAllAvailableTryoutSectionsByTryoutId(tryoutId);
        } else {
            useTryoutSectionStore.setState({ availableTryoutSections: [] });
        }
    }, [getAllAvailableTryoutSectionsByTryoutId, tryoutId]);

    const handleClickCreateQuestion = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedQuestion({
            id: "",
            content: "",
            image: "",
            type: "",
            isActive: false,
            data: {},
            createdAt: "",
        });
    };

    const handleClickEdit = (question: Question) => {
        setSelectedQuestion(question);
        setIsOpenModal(true);
        setMode("update");
    };

    const handleDeleteQuestion = (id: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure to delete this question?`,
            onConfirm: async () => {
                await deleteQuestion(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handleSubmit = async (data: Omit<Question, "id" | "createdAt">) => {
        if (mode === "update") {
            await updateQuestion(selectedQuestion.id, data);
        } else {
            await createQuestion(data);
        }
        setIsOpenModal(false);
        setSelectedQuestion({
            id: "",
            content: "",
            image: "",
            type: "",
            isActive: false,
            data: {},
            createdAt: "",
        });
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useTryoutStore.setState({ offset: (page - 1) * limit });
        getAllQuestions();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useTryoutStore.setState({ limit, offset: 0 });
        getAllQuestions();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useQuestionStore.setState({ search: e.target.value, offset: 0 });
        getAllQuestions();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Questions</h1>
                <SelectTryout setTryoutId={setTryoutId} tryoutId={tryoutId} />
                {availableTryoutSections.length > 0 && (
                    <SelectTryoutSection
                        setTryoutSectionId={setTryoutSectionId}
                        tryoutSectionId={tryoutSectionId}
                        availableTryoutSections={availableTryoutSections}
                    />
                )}
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickCreateQuestion}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Question
                    </button>
                    <div className="w-1/3">
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Text, Type"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={questions}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    responsive={true}
                />
                <FormModalQuestion
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={selectedQuestion ? "Edit Question" : "Create New Question"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedQuestion}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

const SelectTryout: React.FC<SelectTryoutProps> = ({ setTryoutId, tryoutId }) => {
    const { getAllAvailableTryouts, availableTryouts } = useTryoutStore();

    useEffect(() => {
        getAllAvailableTryouts();
    }, [getAllAvailableTryouts]);

    return (
        <div className="mb-4">
            <label htmlFor="tryout" className="block mb-1 text-xs font-medium text-gray-600">
                Select Tryout
            </label>
            <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tryoutId}
                onChange={(e) => setTryoutId(e.target.value)}
            >
                <option value="">Select Tryout</option>
                {availableTryouts.map((tryout) => (
                    <option key={tryout.id} value={tryout.id}>
                        {tryout.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

const SelectTryoutSection: React.FC<SelectTryoutSectionProps> = ({
    tryoutSectionId,
    setTryoutSectionId,
    availableTryoutSections,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor="tryout" className="block mb-1 text-xs font-medium text-gray-600">
                Select Tryout Section
            </label>
            <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tryoutSectionId}
                onChange={(e) => setTryoutSectionId(e.target.value)}
            >
                <option value="">Select Tryout Section</option>
                {availableTryoutSections.map((tryoutSection) => (
                    <option key={tryoutSection.id} value={tryoutSection.id}>
                        {tryoutSection.title} - {tryoutSection.type}{" "}
                        {tryoutSection.subType && `- ${tryoutSection.subType}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuestionsList;
