import { useState, useRef, useEffect } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const previousValue = useRef(null);

  useEffect(() => {
    previousValue.current = description;
  }, [description]);

  // const prevCountRef = usePrevious(null);

  // useEffect(() => {
  //   console.log(prevCountRef, description);
  // }, [prevCountRef, description]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return alert("Enter at least one item!");

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h6>
        Prev Value: {previousValue.current} {"    "} Currnt Value:{description}
      </h6>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
