"use client";
import React from "react";

type Props = {
  id?: string;
  value?: string; // ISO-like local datetime string: YYYY-MM-DDTHH:mm
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
};

export default function DateTimePicker({ id, value, onChange, label, required }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <label className="block text-sm">
      {label && <div className="mb-1 font-medium">{label}</div>}
      <input
        id={id}
        className="w-full rounded-md border px-3 py-2"
        type="datetime-local"
        value={value}
        onChange={handleChange}
        required={!!required}
        // allow better mobile UX: show date & time picker where supported
        inputMode="numeric"
      />
    </label>
  );
}
