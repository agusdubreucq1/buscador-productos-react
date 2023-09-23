import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../components/product";
import "../styles/index.css";

export function Index() {
  const [search, setSearch] = useState("");
  const { getAllProducts, products } = useProducts({ search: search });

  useEffect(() => {
    getAllProducts();
  }, [search]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const campos = new window.FormData(e.target);
    const newSearch = campos.get("query");
    console.log(newSearch);
    setSearch(newSearch);
  };

  return (
    <>
      <section>
        <form className="formBusqueda" onSubmit={handlerSubmit}>
          <input
            name="query"
            placeholder="buscar producto"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button type="submit">BUSCAR</button>
        </form>
        <div className="container-products">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                title={product.title}
                price={product.price}
                img={product.image}
              ></Product>
            );
          })}
        </div>
      </section>
    </>
  );
}
