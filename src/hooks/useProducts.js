import { useEffect, useState } from "react";

const api = `https://fakestoreapi.com/products`;

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //   useEffect(()=>{
  //     getAllProducts()
  //   }, [search])

  const getAllProducts = ({search, minPrice}) => {
    setLoading(true);
    console.log(search, minPrice)
    fetch(api)
      .then((res) => res.json())
      .then((json) => {
        let jsonSearch = json.filter((product) =>
          product.title.toUpperCase().startsWith(search.toUpperCase())
        );
        minPrice ? jsonSearch = jsonSearch.filter(product => product.price > minPrice) : jsonSearch;
        setLoading(false);
        setProducts(jsonSearch);
        
      })
  };

  return { getAllProducts, products, loading};
}
