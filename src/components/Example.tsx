import React, { Component } from "react";
import axios from "axios";

import PaginationBlock from "./PaginationBlock";

class Example extends Component {
  state = {
    ships: [],
    isLoading: false,
    pageSize: 10,
    currentPage: 1,
  };

  fetchData = () => {
    const { currentPage } = this.state;
    axios
      .get(`https://swapi.dev/api/starships/?page=${currentPage}`)
      .then((res) =>
        this.setState({
          ships: res.data.results,
        })
      )
      .finally(() => {
        this.setState({ isLoading: false });
        console.log(this.state.ships.length);
      });
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchData();
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
    }
  }

  handleClick = (e: any, idx: Number) => {
    e.preventDefault();
    this.setState({ currentPage: idx });
  };

  render() {
    const lastPage = this.state.ships.length < this.state.pageSize;

    return (
      <>
        <PaginationBlock
          currentPage={this.state.currentPage}
          onClick={this.handleClick}
          isLastPage={lastPage}
        />

        <h2>Здесь будет результат запроса</h2>
        {!this.state.isLoading && (
          <ul>
            {this.state.ships.map((ship: any) => (
              <li key={ship.name}>{ship.name}</li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Example;
