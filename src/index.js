import React, { Component } from "react"
import ReactDOM from "react-dom"
import { hot } from 'react-hot-loader/root';
// import dom from "react-router-dom"
import { Provider, connect } from "react-redux"

import RouterCom from "./router"

import "../public/static.css"
import styles from "./index.scss"
import theme from "../public/theme.scss"

import Test from "./component/test"

import store from "./store/store"


/* @hot
@connect((state,props)=>{console.log(state,props);return state.a})
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a:"asdfds"
        }
    }
    render() {
        console.log(this.props);
        return (
            <div className={styles.test} onClick={()=>{
                this.props.dispatch({
                    type:"a/test",
                    payload:{
                        test:2
                    }
                })
            }}>
                {this.props.testData?this.props.testData:this.state.a}
            </div>
        )
    }
} */
@hot
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterCom />
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));