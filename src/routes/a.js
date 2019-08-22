import React, { Component } from "react"
import { connect } from "react-redux"
import { Route, Link, Switch } from "react-router-dom"

import { mapRoutes } from "../utils/routeCommon"

const B = (props) => {
  return (
    <div>B 子页面</div>
  )
}



@connect((state) => { console.log(state); return state; })
class A extends Component {
  render() {
    console.log(this.props);
    return (
      <div onClick={() => {
        this.props.dispatch({
          type: "a/test",
          payload: {
            test: 2
          }
        });
      }}>
        {this.props.a.testData ? this.props.a.testData : "A"}
        <Link to={`${this.props.match.path}/child`}>跳转 子页面</Link>
        {
          mapRoutes(this.props.routes)
        }
      </div>
    )
  }
}

export default A;
