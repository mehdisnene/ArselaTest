import React, { Component } from "react";
import axios from "axios";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const data = this.props.reff.form.data.map((o) => {
      return { [o.placeholderText]: o.defaultValue };
    });
    console.log(data);
    this.setState({ data });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newState = this.state.data.map((ob) => {
      console.log(ob);
      if (Object.keys(ob) == name) {
        return { [name]: value };
      }
      return ob;
    });
    console.log(newState);
    this.setState({
      data: [...newState],
    });
  }
  async handleSubmit(event) {
    event.preventDefault();

    const data = {
      form: this.props.reff.form,
      page: this.props.reff.page,
      data: this.state.data,
    };
    axios.post(`http://localhost:3000/api/formData/`, data).then();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.reff.form.data.map((o) => {
          if (o.type === "textarea") {
            return (
              <>
                <label>
                  {o.placeholderText}:
                  <textarea
                    name={o.placeholderText}
                    value={this.state.data.find(
                      (item) => item[o.placeholderText] === o.placeholderText
                    )}
                    onChange={this.handleChange}
                  />
                </label>
              </>
            );
          }
          return (
            <>
              <label>
                {o.placeholderText}:
                <input
                  type={o.type}
                  name={o.placeholderText}
                  value={this.state.data.find(
                    (item) => item[o.placeholderText] === o.placeholderText
                  )}
                  required={o.isRequired === "yes"}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <br />
            </>
          );
        })}
        {this.props.reff.form.data.length !== 0 && (
          <input type="submit" value="Submit" />
        )}
      </form>
    );
  }
}

export default Form;
