import React from "react";
import "./PromoItem.scss";

const PromoItem = React.memo(
  ({ item, inTransitionDuration, width, height, isWide = false }) => {
    const getStyles = () => {
      const styles = {
        transitionDuration: `${inTransitionDuration / 1000}s`,
        width: `${width}px`,
        height: `${height}px`,
      };

      return styles;
    };
    return (
      <div className="promo-item" style={getStyles()}>
        <p>PromoItem #{item.id - 1}</p>
        <p>{isWide ? "WIDE" : "NOT WIDE"}</p>
      </div>
    );
  }
);

export default PromoItem;
