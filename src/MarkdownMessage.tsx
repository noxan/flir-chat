import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownMessageProps {
  content: string;
  isUser: boolean;
}

export function MarkdownMessage({ content, isUser }: MarkdownMessageProps) {
  if (isUser) {
    // For user messages, render as plain text with whitespace preservation
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
    );
  }

  // For AI messages, render as markdown
  return (
    <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-blue">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom styling for markdown elements
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold text-blue-900 mb-2 mt-4 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-blue-900 mb-2 mt-3 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-blue-900 mb-1 mt-2 first:mt-0">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-blue-900">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-1 text-blue-900">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-1 text-blue-900">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-blue-900">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-200 pl-4 italic mb-2 text-blue-800">{children}</blockquote>
          ),
          code: ({ children, className, ...props }: any) => {
            const isInline = !className?.includes('language-');
            if (isInline) {
              return (
                <code className="bg-blue-100 text-blue-900 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-blue-100 text-blue-900 p-3 rounded-md text-xs font-mono overflow-x-auto mb-2" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-blue-100 text-blue-900 p-3 rounded-md text-xs font-mono overflow-x-auto mb-2">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full border-collapse border border-blue-200">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-blue-200 bg-blue-100 px-2 py-1 text-left text-xs font-semibold text-blue-900">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border border-blue-200 px-2 py-1 text-xs text-blue-900">{children}</td>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 underline"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-blue-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-blue-900">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
