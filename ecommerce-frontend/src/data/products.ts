


// src/data/products.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 75000,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 35000,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Headphones",
    price: 3000,
    image: "https://via.placeholder.com/200",
  },
];

export default products;
