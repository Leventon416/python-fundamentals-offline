import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  caption?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', caption }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (): void => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-3 rounded-xl border border-coddy-border bg-coddy-dark shadow-inner overflow-hidden">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-coddy-border/70 bg-[#1e293b]/50 px-4 py-2 text-xs">
        <span className="font-mono font-semibold uppercase tracking-wider text-emerald-400">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 rounded px-2 py-1 text-slate-400 hover:bg-coddy-border hover:text-white transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[11px]">Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto font-mono text-xs text-emerald-300 leading-relaxed selection:bg-emerald-500/30 selection:text-emerald-200">
        <pre>
          <code>{code}</code>
        </pre>
      </div>

      {/* Caption if provided */}
      {caption && (
        <div className="border-t border-coddy-border/50 bg-[#1e293b]/30 px-4 py-2 text-[11px] text-slate-400 italic">
          💡 {caption}
        </div>
      )}
    </div>
  )
}

interface MarkdownRendererProps {
  content: string
  className?: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`text-slate-300 text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        components={{
          code({ className: codeClassName, children, ...props }) {
            const rawContent = String(children)
            const isMultiline = rawContent.includes('\n')
            const match = /language-(\w+)/.exec(codeClassName || '')

            if (isMultiline || match) {
              const lang = match ? match[1] : 'python'
              return <CodeBlock code={rawContent.replace(/\n$/, '')} language={lang} />
            }

            return (
              <code
                className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-sky-400 border border-slate-700/60 inline-block align-baseline"
                {...props}
              >
                {children}
              </code>
            )
          },
          p({ children }) {
            return <p className="mb-2 leading-relaxed text-slate-300 last:mb-0">{children}</p>
          },
          strong({ children }) {
            return <strong className="font-semibold text-white">{children}</strong>
          },
          em({ children }) {
            return <em className="italic text-slate-200">{children}</em>
          },
          ul({ children }) {
            return (
              <ul className="my-2 list-disc pl-5 space-y-1.5 marker:text-emerald-400 text-slate-300">
                {children}
              </ul>
            )
          },
          ol({ children }) {
            return (
              <ol className="my-2 list-decimal pl-5 space-y-1.5 marker:text-cyan-400 text-slate-300">
                {children}
              </ol>
            )
          },
          li({ children }) {
            return <li className="text-slate-300">{children}</li>
          },
          blockquote({ children }) {
            return (
              <blockquote className="my-2 border-l-2 border-emerald-500 pl-3 italic text-slate-400 bg-emerald-950/20 py-1 rounded-r">
                {children}
              </blockquote>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
