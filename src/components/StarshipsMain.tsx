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
      <div className={styles.main}>
        <div className="text-center row row-cols-md-3 row-cols-lg-4 row-cols-sm-2 text-truncate g-0  mx-auto">
          {starships.map((starship: any) => (
            <div className="col " key={starship.name}>
              <div className={styles.block}>
                <Card className="border border-2 ">
                  <CardBody className={styles.cardBody}>
                    <CardTitle className="text-truncate" tag="h5">
                      {starship.name}
                    </CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted text-truncate"
                    >
                      {starship.model}
                    </CardSubtitle>
                    <CardText className="text-truncate text-uppercase">
                      starship class: <br />
                      {starship.starship_class}
                    </CardText>
                    <CardText className="text-truncate text-uppercase">
                      hyperdrive rating: <br />
                      {starship.hyperdrive_rating}
                    </CardText>
                    <CardText className="text-truncate text-uppercase">
                      passengers: {starship.passengers}
                    </CardText>
                    <CardText className="text-truncate text-uppercase">
                      manufacturer: <br />
                      {starship.manufacturer}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            </div>
          ))}
        </div>
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
