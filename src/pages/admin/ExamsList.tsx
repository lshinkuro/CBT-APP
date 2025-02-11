import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useExamStore from "../../stores/examStore";
import FormModalExam from "../../components/admin/FormModalExam";
import { Exam } from "../../types/exam";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { MockExam } from "../../mocks/Exam";
import { customStylesTable } from "../style/customStylesTable";
import SearchInput from "../../components/layout/SearchInput";
import { Eye } from "lucide-react";

const ExamsList = () => {
    const { exams, isLoading, getAllExams, totalRows, error } = useExamStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [selectedExam, setSelectedExam] = useState<Exam>(MockExam);
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const columns: IDataTableProps<Exam>["columns"] = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Student Name",
            selector: (row) => row.studentName,
            sortable: true,
        },
        {
            name: "Score",
            selector: (row) => row.data.allTotalScores,
            sortable: true,
        },
        {
            name: (
                <div style={{ wordBreak: "break-word", width: "500px" }}>
                   Created At
                </div>
            ),
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
            name: "Actions",
            cell: (props) => (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleClickSeeExam(props)}
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllExams();
    }, [getAllExams]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useExamStore.setState({ error: null });
    }, [error]);

    const handleClickSeeExam = (exam: Exam) => {
        setIsOpenModal(true);
        setSelectedExam(exam);
    };

    const handleSubmit = async () => {
        setIsOpenModal(false);
        setSelectedExam(MockExam);
    };

    const handlePageChange = (page: number) => {
        useExamStore.setState({ offset: (page - 1) * limit });
        getAllExams();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useExamStore.setState({ limit, offset: 0 });
        getAllExams();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useExamStore.setState({ search: e.target.value, offset: 0 });
        getAllExams();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <main
                className={`flex-1 p-8 pt-36 md:pt-10 transition-all duration-300 ${isMinimized ? "ml-2 md:ml-20" : "ml-2 md:ml-64"}`}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Exams</h1>
                <div className="flex items-center justify-between mb-4">
                    <SearchInput
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Exam Title, Description, Duration"
                    />
                </div>
                <DataTable
                    columns={columns}
                    data={exams}
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
                <FormModalExam
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title="Exam"
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedExam}
                />
            </main>
        </div>
    );
};

export default ExamsList;
