import { useCallback, useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../components/product";
import "../styles/index.css";
import debounce from "just-debounce-it";

const TIME_WRITE=300;

export function Index() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice]= useState(0);
  const { getAllProducts, products, loading } = useProducts();

  useEffect(() => {
    getAllProducts({ search: search, minPrice: minPrice });
  }, []);

  const debounceGetProducts = useCallback(
    debounce((search, minPrice) => {
      getAllProducts({ search, minPrice });
    }, TIME_WRITE),
    []
  );

  const handlerChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debounceGetProducts(newSearch, minPrice);
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

  const handlerChangeMinPrice = (e)=>{
    const value = e.target.value;
    setMinPrice(value);
    debounceGetProducts(search,value)
  }

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
          <input max={500} type='range' name='minPrice' value={minPrice} onChange={handlerChangeMinPrice}></input>
          <label className="label-minPrice">min price: {minPrice}</label>
          <button type="submit">BUSCAR</button>
        </form>
        {loading ? <div className="loading"><p>cargando...</p></div> : <div className="container-products">
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
        </div>}
      </section>
    </>
  );
}
