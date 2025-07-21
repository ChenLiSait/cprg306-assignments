export default function Item({ name, quantity, category }) {
    return (
        <li className="bg-pink-600 p-4 rounded-lg shadow-md hover:bg-pink-400 transition-colors">
        <h3>{name}</h3>
        <p>Quantity: {quantity}</p>
        <p>Category: {category}</p>
        </li>
    );
    }