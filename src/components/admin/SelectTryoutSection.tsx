import useQuestionStore from "../../stores/questionStore";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";

const SelectTryoutSection = () => {
    const { selectedTryoutSectionId } = useQuestionStore();
    const { availableTryoutSections } = useTryoutSectionStore();

    const handleChangeTryoutSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tryoutSectionId = e.target.value;
        useQuestionStore.setState({ selectedTryoutSectionId: tryoutSectionId });
    };
    return (
        <div className="mb-4">
            <label htmlFor="tryout" className="block mb-1 text-xs font-medium text-gray-600">
                Select Tryout Section
            </label>
            <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTryoutSectionId}
                onChange={(e) => handleChangeTryoutSection(e)}
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

export default SelectTryoutSection;
