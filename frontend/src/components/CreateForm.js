import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import "../App.css";
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: "Untitled",
      defaultValue: "",
      isRequired: "yes",
      type: "text",
      data: [],
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }
  async componentDidMount() {
    axios
      .get(`/api/form/${this.props.match.params.title}`)
      .then((res) => {
        console.log(res.data);
        const data = res.data.data;

        this.setState({ data });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  async handleFinish(event) {
    event.preventDefault();

    const data = {
      title: this.props.match.params.title,
      data: this.state.data,
    };
    axios.post(`/api/form/`, data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    this.setState({ redirect: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      placeholderText: "Untitled",
      defaultValue: "",
      isRequired: "yes",
      type: "text",
      data: [
        ...this.state.data,
        {
          placeholderText: this.state.placeholderText,
          defaultValue: this.state.defaultValue,
          isRequired: this.state.isRequired,
          type: this.state.type,
        },
      ],
    });
  }

  render() {
    const mystyle = {
      margin: "5px 50px",
    };

    return (
      <div className="wrapper">
        {this.state.redirect && <Redirect to="" />}
        <br />
        <grid className="item1">
          <form onSubmit={this.handleFinish}>
            {this.state.data.map((o) => {
              if (o.type === "textarea") {
                return (
                  <>
                    <label>
                      {o.placeholderText}:
                      <textarea
                        name={o.placeholderText}
                        value={o.defaultValue}
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
                      value={o.defaultValue}
                    />
                  </label>
                  <br />
                  <br />
                </>
              );
            })}
            {this.state.data.length !== 0 && (
              <input type="submit" value="finish" />
            )}
          </form>
        </grid>
        <br />

        <grid className="item2">
          <form onSubmit={this.handleSubmit}>
            <label>
              Placeholder Text:
              <input
                type="text"
                name="placeholderText"
                value={this.state.placeholderText}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Default Value:
              <input
                type="text"
                name="defaultValue"
                value={this.state.defaultValue}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              required:
              <select
                name="isRequired"
                value={this.state.isRequired}
                onChange={this.handleChange}
              >
                <option value="yes">yes</option>
                <option value="no">no </option>
              </select>
            </label>
            <br />
            <div style={mystyle}>
              <br />
              <input type="submit" value="add" />
              <select
                name="type"
                value={this.state.type}
                onChange={this.handleChange}
              >
                <option value="text">text</option>
                <option value="email">email </option>
                <option value="password">password</option>
                <option value="textarea">textarea </option>
              </select>
            </div>
          </form>
        </grid>
      </div>
    );
  }
}

export default withRouter(CreateForm);
