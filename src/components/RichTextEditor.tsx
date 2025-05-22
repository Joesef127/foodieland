import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/RichTextEditor.css";

export default function RichTextEditor({
  onChange,
}: {
  onChange: (content: string) => void;
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);

    // Convert editor state to raw JSON and pass it to the parent
    const rawContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    onChange(rawContent);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassname"
        wrapperClassName="wrapperClassname"
        editorClassName="editorClassname"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
