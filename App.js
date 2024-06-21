import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]); // la lista degli oggetti é un array dunque ho bisogno di un array vuoto per modificarla

  function handleAddItems(item) {
    // in React non posso modificare lo stato. Dunque creo un nuovo [], spreado gli elementi che ho giá e inserisco quelli nuovi che passo all'interno della funzione
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeliteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🧳 Far Away ✈️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescrption] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescrption("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {" "}
      <h3>What do you need for your trip? 🦘</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(+e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescrption(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeliteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeliteItem={onDeliteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          /> //key dev'essere un valore unico
        ))}
      </ul>
    </div>
  );
}

// Passo come prop item che é ció che ho scelto nella funzione PackingList con il metodo map cosí saranno collegate

function Item({ item, onDeliteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeliteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you have already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
