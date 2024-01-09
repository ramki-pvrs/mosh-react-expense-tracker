import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  category: string;
}

//insted of interface, inline props is also possible
//the {category : string} is the definition of props
//like function ProductList({category}: {category: string})

function ProductList({ category }: Props) {
  const [products, setProducts] = useState<string[]>([]);

  //callBack function; react to call back to load the products list from somewhere
  //the second argument to useEffect [category] is dependencies array
  //for the useEffect to kick-in; the array may contain more than on dependency
  //if the dependency array is empty array [], the side effect (ueEffect) will be done only once
  //on first time component is rendered, not infinite times
  //if you dont have it component is rendered, useEffect will kick-in because of that change
  //component will be rendered again, useEffect again .... infinite loop

  //useEffect reset is possible; for example if user moves away from chat
  //chat window should be disconnected

  //clean-up code is a function inside useEffect;

  const connect = () => console.log("Connecting...");
  const disconnect = () => console.log("Disconnected");
  useEffect(() => {
    connect();

    return () => disconnect();
  });

  //in console you will see Connecting, Disconnected, Connecting
  //because of strict mode, react will render twice the Connecting
  //but before it renders second time, it un-mounts the component first
  //mount and un-mount of react rendering actions

  useEffect(() => {
    //fectch the products from server;

    console.log("Fetching products in ", category);
    //Fetching products in  Clothing ProductList.tsx:19:12
    //Fetching products in  Household based on selected category
    setProducts(["Clothing", "Household"]);
  }, [category]);

  return (
    <div>
      <h1>Product List</h1>
    </div>
  );
}

export default ProductList;
