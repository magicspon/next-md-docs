import remark from "remark"
import html from "remark-html"
import frontmatter from "remark-frontmatter"

export default async function md2html(markdown) {
	const result = await remark().use(html).use(frontmatter).process(markdown)
	return result.toString()
}
