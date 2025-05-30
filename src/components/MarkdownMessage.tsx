import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

interface MarkdownMessageProps {
  content: string
  isUser: boolean
}

export function MarkdownMessage({ content, isUser }: MarkdownMessageProps) {
  if (isUser) {
    // For user messages, render as plain text with whitespace preservation
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
    )
  }

  // For AI messages, render as markdown using Tailwind Typography
  return (
    <div className="prose prose-sm prose-blue max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
