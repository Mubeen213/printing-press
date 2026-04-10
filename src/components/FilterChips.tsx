interface FilterChipsProps {
  options: Array<{ key: string; label: string; count?: number }>;
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function FilterChips({ options, activeKey, onChange, className = '' }: FilterChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((opt) => {
        const isActive = opt.key === activeKey;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-button'
                : 'bg-surface-alt text-text-secondary hover:bg-border-light hover:text-text border border-border'
            }`}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span
                className={`text-xs ${
                  isActive ? 'text-white/70' : 'text-muted'
                }`}
              >
                ({opt.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
