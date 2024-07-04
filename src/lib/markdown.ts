// TODO: Use new <p> tags for paragraphs
class MarkdownParser {
  private markdown: string
  private references: { [key: string]: string } = {}
  private codeBlocks: string[] = []

  constructor(markdown: string) {
    this.markdown = markdown
  }

  private extractReferences(): void {
    const referencePattern: RegExp = /^\[([^\]]+)\]:\s*(\S+)/gm
    let match: RegExpExecArray | null

    // biome-ignore lint/suspicious/noAssignInExpressions: i dont want to fix this at this time.
    while ((match = referencePattern.exec(this.markdown)) !== null) {
      this.references[match[1]] = match[2]
    }

    this.markdown = this.markdown.replace(referencePattern, '')
  }

  private extractCodeBlocks(): void {
    const codeBlockPattern: RegExp = /```([^`]+)```/g
    this.markdown = this.markdown.replace(codeBlockPattern, (match, p1) => {
      this.codeBlocks.push(`<pre><code>${p1.trim()}</code></pre>`)
      return this.createPlaceholder(this.codeBlocks.length - 1)
    })

    const inlineCodePattern: RegExp = /`([^`]+)`/g
    this.markdown = this.markdown.replace(inlineCodePattern, (match, p1) => {
      this.codeBlocks.push(`<code>${p1}</code>`)
      return this.createPlaceholder(this.codeBlocks.length - 1)
    })
  }

  private createPlaceholder(index: number): string {
    return `<code-block-placeholder-${index}>`
  }

  private restoreCodeBlocks(html: string): string {
    let newHtml: string = html
    this.codeBlocks.forEach((block, i) => {
      newHtml = newHtml.replace(new RegExp(this.createPlaceholder(i), 'g'), block)
    })
    return newHtml
  }

  private replaceReferenceLinks(): void {
    this.markdown = this.markdown.replace(/\[([^\]]+)\]/g, (match: string, p1: string): string => {
      const url: string | undefined = this.references[p1]
      return url ? `<a href="${url}">${p1}</a>` : match
    })
  }

  private convertMarkdownToHtml(): string {
    let html: string = this.markdown

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    html = html.replace(/__(.*)__/gim, '<b>$1</b>')

    // Italics
    html = html.replace(/\*(.*)\*/gim, '<i>$1</i>')
    html = html.replace(/_(.*)_/gim, '<i>$1</i>')

    // Links and Images
    html = html.replace(/!\[(.*?)]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
    html = html.replace(/\[(.*?)]\((.*?)\)/gim, '<a href="$2">$1</a>')

    // Line breaks, should be limited to 2
    html = html.replace(/\n/gim, '<br />')

    // Remove trailing line breaks
    html = html.replace(/(<br \/>)+$/gim, '')

    // Support linking to communities and users (+communities and @users)
    html = html.replace(/\+([a-zA-Z0-9_]+)/gim, '<CommunityLink community-name="$1" />');
    // html = html.replace(/@([a-zA-Z0-9_]+)/gim, '<UserLink name="$1"></UserLink>');

    // Prevent script injection
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

    return html
  }

  public parse(): string {
    this.extractReferences()
    this.extractCodeBlocks()
    this.replaceReferenceLinks()
    let html: string = this.convertMarkdownToHtml()
    html = this.restoreCodeBlocks(html)
    return html.trim()
  }
}

export function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  const parser = new MarkdownParser(markdown)
  return parser.parse()
}
