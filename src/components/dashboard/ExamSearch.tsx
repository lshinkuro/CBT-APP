import { Search } from 'lucide-react';
import { useState } from 'react';

interface ExamSearchProps {
  onSearch: (query: string) => void;
}

export const ExamSearch = ({ onSearch }: ExamSearchProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Cari ujian..."
        value={query}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};