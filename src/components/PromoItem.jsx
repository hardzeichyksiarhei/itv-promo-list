import "./PromoItem.scss";

const PromoItem = ({ item, height, isWide = false }) => {
  const getStyles = () => {
    const styles = { height: `${height}px` };

    if (isWide) styles.backgroundColor = "#000";

    return styles;
  };
  return (
    <div className="promo-item" style={getStyles()}>
      {!isWide && <p>PromoItem #{item.id - 1}</p>}
      {!isWide && <p>{isWide ? "WIDE" : "NOT WIDE"}</p>}
    </div>
  );
};

export default PromoItem;
