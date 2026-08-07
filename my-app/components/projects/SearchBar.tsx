import Input from '@/components/ui/Input';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      type="text"
      placeholder="Search by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search projects by title"
    />
  );
}
