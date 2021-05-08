import React, { Component } from "react";
import axios from "axios";

import PaginationBlock from "../PaginationBlock";
import StarshipCard from "../StarshipCard/StarshipCard";

import styles from "./StarshipsMain.module.css";

axios.defaults.baseURL = "https://swapi.dev/api/starships";

class StarshipsMain extends Component {
  state = {
    starships: [],
    isLoading: false,
    pageSize: 10,
    currentPage: 1,
  };

  fetchData = () => {
    const { currentPage } = this.state;
    axios
      .get(`/?page=${currentPage}`)
      .then(({ data }) =>
        this.setState({
          starships: data.results,
        })
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchData();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { currentPage } = this.state;
    if (prevState.currentPage !== currentPage) {
      this.fetchData();
    }
  }

  handleClick = (e: any, idx: Number) => {
    e.preventDefault();
    this.setState({ currentPage: idx });
  };

  render() {
    const { starships, pageSize, currentPage } = this.state;
    const lastPage = starships.length < pageSize;

    return (
      <div className={styles.main}>
        <StarshipCard starshipsData={starships} />

        <PaginationBlock
          currentPage={currentPage}
          onClick={this.handleClick}
          isLastPage={lastPage}
        />
      </div>
    );
  }
}

export default StarshipsMain;
