import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99999,
  className = '',
}: QuantitySelectorProps) {
  const [inputValue, setInputValue] = useState(String(value));

  const decrease = () => {
    const newVal = Math.max(min, value - 1);
    onChange(newVal);
    setInputValue(String(newVal));
  };

  const increase = () => {
    const newVal = Math.min(max, value + 1);
    onChange(newVal);
    setInputValue(String(newVal));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || parsed < min) {
      onChange(min);
      setInputValue(String(min));
    } else if (parsed > max) {
      onChange(max);
      setInputValue(String(max));
    } else {
      onChange(parsed);
      setInputValue(String(parsed));
    }
  };

  return (
    <div className={`inline-flex items-center border border-border rounded-lg overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="p-2 hover:bg-surface-alt transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-14 text-center text-sm font-medium border-x border-border py-2 bg-surface focus:outline-none"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="p-2 hover:bg-surface-alt transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
