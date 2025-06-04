const Menu=require('../Models/Menu');
const MenuItem=require('../Models/MenuItem');


// Create new menu
exports.createMenu = async (req, res) => {
  try {
    const { name, description } = req.body;
    const menu = new Menu({ name, description });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//add item to a menu


exports.addMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, description, price } = req.body;

    const newItem = new MenuItem({
      menuId,
      name,
      description,
      price,
    });

    await newItem.save();

    res.status(200).json({ message: "Item added successfully!", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item", error: err.message });
  }
};


// Get all items of a menu
exports.getMenuItems = async (req, res) => {
  try {
    const menuId = req.params.menuId; 
    const items = await MenuItem.find({ menuId }); 
    res.json(items); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};


//get menu for creating an menuitem
   exports.getMenuById = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menu", error: err.message });
  }
};
