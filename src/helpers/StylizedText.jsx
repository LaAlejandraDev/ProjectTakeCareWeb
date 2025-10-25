import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function StylizerText({ text, expanded = false, isComment = false }) {
  let html = "";
  let truncatedText = "";
  let textLimit = isComment ? 50 : 150;
  if (expanded == false) {
    truncatedText =
    text.length > textLimit ? text.substring(0, textLimit) + "... **ver completo**" : text;
    html = DOMPurify.sanitize(marked(truncatedText));
  } else {
    html = DOMPurify.sanitize(marked(text));
  }
  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
