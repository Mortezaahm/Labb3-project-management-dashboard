type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  disabled
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        px-4
        py-2
        rounded
        bg-blue-600
        text-white
        hover:bg-blue-700

        disabled:opacity-50
        transition
        "
    >
      {children}
    </button>
  );
}
