import React, { useState } from 'react';

const products = [
  { id: 1, name: "Blue T-Shirt", category: "Clothing", price: 150, in_stock: true },
  { id: 2, name: "Black Jeans", category: "Clothing", price: 300, in_stock: false },
  { id: 3, name: "Red Sneakers", category: "Shoes", price: 500, in_stock: true },
  { id: 4, name: "Wireless Mouse", category: "Accessories", price: 250, in_stock: true },
  { id: 5, name: "Office Chair", category: "Furniture", price: 1200, in_stock: false },
  { id: 6, name: "White Shirt", category: "Clothing", price: 180, in_stock: true },
  { id: 7, name: "Running Shoes", category: "Shoes", price: 800, in_stock: true },
  { id: 8, name: "Laptop Bag", category: "Accessories", price: 450, in_stock: false },
  { id: 9, name: "Desk Lamp", category: "Furniture", price: 320, in_stock: true },
  { id: 10, name: "Green Hoodie", category: "Clothing", price: 250, in_stock: true }
];

const SearchBar = ({ search_query, set_search_query, selected_category, set_selected_category, show_in_stock_only, set_show_in_stock_only }) => {
  return (
    <div>
      <div>
        <label>Search by Name:</label>
        <br />
        <input
          type="text"
          value={search_query}
          onChange={(e) => set_search_query(e.target.value)}
          placeholder="Type product name..."
        />
      </div>
      <br />
      
      <div>
        <label>Filter by Category:</label>
        <br />
        <select
          value={selected_category}
          onChange={(e) => set_selected_category(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
      <br />
      
      <div>
        <input
          type="checkbox"
          checked={show_in_stock_only}
          onChange={(e) => set_show_in_stock_only(e.target.checked)}
        />
        <label>Show only in-stock items</label>
      </div>
      <br />
    </div>
  );
};

const ProductItem = ({ product }) => {
  return (
    <li>
      <strong>{product.name}</strong>
      <br />
      Category: {product.category}
      <br />
      Price: R{product.price}
      <br />
      Status: {product.in_stock ? 'In Stock' : 'Out of Stock'}
      <br />
      <br />
    </li>
  );
};

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <p>Showing {products.length} products:</p>
      <ul>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [search_query, set_search_query] = useState('');
  const [selected_category, set_selected_category] = useState('All');
  const [show_in_stock_only, set_show_in_stock_only] = useState(false);

  const filtered_products = products.filter(product => {
    const matches_search = product.name.toLowerCase().includes(search_query.toLowerCase());
    const matches_category = selected_category === 'All' || product.category === selected_category;
    const matches_stock = !show_in_stock_only || product.in_stock;
    
    return matches_search && matches_category && matches_stock;
  });

  return (
    <div>
      <h1>Product Catalog</h1>
      
      <SearchBar 
        search_query={search_query}
        set_search_query={set_search_query}
        selected_category={selected_category}
        set_selected_category={set_selected_category}
        show_in_stock_only={show_in_stock_only}
        set_show_in_stock_only={set_show_in_stock_only}
      />

      <ProductList products={filtered_products} />
    </div>
  );
}

export default App;
