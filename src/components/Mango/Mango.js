import React from "react"
import classNames from "classnames"
import styles from "./Mango.module.css"

function Mango() {
	return (
		<div className={classNames(styles.box, "text-blue-500")}>
			Hello <span className="underline">Mango!</span>
		</div>
	)
}

export default Mango
