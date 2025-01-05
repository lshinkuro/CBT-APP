import { useEffect, useRef } from "react";
import useProgramStore from "../../stores/programStore";
import useTryoutStore from "../../stores/tryoutStore";

const SelectProgram = () => {
    const { selectedProgramId } = useProgramStore();
    const { getAllAvailablePrograms, availablePrograms } = useProgramStore();
    const { availableTryouts } = useTryoutStore();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            getAllAvailablePrograms();
            isFirstRender.current = false;
        }
    }, [getAllAvailablePrograms]);

    useEffect(() => {
        if (availableTryouts.length < 1) {
            useTryoutStore.setState({ selectedTryoutId: "" });
        }
    }, [availableTryouts]);

    const handleChangeProgram = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const programId = e.target.value;
        useProgramStore.setState({ selectedProgramId: programId });
    };

    return (
        <div className="mb-4">
            <label htmlFor="program" className="block mb-1 text-xs font-medium text-gray-600">
                Select Program
            </label>
            <select
                className="w-full px-3 py-2 border text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedProgramId}
                onChange={(e) => handleChangeProgram(e)}
            >
                <option value="">Select Program</option>
                {availablePrograms.map((program) => (
                    <option key={program.id} value={program.id}>
                        {program.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectProgram;

