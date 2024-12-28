import { useEffect } from "react";
import useQuestionStore from "../../stores/questionStore";
import useTryoutStore from "../../stores/tryoutStore";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";

const SelectTryout = () => {
    const { selectedTryoutId } = useQuestionStore();
    const { getAllAvailableTryouts, availableTryouts } = useTryoutStore();
    const { availableTryoutSections } = useTryoutSectionStore();

    useEffect(() => {
        getAllAvailableTryouts();
    }, [getAllAvailableTryouts]);

    useEffect(() => {
        if (availableTryoutSections.length < 1) {
            useQuestionStore.setState({ selectedTryoutSectionId: "" });
        }
    }, [availableTryoutSections]);

    const handleChangeTryout = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tryoutId = e.target.value;
        useQuestionStore.setState({ selectedTryoutId: tryoutId });
    };

    return (
        <div className="mb-4">
            <label htmlFor="tryout" className="block mb-1 text-xs font-medium text-gray-600">
                Select Tryout
            </label>
            <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTryoutId}
                onChange={(e) => handleChangeTryout(e)}
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

export default SelectTryout;
