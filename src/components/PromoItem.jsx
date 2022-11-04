import "./PromoItem.scss";

const PromoItem = ({ item, height, isWide = false }) => {
  return (
    <div className="promo-item" style={{ height: `${height}px` }}>
      <p>PromoItem #{item.id}</p>
      <p>{isWide ? "WIDE" : "NOT WIDE"}</p>
    </div>
  );
};

export default PromoItem;
