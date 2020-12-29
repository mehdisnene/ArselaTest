import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = { page: {} };
  }
  async componentDidMount() {
    axios
      .get(`/api/page/${this.props.match.params.title}`)
      .then((res) => {
        const page = res.data;

        this.setState({ page });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    return (
      <div>
        <h1>{this.state.page.titlePage}</h1>
        <br />
        <h2>{this.state.page.descriptionPage}</h2>
        {this.state.page.form && (
          <Form reff={{ form: this.state.page.form, page: this.state.page }} />
        )}

        <br />
      </div>
    );
  }
}

export default CreatePage;
