type CustomSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

export default function CustomSwitch({
  checked,
  onCheckedChange,
  className = '',
}: CustomSwitchProps) {
  return (
    <div
      aria-checked={checked}
      className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
        checked ? 'bg-white/30' : 'bg-white/10'
      } ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange(!checked);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onCheckedChange(!checked);
        }
      }}
      role="switch"
      tabIndex={0}
    >
      <div
        className={`pointer-events-none block h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-3' : 'translate-x-0.5'
        }`}
      />
    </div>
  );
}
