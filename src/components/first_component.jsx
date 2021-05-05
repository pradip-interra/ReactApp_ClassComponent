import React, { Component } from "react";
import axios from "axios";

class FirstComponent extends Component {
  state = { tags: [] };
  constructor(props) {
    console.log("[Lifecycle hook]: Constructor (child)");
    super(props);

    // this is how the state can be defined in the body or ctor.
    // this.state = {
    //   count: 0,
    //   tags: ["tag1", "tag2", "tag3"],
    // };
  }

  styles = {
    fontSize: 20,
    foneWeight: "bold",
  };

  render() {
    console.log("[Lifecycle hook]: Render (child)");
    this.conditionalClass();
    return <div>{this.renderConditional()}</div>;
  }

  conditionalClass() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    // const { count } = this.state; // object deconstruction to count
    const { value } = this.props.counter; // object deconstruction to count. This means this.props.counter.value is assigned to lhs value const.
    return value === 0 ? "Zero" : value;
  }

  // *ngIf equivalent
  renderConditional() {
    if (this.props.tags.length === 0) {
      return <p> Oh no! No element. </p>;
    } else {
      return (
        <div>
          <span className={this.conditionalClass()}>{this.formatCount()}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => this.props.onIncrement(this.props.counter)}
          >
            Increment
          </button>
          <button
            className="btn btn-danger btn-sm ml-2"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            Delete
          </button>
          {/* <ul>
            {this.state.tags.map((
              tag // *ngFor equivalent
            ) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul> */}
        </div>
      );
    }
  }

  // old incrementer when the state was a property of the child.
  // this is registered in onClick={() => this.increment(1)} of the Increment button, after className.
  incrementOld = (id) => {
    this.setState({ count: this.props.counter.value + 1 });
  };

  componentDidMount() {
    console.log("[Lifecycle hook]: ComponentDidMount (child)");
  }
  componentDidUpdate() {
    console.log("[Lifecycle hook]: componentDidUpdate (child)");
  }
  componentWillUnmount() {
    console.log("[Lifecycle hook]: componentWillUnmount (child)");
  }
}

export default FirstComponent;
