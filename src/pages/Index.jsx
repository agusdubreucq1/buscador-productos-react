import { useCallback, useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../components/product";
import "../styles/index.css";
import debounce from "just-debounce-it";

export function Index() {
  const [search, setSearch] = useState("");
  const { getAllProducts, products } = useProducts();

  useEffect(() => {
    getAllProducts({ search: search });
  }, []);


  const handlerChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    getAllProducts({ search: newSearch });
    // si hacia getAllProducts({search: search}),
    // al custumhook le llega el valor anterior xq el 
    //seteo es ASINCRONO
  };

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
            onChange={handlerChange}
            value={search}
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
