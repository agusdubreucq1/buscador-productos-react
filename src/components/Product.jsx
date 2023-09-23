import "../styles/Product.css";

export function Product({ title, price, img }) {
  return (
    <div className="product">
      <p>{title}</p>
      <p>precio: {price}</p>
      <img src={img}></img>
    </div>
  );
}
