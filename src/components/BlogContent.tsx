import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export default function BlogContent({ content }: { content: string }) {
  const contentState = convertFromRaw(JSON.parse(content)); // Convert JSON back to Draft.js content
  const html = stateToHTML(contentState); // Convert Draft.js content to HTML

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
