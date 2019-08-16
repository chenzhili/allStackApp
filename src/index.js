import React from "react"
import ReactDOM from "react-dom"
import "../public/static.css"
import styles from "./index.scss"
import theme from "../public/theme.scss"

import "./store/store"
console.log(theme);


function App(){
    return (
        <div className={styles.test}>
            test
        </div>
    )
}

ReactDOM.render(<App/>,document.getElementById("root"));