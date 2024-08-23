"use client";

import { useState } from "react";

type InputProps = {
  label: string;
  id: string;
  isRequired: boolean;
  pattern?: RegExp;
  textarea?: boolean;
  updateValue: (value: string) => void;
};

export default function Input({
  label,
  id,
  isRequired,
  pattern,
  textarea = false,
  updateValue,
}: InputProps) {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);

  function handleValueChange(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const inputValue = e.currentTarget.value;
    setValue(inputValue);

    if (pattern && !pattern?.test(inputValue)) {
      setValid(false);
      updateValue("");
    } else if (isRequired && inputValue === "") {
      setValid(false);
      updateValue("");
    } else {
      updateValue(inputValue);
      setValid(true);
    }
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {isRequired ? " *" : ""}
      </label>
      {textarea ? (
        <textarea
          id={id}
          onChange={handleValueChange}
          value={value}
          className={`w-full rounded-xl border p-2 h-32 resize-none ${
            valid ? "border-lightGrey" : "border-red"
          }`}
        />
      ) : (
        <input
          id={id}
          onChange={handleValueChange}
          value={value}
          className={`w-full rounded-xl border p-2 ${
            valid ? "border-lightGrey" : "border-red"
          }`}
        />
      )}
    </div>
  );
}
