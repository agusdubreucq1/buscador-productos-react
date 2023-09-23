import { useEffect, useState } from "react";

const api = `https://fakestoreapi.com/products`;

export function useProducts({ search }) {
  const [products, setProducts] = useState([]);

  //   useEffect(()=>{
  //     getAllProducts()
  //   }, [search])

  const getAllProducts = () => {
    fetch(api)
      .then((res) => res.json())
      .then((json) => {
        const jsonSearch = json.filter((product) =>
          product.title.toUpperCase().startsWith(search.toUpperCase())
        );
        setProducts(jsonSearch);
      });
  };

  return { getAllProducts, products };
}
