import { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedMenuName, setSelectedMenuName] = useState("");
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://foodie-check.onrender.com/menus/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Failed to fetch menus", err));
  }, []);
const fetchItems = async (menuId, menuName) => {
  setSelectedMenuId(menuId);
  setSelectedMenuName(menuName);
  try {
    const res = await axios.get(
      `https://foodie-check.onrender.com/menus/${menuId}/getitems`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setItems(res.data || []); 
  } catch (err) {
    console.error("Failed to fetch items", err);
    setItems([]);
  }
};


  return (
    <div className="pt-20 min-h-screen bg-gray-950 text-white py-10 px-4">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10">
        Our Menus
      </h1>

      {/* Menu Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {menus.map((menu) => (
          <button
            key={menu._id}
            onClick={() => fetchItems(menu._id, menu.name)}
            className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 border-2 ${
              selectedMenuId === menu._id
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-gray-800 text-white border-gray-700 hover:bg-yellow-300 hover:text-black"
            }`}
          >
            {menu.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      {selectedMenuId && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
            {selectedMenuName} Items
          </h2>

          {items.length === 0 ? (
            <p className="text-center text-gray-400">
              No items found for this menu.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800 rounded-lg p-5 shadow hover:shadow-yellow-400/30 transition"
                >
                  <h3 className="text-xl font-bold text-yellow-200 mb-2">{item.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  <p className="text-yellow-400 font-bold text-right text-lg">₹ {item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;


