/* eslint-disable @typescript-eslint/no-explicit-any */
const InputSymbolPerSession = ({ numberOfSessions, data, setData }: any) => {
    const handleChange = (index: number, value: string) => {
        setData((prev: any) => ({
            ...prev,
            symbols: prev.symbols.map((item: string, i: number) => (i === index ? value : item)),
        }));
    };

    return (
        <div className="mb-4">
            <label htmlFor="tryout" className="block mb-1 text-xs font-medium text-gray-600">
                Input Symbol Per Session
            </label>
            {numberOfSessions > 0 && data.symbols
                ? Array.from({ length: numberOfSessions }).map((_, index) => (
                      <div key={index} className="flex items-center mb-2">
                          <label
                              htmlFor={`session-${index + 1}`}
                              className="block mb-1 mr-3 text-xs font-medium text-gray-600"
                          >
                              {index + 1}
                          </label>
                          <input
                              type="text"
                              id={`session-${index + 1}`}
                              className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Session ${index + 1}`}
                              value={data.symbols[index] || ""}
                              onChange={(e) => handleChange(index, e.target.value)}
                          />
                      </div>
                  ))
                : null}
        </div>
    );
};

export default InputSymbolPerSession;
