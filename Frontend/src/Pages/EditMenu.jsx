import { useEffect, useState, useRef } from "react";
import axios from "axios";

const EditMenu = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);


  const menuNameRef = useRef();
  const menuDescRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    loadMenus();
  }, []);

  useEffect(() => {
    if (selectedMenuId) {
      loadMenuDetails(selectedMenuId);
    }
  }, [selectedMenuId]);

  const loadMenus = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:5005/menus/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenus(data);
      if (data.length > 0) {
        setSelectedMenuId(data[data.length - 1]._id);
      }
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    }
  };

  const loadMenuDetails = async (menuId) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.get(
      `http://localhost:5005/menus/${menuId}/getitems`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setItems(data.items || []); 
  } catch (error) {
    console.error("Failed to fetch menu details:", error);
  }
};


  const handleCreateMenu = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newMenu = {
      name: menuNameRef.current.value,
      description: menuDescRef.current.value,
    };

    try {
      const { data } = await axios.post("http://localhost:5005/menus/create", newMenu, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Menu created successfully!");
      menuNameRef.current.value = "";
      menuDescRef.current.value = "";

      setMenus((prev) => [...prev, data]);
      setSelectedMenuId(data._id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create menu.");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedMenuId) return alert("Please select a menu.");

    setLoading(true);
    const token = localStorage.getItem("token");

    const priceValue = priceRef.current.value.trim();
    const parsedPrice = Number(priceValue);

    if (!priceValue || isNaN(parsedPrice) || parsedPrice < 0) {
      alert("Please enter a valid price.");
      setLoading(false);
      return;
    }

    const newItem = {
      name: nameRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      price: parsedPrice,
    };

    try {
      const response = await axios.post(
        `http://localhost:5005/menus/${selectedMenuId}/additem`,
        newItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message || "Item added successfully!");

      nameRef.current.value = "";
      descriptionRef.current.value = "";
      priceRef.current.value = "";

      loadMenuDetails(selectedMenuId);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-black text-white p-6">
      {/* Create Menu */}
      <form
        onSubmit={handleCreateMenu}
        className="max-w-xl mx-auto bg-gray-900 p-6 rounded-xl mb-12 space-y-4"
      >
        <h2 className="text-2xl text-yellow-400 font-semibold text-center">
          Create New Menu
        </h2>
        <input
          ref={menuNameRef}
          required
          placeholder="Menu Name"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          ref={menuDescRef}
          required
          placeholder="Menu Description"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
        >
          Add Menu
        </button>
      </form>

      {/* Select Menu */}
      <div className="max-w-xl mx-auto mb-10">
        <label className="block mb-2 text-yellow-300">Select Menu</label>
        <select
          value={selectedMenuId}
          onChange={(e) => setSelectedMenuId(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        >
          {menus.map((menu) => (
            <option key={menu._id} value={menu._id}>
              {menu.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Item */}
      <form
        onSubmit={handleAddItem}
        className="max-w-xl mx-auto bg-gray-900 p-6 rounded-xl mb-12 space-y-4"
      >
        <h2 className="text-2xl text-yellow-300 font-semibold text-center">
          Add Item to {menus.find((menu) => menu._id === selectedMenuId)?.name}
        </h2>
        <input
          ref={nameRef}
          required
          placeholder="Item Name"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          ref={descriptionRef}
          required
          placeholder="Description"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
        <input
          ref={priceRef}
          required
          placeholder="Price"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default EditMenu;
