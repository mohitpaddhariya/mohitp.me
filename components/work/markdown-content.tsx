import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import type { Node } from 'unist'

interface MarkdownContentProps {
  content: string
  className?: string
}

interface CardProps {
  title?: string
  description?: string
  value?: string
  icon?: string
  type?: 'metric' | 'feature' | 'result'
}

// Card component
const Card: React.FC<CardProps> = ({ title, description, value, icon, type = 'result' }) => {
  return (
    <div className={`card-component ${type}`}>
      {icon && <div className="card-icon">{icon}</div>}
      {title && <h4 className="card-title">{title}</h4>}
      {value && <div className="card-value">{value}</div>}
      {description && <p className="card-description">{description}</p>}
    </div>
  )
}

// Custom remark plugin to handle card blocks
function remarkCards() {
  return (tree: Node) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'card') {
        // Parse YAML-like syntax
        const lines = node.value.split('\n').filter((line: string) => line.trim())
        const props: CardProps = {}
        
        lines.forEach((line: string) => {
          const match = line.match(/^([^:]+):\s*"?([^"]*)"?$/)
          if (match) {
            const [, key, value] = match
            const cleanKey = key.trim() as keyof CardProps
            const cleanValue = value.replace(/^"|"$/g, '').trim()
            if (cleanKey in props || ['title', 'description', 'value', 'icon', 'type'].includes(cleanKey)) {
              ;(props as any)[cleanKey] = cleanValue
            }
          }
        })

        // Transform the code block into a custom HTML element that we'll replace later
        node.type = 'html'
        node.value = `<div class="card-placeholder" data-card='${JSON.stringify(props)}'></div>`
      }
    })
  }
}

// Function to replace card placeholders with React components
const replaceCardPlaceholders = (htmlContent: string): React.ReactNode[] => {
  const parts = htmlContent.split(/(<div class="card-placeholder"[^>]*><\/div>)/)
  
  return parts.map((part, index) => {
    const cardMatch = part.match(/data-card='([^']*)'/)
    if (cardMatch) {
      try {
        const cardProps = JSON.parse(cardMatch[1]) as CardProps
        return <Card key={index} {...cardProps} />
      } catch (e) {
        console.error('Failed to parse card props:', e)
        return <div key={index}>Error rendering card</div>
      }
    }
    
    if (part.trim() && !part.includes('card-placeholder')) {
      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
    }
    
    return null
  }).filter(Boolean)
}

const MarkdownContent = async ({ content, className = "" }: MarkdownContentProps) => {
  // Process markdown content with custom card plugin
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkCards)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content)

  const htmlContent = processedContent.toString()
  const processedElements = replaceCardPlaceholders(htmlContent)

  return (
    <div className={`markdown-content prose prose-theme max-w-none ${className}`}>
      {processedElements}
    </div>
  )
}

export default MarkdownContent
