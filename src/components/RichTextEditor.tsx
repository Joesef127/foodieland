import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/RichTextEditor.css";

export default function RichTextEditor({
  onChange,
  initialContent,
}: {
  onChange: (content: string) => void;
  initialContent?: string; // Optional initial content
}) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  // Initialize the editor state with the initial content if provided
  useEffect(() => {
    if (initialContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(initialContent));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error parsing initial content:", error);
      }
    }
  }, [initialContent]);

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