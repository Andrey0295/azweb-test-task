import React, { Component } from "react";
import axios from "axios";

import PaginationBlock from "./PaginationBlock";

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
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
      <>
        <h2>Здесь будет результат запроса</h2>
        {!this.state.isLoading && (
          <ul>
            {starships.map((ship: any) => (
              <li key={ship.name}>{ship.name}</li>
            ))}
          </ul>
        )}

        <div>
          <Card className={styles.block}>
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
            </CardBody>
          </Card>
        </div>

        <PaginationBlock
          currentPage={currentPage}
          onClick={this.handleClick}
          isLastPage={lastPage}
        />
      </>
    );
  }
}

export default StarshipsMain;
