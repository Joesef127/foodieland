import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export default function BlogContent({ content }: { content: string }) {
  const contentState = convertFromRaw(JSON.parse(content)); 
  const html = stateToHTML(contentState); 

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
