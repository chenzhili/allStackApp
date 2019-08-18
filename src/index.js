import React from "react"
import ReactDOM from "react-dom"
import { hot } from 'react-hot-loader/root';


import "../public/static.css"
import styles from "./index.scss"
import theme from "../public/theme.scss"

import Test from "./component/test"

import store from "./store/store"
console.log(store);

@hot
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: "accc"
        }
    }
    render() {
        console.log(this.state.a);
        return (
            <div className={styles.test}>
                <Test/>
                <div onClick={() => {
                    this.setState({ a: "tet" });
                }}>可以了</div>
                {this.state.a}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));