import { RequestHandler } from "express";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  isVeg?: boolean;
  isSpicy?: boolean;
  isSignature?: boolean;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuResponse {
  success: boolean;
  message: string;
  items?: MenuItem[];
  item?: MenuItem;
}

// In-memory storage for demo (replace with database in production)
let menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Butterfly Garden Special Pasta",
    description: "Fresh handmade pasta with truffle oil and wild mushrooms",
    price: 1800,
    category: "Main Course",
    available: true,
    isVeg: true,
    isSpicy: false,
    isSignature: true,
    tags: ["Signature", "Popular"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Golden Sunset Salmon",
    description: "Pan-seared Atlantic salmon with citrus glaze",
    price: 2400,
    category: "Seafood",
    available: true,
    isVeg: false,
    isSpicy: false,
    isSignature: true,
    tags: ["Premium", "Heart Healthy"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Royal Butter Chicken",
    description:
      "Tender chicken in rich tomato cream sauce with aromatic spices",
    price: 2200,
    category: "North Indian",
    available: true,
    isVeg: false,
    isSpicy: true,
    isSignature: false,
    tags: ["Spicy", "Popular"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Crispy Chicken Burger",
    description:
      "Juicy fried chicken breast with lettuce, tomato, and special sauce",
    price: 1450,
    category: "Fast Food",
    available: true,
    isVeg: false,
    isSpicy: false,
    isSignature: false,
    tags: ["Quick Bite", "Popular"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let menuCounter = 5;

// Get all menu items
export const getAllMenuItems: RequestHandler = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Menu items retrieved successfully",
      items: menuItems.sort(
        (a, b) =>
          new Date(b.updatedAt || 0).getTime() -
          new Date(a.updatedAt || 0).getTime(),
      ),
    } as MenuResponse);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      items: [],
    } as MenuResponse);
  }
};

// Create new menu item
export const createMenuItem: RequestHandler = async (req, res) => {
  try {
    const itemData: Omit<MenuItem, "id" | "createdAt" | "updatedAt"> = req.body;

    // Validate required fields
    if (
      !itemData.name ||
      !itemData.description ||
      !itemData.price ||
      !itemData.category
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, description, price, category",
      } as MenuResponse);
    }

    const newItem: MenuItem = {
      ...itemData,
      id: (menuCounter++).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    menuItems.push(newItem);

    res.json({
      success: true,
      message: "Menu item created successfully",
      item: newItem,
    } as MenuResponse);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as MenuResponse);
  }
};

// Update menu item
export const updateMenuItem: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates: Partial<MenuItem> = req.body;

    const itemIndex = menuItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      } as MenuResponse);
    }

    menuItems[itemIndex] = {
      ...menuItems[itemIndex],
      ...updates,
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      message: "Menu item updated successfully",
      item: menuItems[itemIndex],
    } as MenuResponse);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as MenuResponse);
  }
};

// Delete menu item
export const deleteMenuItem: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const itemIndex = menuItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      } as MenuResponse);
    }

    const deletedItem = menuItems.splice(itemIndex, 1)[0];

    res.json({
      success: true,
      message: "Menu item deleted successfully",
      item: deletedItem,
    } as MenuResponse);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as MenuResponse);
  }
};

// Toggle menu item availability
export const toggleMenuItemAvailability: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const itemIndex = menuItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      } as MenuResponse);
    }

    menuItems[itemIndex].available = !menuItems[itemIndex].available;
    menuItems[itemIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: `Menu item ${menuItems[itemIndex].available ? "enabled" : "disabled"} successfully`,
      item: menuItems[itemIndex],
    } as MenuResponse);
  } catch (error) {
    console.error("Error toggling menu item availability:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    } as MenuResponse);
  }
};
