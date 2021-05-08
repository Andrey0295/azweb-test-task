import React from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import styles from "./StarshipCard.module.css";

type StarshipCardProps = {
  starshipsData: Array<any>;
};

const StarshipCard: React.FC<StarshipCardProps> = ({ starshipsData }) => {
  return (
    <div className="text-center text-truncate row row-cols-md-3 row-cols-lg-4 row-cols-sm-2  g-0  mx-auto">
      {starshipsData.map((starship) => (
        <div className="col " key={starship.name}>
          <div className={styles.block}>
            <Card className="border border-2 border-danger ">
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
  );
};

export default StarshipCard;
