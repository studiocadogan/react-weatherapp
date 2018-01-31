import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {


  render() {
    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <IndexLink to="/">Search City</IndexLink>

      </nav>
    );
  }
}
