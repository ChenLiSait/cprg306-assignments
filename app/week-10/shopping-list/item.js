export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={() => onSelect?.()}
      className="cursor-pointer mb-2 hover:bg-gray-100 p-2 rounded"
    >
      <span className="font-semibold capitalize">{name}</span> -{" "}
      <span>Quantity: {quantity}</span> -{" "}
      <span className="italic text-gray-600">{category}</span>
    </li>
  );
}
