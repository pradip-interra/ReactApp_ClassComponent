import React, { Component } from "react";
import FirstComponent from "./first_component";

class ParentComponent extends Component {
  state = { counters: [{}] };
  constructor(props) {
    console.log("[Lifecycle hook]: Constructor (parent)");
    super(props);
    this.state = {
      counters: [
        {
          id: 1,
          value: 0,
        },
        {
          id: 2,
          value: 0,
        },
        {
          id: 3,
          value: 0,
        },
        {
          id: 4,
          value: 0,
        },
      ],
      tags: ["tag1", "tag2", "tag3"],
    };
  }
  render() {
    console.log("[Lifecycle hook]: Render (parent)");
    return (
      <div>
        <button
          className="btn btn-info btn-sm pb-2"
          onClick={() => this.handleReset()}
        >
          Reset
        </button>
        {this.state.counters.map((counter) => (
          <FirstComponent
            key={counter.id}
            counter={counter}
            tags={this.state.tags}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          ></FirstComponent>
        ))}
      </div>
    );
  }

  // this is the parent class button handler.
  // whereas onDelete is the this.props.onDelete on the button action binding in child.
  // that onDelete is bound to this handleDelete method.
  handleDelete = (counterId) => {
    // dont directly write to the main object
    // get all but the currently deleting counter
    const localCounters = this.state.counters.filter(
      (counter) => counter.id !== counterId
    );
    // set the state where all the counters are there, but the current counter
    this.setState({ counters: localCounters });
  };

  // This is the reset button handler in the parent. This is just an event binding, onClick of reset button, this code will be executed.
  handleReset = () => {
    // going to reset the counter array in the state to make the values 0.
    const counters = [...this.state.counters];
    counters.map((counter) => (counter.value = 0));
    this.setState({ counters }); // this is equivalent to counter: counter where the RHS is the localcounter and the lhs is the counters key.
    // as both are same, so we can just write once.
  };

  // This is the parent handler where the child is sending back the counterId as the data propagation on the click of the Increment button in child.
  // The onDelete is in the child which is bound to the Increment button as: onClick={() => this.props.onIncrement(this.props.counter.id)}
  handleIncrement = (counter) => {
    // find the counter from the counters array
    const index = this.state.counters.indexOf(counter);
    // copy the counters object
    const clonedCounters = [...this.state.counters];
    // set thisCnt in the currentCounter's array in proper position
    clonedCounters[index] = { id: counter.id, value: counter.value + 1 };
    // set the state
    this.setState({ counters: clonedCounters });
  };

  componentDidMount() {
    console.log("[Lifecycle hook]: ComponentDidMount (parent)");
  }
  componentDidUpdate() {
    console.log("[Lifecycle hook]: componentDidUpdate (parent)");
  }
  componentWillUnmount() {
    console.log("[Lifecycle hook]: componentWillUnmount (parent)");
  }
}

export default ParentComponent;
