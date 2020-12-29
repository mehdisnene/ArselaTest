import React, { Component } from "react";
import axios from "axios";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSearched: "",
      searchByForm: false,
      errorMessage: "",
      dataList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.state.searchByForm) {
      await axios
        .get(
          `http://localhost:3000/api/formData/byform/${this.state.itemSearched}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            this.setState({
              errorMessage: " No Data  ",
            });
          } else {
            this.setState({
              errorMessage: "",
            });
          }
          console.log(res.data);
          const dataList = res.data.map((a) => {
            return a.data.reduce((accumulator, currentValue) => {
              return (
                accumulator +
                " " +
                Object.entries(currentValue)
                  .map((a) => `${a[0]}:${a[1]}`)
                  .join(" ")
              );
            }, "");
          });
          console.log(dataList);
          this.setState({
            dataList: dataList,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errorMessage: "Form not found ",
          });
        });
    } else {
      await axios
        .get(
          `http://localhost:3000/api/formData/bypage/${this.state.itemSearched}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            this.setState({
              errorMessage: " No Data  ",
            });
          } else {
            this.setState({
              errorMessage: "",
            });
          }
          console.log(res.data);
          const dataList = res.data.map((a) => {
            return a.data.reduce((accumulator, currentValue) => {
              return (
                accumulator +
                " " +
                Object.entries(currentValue)
                  .map((a) => `${a[0]}:${a[1]}`)
                  .join(" ")
              );
            }, "");
          });
          console.log(dataList);
          this.setState({
            dataList: dataList,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errorMessage: "Page not found ",
          });
        });
    }
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <h3>Show Data </h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="itemSearched"
            value={this.state.itemSearched}
            onChange={this.handleChange}
          />
          <select
            name="searchByForm"
            value={this.state.searchByForm}
            onChange={this.handleChange}
          >
            <option value="false">search by Page</option>
            <option value="true">search by Form</option>
          </select>
          <input type="submit" value="search" />
        </form>
        <br />
        <p> {this.state.errorMessage}</p>
        <br />
        {this.state.dataList.map((a) => (
          <p>{a}</p>
        ))}
      </div>
    );
  }
}

export default Search;
