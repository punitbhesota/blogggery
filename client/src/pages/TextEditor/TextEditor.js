import styles from "./TextEditor.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback } from "react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-underline";

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.edit_container}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? styles.ubutton : styles.button}
      >
        <img className={styles.editicons} src="./Bold.png" alt="" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? styles.ubutton : styles.button}
      >
        <img className={styles.editicons} src="./Italic.png" alt="" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline") ? styles.ubutton : styles.button
        }
      >
        <img className={styles.editicons} src="./Underline.png" alt="" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? styles.ubutton : styles.button}
      >
        <img className={styles.editicons} src="./Strike.png" alt="" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? styles.ubutton : styles.button
        }
      >
        <img className={styles.editicons} src="./List.png" alt="" />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button> */}

      <button
        onClick={setLink}
        className={editor.isActive("link") ? styles.ubutton : styles.button}
        // className={styles.button}
      >
        <img className={styles.editicons} src="./Hyper.png" alt="" />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        unsetLink
      </button> */}
    </div>
  );
};

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
