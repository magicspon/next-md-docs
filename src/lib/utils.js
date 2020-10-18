/* eslint-disable compat/compat */
import fs from "fs"
import path from "path"
import * as R from "ramda"
import glob from "glob"
import { PATH_TO_DOCS } from "./constants"

export const asyncGlobe = (paths) =>
	new Promise((resolve, reject) => {
		glob(paths, {}, (err, files) => {
			if (err) reject(err)
			resolve(files)
		})
	})

export const findFile = (slug, files) => {
	const file = files
		.map((file) => ({
			file,
			slug: file
				.replace(PATH_TO_DOCS, "")
				.replace("_index.md", "")
				.replace(".md", ""),
		}))
		.find((v) => v.slug === slug)

	return file
}

export const createUriFromFilePath = (filePath) =>
	`/docs${filePath.replace(PATH_TO_DOCS, "").replace(".md", "")}/`

function stripSlashes(str) {
	return str.replace(/(^\/+|\/+$)/g, "")
}

export function createPathManifest(routes) {
	const childPaths = R.compose(
		R.filter((v) => R.length(v.uri)),
		R.map(({ filePath, slug, title }) => {
			const pathname = slug.replace("_index/", "")
			const uri = stripSlashes(pathname)
			return {
				title,
				uri: pathname,
				filePath,
				segments: R.split("/", uri),
			}
		})
	)(routes)

	const segments = R.pluck("segments")(childPaths)
	const tree = []

	segments.forEach((row) => {
		let currentLevel = tree
		let baseUri = R.compose(R.join("/"), R.dropLast(1))(row)

		row.forEach((slug, index) => {
			const existingPath = currentLevel.find((v) => v.key === slug)
			if (existingPath) {
				currentLevel = existingPath.children
			} else {
				const uri = index === 0 ? `${slug}` : `/${baseUri}/${slug}/`
				const route = childPaths.find((route) => route.uri === uri)
				if (route) {
					const cell = {
						key: slug,
						uri,
						children: [],
						title: route.title,
					}

					currentLevel.push(cell)
					currentLevel = cell.children
				}
			}
		})
	})

	return tree
}
