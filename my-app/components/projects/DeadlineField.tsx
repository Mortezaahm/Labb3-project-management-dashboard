import Input from '@/components/ui/Input';

type DeadlineFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DeadlineField({ value, onChange }: DeadlineFieldProps) {
  return (
    <div>
      <label htmlFor="deadline" className="mb-1 block text-sm font-medium">
        Deadline
      </label>
      <Input
        id="deadline"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
