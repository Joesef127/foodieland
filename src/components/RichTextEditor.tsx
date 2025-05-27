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
  initialContent?: string; 
}) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

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