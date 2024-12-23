
interface SubType {
  id: string;
  label: string;
}

interface SubTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: any) => void;
  types: SubType[];
}

export const SubTypeSelector = ({ selectedType, onTypeChange, types }: SubTypeSelectorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex space-x-4">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};