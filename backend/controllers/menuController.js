const store = require('../data/store');

const getMenu = async (req, res) => {
  try {
    const menu = await store.getMenu();
    res.json({ success: true, count: menu.length, data: menu });
  } catch (error) {
    console.error('getMenu error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menu' });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { name, category, price, portion } = req.body;
    if (!name || !category || price === undefined || !portion) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, price, and portion are required',
      });
    }

    const item = {
      id: req.body.id || `m${Date.now()}`,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description || '',
      price: Number(req.body.price),
      halfPrice: req.body.halfPrice ? Number(req.body.halfPrice) : undefined,
      portion: req.body.portion,
      ingredients: Array.isArray(req.body.ingredients)
        ? req.body.ingredients
        : req.body.ingredients
        ? req.body.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      image: req.body.image || '/assets/thali.jpg',
      available: req.body.available !== false,
    };

    const saved = await store.addMenuItem(item);
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('createMenuItem error:', error);
    res.status(500).json({ success: false, message: 'Failed to create menu item' });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.price) updates.price = Number(updates.price);
    if (updates.halfPrice !== undefined) updates.halfPrice = updates.halfPrice ? Number(updates.halfPrice) : undefined;
    if (typeof updates.ingredients === 'string') {
      updates.ingredients = updates.ingredients.split(',').map((s) => s.trim()).filter(Boolean);
    }

    const updated = await store.updateMenuItem(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('updateMenuItem error:', error);
    res.status(500).json({ success: false, message: 'Failed to update menu item' });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await store.deleteMenuItem(id);
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('deleteMenuItem error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete menu item' });
  }
};

module.exports = {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
