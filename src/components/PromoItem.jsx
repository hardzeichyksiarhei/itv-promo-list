import "./PromoItem.scss";

const PromoItem = ({ item, width, height, isWide = false }) => {
  return (
    <div
      className="promo-item"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <p>PromoItem #{item.id - 1}</p>
      <p>{isWide ? "WIDE" : "NOT WIDE"}</p>
    </div>
  );
};

export default PromoItem;
