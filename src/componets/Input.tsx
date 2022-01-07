import React from "react";

export default function Input(props: any) {
  return (
    <div>
      <label>{props.label}:</label>
      <input
        type="text"
        name={props.label}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
