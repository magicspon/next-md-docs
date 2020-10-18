import { getAllMarkDownPaths, getPost } from "@/lib/docs"
import * as R from "ramda"
import md2html from "@/lib/md2html"

export default function DocPage({ data, content }) {
	return <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
}

export async function getStaticProps({ params }) {
	const slug = params?.slug ? `/${params.slug.join("/")}` : "/"
	const resp = await getPost(slug)

	const content = await md2html(resp.content)

	return {
		props: { data: resp.data, content },
	}
}

export async function getStaticPaths() {
	const paths = await getAllMarkDownPaths()

	// console.log(paths)

	return {
		paths: R.pluck("slug", paths),
		fallback: true,
	}
}
