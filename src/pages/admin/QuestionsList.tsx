/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useQuestionStore from "../../stores/questionStore";
import FormModalQuestion from "../../components/admin/FormModalQuestion";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { Question, QuestionDto } from "../../types/question";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import SelectTryout from "../../components/admin/SelectTryout";
import SelectTryoutSection from "../../components/admin/SelectTryoutSection";
import { MockQuestion } from "../../mocks/Question";
import useTryoutStore from "../../stores/tryoutStore";
import { customStylesTable } from "../style/customStylesTable";
import SearchInput from "../../components/layout/SearchInput";

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
    const { selectedTryoutId } = useTryoutStore();
    const { getAllAvailableTryoutSectionsByTryoutId, availableTryoutSections, selectedTryoutSectionId } =
        useTryoutSectionStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [limit, setLimit] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedQuestion, setSelectedQuestion] = useState<Question>(MockQuestion);
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
        useLoading: true,
        isLoading: isLoading,
    });

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const columns: IDataTableProps<Question>["columns"] = [
        {
            name: "Content",
            selector: (row) => row.content,
            sortable: true,
        },
        {
            name: "Tryout",
            selector: (row) => row.tryoutSection.tryout.title,
            sortable: true,
        },
        {
            name: "Tryout Section",
            selector: (row) => row.tryoutSection.type,
            sortable: true,
        },
        {
            name: "Sub Type",
            selector: (row) => row.tryoutSection.subType ?? "-",
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) =>
                new Date(row.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            sortable: true,
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
    }, [getAllQuestions, selectedTryoutId, selectedTryoutSectionId]);

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
        if (selectedTryoutId !== "") {
            getAllAvailableTryoutSectionsByTryoutId(selectedTryoutId);
        } else {
            useTryoutSectionStore.setState({ availableTryoutSections: [] });
        }
    }, [getAllAvailableTryoutSectionsByTryoutId, selectedTryoutId]);

    const handleClickCreateQuestion = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedQuestion(MockQuestion);
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

    const handleSubmit = async (data: QuestionDto) => {
        if (mode === "update") {
            await updateQuestion(selectedQuestion.id, data);
        } else {
            await createQuestion(data);
        }
        setIsOpenModal(false);
        setSelectedQuestion(MockQuestion);
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useQuestionStore.setState({ offset: (page - 1) * limit });
        getAllQuestions();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useQuestionStore.setState({ limit, offset: 0 });
        getAllQuestions();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useQuestionStore.setState({ search: e.target.value, offset: 0 });
        getAllQuestions();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <main
                className={`flex-1 p-8 transition-all duration-300 ${isMinimized ? "ml-2 md:ml-20" : "ml-2 md:ml-64"}`}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Questions</h1>
                <SelectTryout />
                {availableTryoutSections.length > 0 && <SelectTryoutSection />}
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickCreateQuestion}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Question
                    </button>
                 
                    <SearchInput
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Type, Content"
                    />
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
                    customStyles={customStylesTable}
                />
                <FormModalQuestion
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={mode === "update" ? "Edit Question" : "Create New Question"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedQuestion}
                    mode={mode}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

export default QuestionsList;
