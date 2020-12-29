import { Component } from "react";
import axios from "axios";
import src from "../arsela.png";
import "../App.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import Search from "./Search";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleForm: "",
      formList: [],
      pageList: [],
      page: { titlePage: "", descriptionPage: "", form: "" },
      redirect: false,
      errorMessage: "",
      errorMessagePage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddForm = this.handleAddForm.bind(this);
    this.handleAddPage = this.handleAddPage.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === "titleForm") {
      if (this.state.formList.find((v) => v === value)) {
        this.setState({
          errorMessage: `already Exist try ${value}1 `,
        });
      } else {
        this.setState({
          errorMessage: "",
        });
      }
      this.setState({
        titleForm: value,
      });
    } else {
      if (this.state.pageList.find((page) => page.titlePage === value)) {
        this.setState({
          errorMessagePage: `Page already Exist try ${value}1 `,
        });
      } else {
        this.setState({
          errorMessagePage: "",
        });
      }
      this.setState({
        page: { ...this.state.page, [name]: value },
      });
    }
  }
  handleAddForm(event) {
    event.preventDefault();
    if (!this.state.formList.find((v) => v === this.state.titleForm)) {
      this.setState({
        formList: [...this.state.formList, this.state.titleForm],
      });
      this.setState({ redirect: true });
    }
  }
  handleAddPage(event) {
    event.preventDefault();
    if (
      !this.state.pageList.find(
        (page) => page.titlePage === this.state.page.titlePage
      )
    ) {
      axios.post(`/api/page/`, this.state.page).then((res) => {
        this.setState({
          pageList: [...this.state.pageList, res.data],
        });
      });
    }
  }

  componentDidMount() {
    axios.get("/api/form").then((res) => {
      const formList = res.data.map((o) => {
        return o.title;
      });

      this.setState({ formList });
    });
    axios.get("/api/page").then((res) => {
      const pageList = res.data;
      this.setState({ pageList });
    });
  }
  render() {
    return (
      <div>
        {this.state.redirect && (
          <Redirect to={`/createform/${this.state.titleForm}`} />
        )}
        <div className="App-header">
          <img src={src} alt="Logo" />
        </div>
        <br />
        <div className="wrapper">
          <div className="item1">
            <h3>Forms</h3>
            <ul>
              {this.state.formList.map((form) => (
                <li>
                  <Link to={`/createform/${form}`}>{form} </Link>
                </li>
              ))}
            </ul>
            <br />
            <form onSubmit={this.handleAddForm}>
              <label>
                Title Form :
                <input
                  type="text"
                  name="titleForm"
                  value={this.state.titleForm}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="add" />
              <br />
              <label>{this.state.errorMessage}</label>
            </form>
          </div>

          <div className="item2">
            <h3>Pages</h3>
            <ul>
              {this.state.pageList.map((o) => (
                <li>
                  <Link to={`/page/${o.titlePage}`}>{o.titlePage}</Link>
                </li>
              ))}
            </ul>
            <br />
            <form onSubmit={this.handleAddPage}>
              <label>
                Title Page :
                <input
                  type="text"
                  name="titlePage"
                  value={this.state.page.titlePage}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                description:
                <textarea
                  name="descriptionPage"
                  value={this.state.page.descriptionPage}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <br />
              <label> form :</label>
              <select
                name="form"
                value={this.state.page.form}
                onChange={this.handleChange}
              >
                <option></option>
                {this.state.formList.map((o) => (
                  <option value={o}>{o}</option>
                ))}
              </select>

              <input type="submit" value="add" />
              <br />
              <label>{this.state.errorMessagePage}</label>
            </form>
          </div>
          <div className="item3">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
