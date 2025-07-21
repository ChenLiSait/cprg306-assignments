import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="max-w-2xl mx-auto p-4 bg-pink-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">Shopping List</h1>
            
                <ul className="bg-pink-700 text-pink-100 m-4 p-4 rounded-lg shadow-lg space-y-4 text-left">
                    <ItemList />
                </ul>
            
        </main>
    );
}