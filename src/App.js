import { useState } from "react";
import "./index.css";
import data from "./data.js";

export default function App() {
  const [items, setItems] = useState(data);

  const [showItemPage, setShowItemPage] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);

  function handleAddProduct(item) {
    setItems((items) => [...items, item]);
    console.log(item.product);
    console.log(items);
  }

  function handleShowItemsPage() {
    setShowItemPage((show) => !show);
  }
  // function handleSelection() {
  //   setItems(items === selectedItem ? items : null);
  //   console.log("what");
  // }
  // console.log(showItemPage);

  return (
    <div className="app">
      <div className="shopping-list-app">
        <Header />
        <AddProduct
          onShowItemsPage={handleShowItemsPage}
          onAddItem={handleAddProduct}
        />
        <Main showItemPage={showItemPage} items={items}>
          <Btn>Select</Btn>
        </Main>
        <Footer />
      </div>
    </div>
  );
}

function Btn({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Shopping List </h1>
    </header>
  );
}
function AddProduct({ onShowItemsPage, onAddItem }) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const image = "https://i.pravatar.cc/48";
  function handleItemsPage() {
    console.log("clicked");
    onShowItemsPage(false);
  }
  const id = crypto.randomUUID();
  let newItem = {
    id,
    product,
    image: `${image}?=${id}`,
    quantity,
  };
  function handleAddNewProduct() {
    if (!product || !quantity) return;
    onAddItem(newItem);

    setProduct("");
    setQuantity(1);

    // console.log(newItem.image);
  }

  return (
    <div className="add-item">
      <label>What Item do you want to Add ? </label>
      <select
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="select"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        className="input"
        type="text"
        placeholder="Add a new item..."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      ></input>
      <Btn className="button" onClick={() => handleAddNewProduct()}>
        Add Item
      </Btn>
      <Btn onClick={() => handleItemsPage()} className="button">
        Items Card
      </Btn>
    </div>
  );
}
function Main({ showItemPage, items }) {
  return (
    <div>
      {showItemPage && <ItemsPage />}
      <ShoppingProducts items={items} />
    </div>
  );
}
function ShoppingProducts({ items }) {
  return (
    <div>
      <h1>Pick Products</h1>
      <ul className="item-list" style={{ backgroundColor: "#f89930" }}>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      <ul></ul>
    </div>
  );
}

function ItemsPage() {
  return <ul className="item-list"></ul>;
}

function Item({ item }) {
  const [deleteItem, setDeleteItem] = useState(false);
  function handleDeleteItem() {
    console.log("delete");
  }
  console.log(item);
  return (
    <li className="item">
      <img className="item-image" src={item.image} alt={item.product} />
      <h3>{item.product} </h3>
      <h3>{item.quantity} </h3>
      <div className="item-actions">
        <input className="checkbox" type="checkbox"></input>
        <Btn className="edit-btn">Add to card</Btn>
        <Btn onClick={() => handleDeleteItem()} className="delete-btn">
          Delete
        </Btn>
      </div>
    </li>
    // <li className="item">
    //   <span className="item-name">T-Shirt(item) </span>
    //   <div className="item-actions">
    //     <input className="checkbox" type="checkbox"></input>
    //     <button className="edit-btn">Edit</button>
    //     <button className="delete-btn">Delete</button>
    //   </div>
    // </li>
  );
}
function Footer() {
  return (
    <div className="list-footer">
      <span className="item-counter"> 1 Items</span>
    </div>
  );
}
