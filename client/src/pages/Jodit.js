import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: [
    "bold",
    "underline",
    "italic",
    "link",
    "unlink",
    "strikethrough",
    "ul",
  ],
};

const Jodit = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default Jodit;
