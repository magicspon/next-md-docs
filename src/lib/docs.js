/* eslint-disable compat/compat */
import fs from "fs"
import * as R from "ramda"
import matter from "gray-matter"
import { MD_GLOB } from "./constants"
import {
	createUriFromFilePath,
	createPathManifest,
	findFile,
	asyncGlobe,
} from "./utils"

const getEntries = R.map((filePath) => {
	const content = fs.readFileSync(filePath, "utf8")
	const meta = matter(content)
	return {
		slug: createUriFromFilePath(filePath),
		filePath,
		title: meta.data.title,
	}
})

export async function getAllMarkDownPaths() {
	const paths = await asyncGlobe(MD_GLOB)
	return getEntries(paths)
}

export async function getPost(slug) {
	const paths = await asyncGlobe(MD_GLOB)
	const entries = getEntries(paths)
	const match = findFile(slug, paths)
	const tree = createPathManifest(entries)

	if (match) {
		const content = fs.readFileSync(match.file, "utf8")
		const { data } = matter(content)

		return {
			data,
			content,
			tree,
		}
	}

	return null
}
