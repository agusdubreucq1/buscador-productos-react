import "../styles/Product.css";

export function Product({ title, price, img }) {
  return (
    <div className="product">
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="container-img">
        <img src={img}></img>
      </div>
      <p className="price">$ {price}</p>
    </div>
  );
}
