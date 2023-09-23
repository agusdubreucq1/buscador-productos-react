import { useEffect, useState } from "react";

const api = `https://fakestoreapi.com/products`;

export function useProducts() {
  const [products, setProducts] = useState([]);

  //   useEffect(()=>{
  //     getAllProducts()
  //   }, [search])

  const getAllProducts = ({search}) => {
    console.log(search)
    fetch(api)
      .then((res) => res.json())
      .then((json) => {
        const jsonSearch = json.filter((product) =>
          product.title.toUpperCase().startsWith(search.toUpperCase())
        );
        setProducts(jsonSearch);
      })
  };

  return { getAllProducts, products };
}
