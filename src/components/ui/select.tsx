import React from 'react';

type SelectContextType = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextType>({});

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      {children}
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

export function SelectValue() {
  return null;
}

export function SelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, onValueChange } = React.useContext(SelectContext);

  const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{
    value: string;
    children: React.ReactNode;
  }>[];

  return (
    <select
      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none"
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {items.map((item) => (
        <option key={item.props.value} value={item.props.value}>
          {item.props.children}
        </option>
      ))}
    </select>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <>{React.createElement('option', { value }, children)}</>;
}
