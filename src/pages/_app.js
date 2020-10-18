import * as T from "prop-types"
import "@/styles/index.css"
import { useRouter } from "next/router"
import Link from "next/link"

export default function AppRoot({ Component, pageProps }) {
	const { pathname } = useRouter()
	const isDocs = pathname.includes("docs")
	return (
		<div>
			<Link href="/docs/">
				<a>Docs</a>
			</Link>
			<Component {...pageProps} />
		</div>
	)
}

AppRoot.propTypes = {
	Component: T.any.isRequired,
	pageProps: T.objectOf(T.any),
}
