"use client";

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Trash2, Plus, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  id: number;
  name: string;
  category: string;
  parLevel: number;
  image: string;
  visible: boolean;
  currentQuantity: number;
};

// type Order = {
//   id: number
//   date: string
//   items: { itemId: number; quantity: number }[]
// }

const categories = [
  "Flour & Baking Supplies",
  "Dairy & Eggs",
  "Chocolate & Sweets",
  "Fruits & Fillings",
  "Packaging",
];

export function BakeryOrderManagement() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "All-Purpose Flour",
      category: "Flour & Baking Supplies",
      parLevel: 50,
      image: "https://example.com/flour.jpg",
      visible: true,
      currentQuantity: 30,
    },
    {
      id: 2,
      name: "Eggs",
      category: "Dairy & Eggs",
      parLevel: 100,
      image: "https://example.com/eggs.jpg",
      visible: true,
      currentQuantity: 80,
    },
    {
      id: 3,
      name: "Chocolate Chips",
      category: "Chocolate & Sweets",
      parLevel: 25,
      image: "https://example.com/chocolate-chips.jpg",
      visible: true,
      currentQuantity: 10,
    },
  ]);
  const [newItem, setNewItem] = useState<
    Omit<Item, "id" | "visible" | "currentQuantity">
  >({
    name: "",
    category: "",
    parLevel: 0,
    image: "",
  });
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<"light" | "dark" | "auto">("auto");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (darkMode === "auto") {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemPreference);
    } else {
      root.classList.add(darkMode);
    }
  }, [darkMode]);

  const addItem = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, id: Date.now(), visible: true, currentQuantity: 0 },
    ]);
    setNewItem({ name: "", category: "", parLevel: 0, image: "" });
    setIsAddItemOpen(false);
  }, [newItem]);

  const deleteItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setIsDeleteConfirmOpen(false);
  }, []);

  const toggleVisibility = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  }, []);

  const updateCurrentQuantity = useCallback((id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, currentQuantity: quantity } : item
      )
    );
  }, []);

  const groupItemsByCategory = useCallback(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, Item[]>);
  }, [items]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bakery Order Management</h1>
        <Select
          value={darkMode}
          onValueChange={(value: "light" | "dark" | "auto") =>
            setDarkMode(value)
          }
        >
          <SelectTrigger className="w-[40px] px-2">
            <SelectValue
              placeholder={
                darkMode === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <Sun className="mr-2 h-4 w-4" />
            </SelectItem>
            <SelectItem value="dark">
              <Moon className="mr-2 h-4 w-4" />
            </SelectItem>
            <SelectItem value="auto">Auto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="todo">To Do Orders</TabsTrigger>
          <TabsTrigger value="inventory">
            Inventory and Order Creation
          </TabsTrigger>
        </TabsList>
        <TabsContent value="todo">
          <div className="space-y-4">
            <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background text-foreground">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Par Level"
                    value={newItem.parLevel}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        parLevel: Number(e.target.value),
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                  />
                </div>
                <DialogFooter>
                  <Button onClick={addItem}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AnimatePresence>
              {Object.entries(groupItemsByCategory()).map(
                ([category, categoryItems]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 className="text-xl font-semibold mt-4 mb-2">
                      {category}
                    </h2>
                    {categoryItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 mb-2">
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-4">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                              )}
                              <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {item.category}
                                </p>
                                <p className="text-sm">
                                  Par Level: {item.parLevel}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleVisibility(item.id)}
                              >
                                {item.visible ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setItemToDelete(item.id);
                                  setIsDeleteConfirmOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
        <TabsContent value="inventory">
          <div className="space-y-4">
            {Object.entries(groupItemsByCategory()).map(
              ([category, categoryItems]) => (
                <div key={category}>
                  <h2 className="text-xl font-semibold mt-4 mb-2">
                    {category}
                  </h2>
                  {categoryItems
                    .filter((item) => item.visible)
                    .map((item) => (
                      <Card
                        key={item.id}
                        className="shadow-md hover:shadow-lg transition-shadow duration-300 mb-2"
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-4">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded"></div>
                            )}
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-sm text-gray-500">
                                {item.category}
                              </p>
                              <p className="text-sm">
                                Par Level: {item.parLevel}
                              </p>
                            </div>
                          </div>
                          <Input
                            type="number"
                            placeholder="Current quantity"
                            onChange={(e) =>
                              updateCurrentQuantity(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                            className="w-24"
                          />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )
            )}
            <Button onClick={() => setIsCreateOrderOpen(true)}>
              Create Order
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this item?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => itemToDelete && deleteItem(itemToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen}>
        <DialogContent className="max-w-3xl bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Order Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {Object.entries(groupItemsByCategory()).map(
              ([category, categoryItems]) => (
                <div key={category}>
                  <h2 className="text-xl font-semibold mt-4 mb-2">
                    {category}
                  </h2>
                  {categoryItems
                    .filter((item) => item.visible)
                    .map((item) => {
                      const orderQuantity = Math.max(
                        0,
                        item.parLevel - item.currentQuantity
                      );
                      return (
                        <Card key={item.id} className="shadow-sm mb-2">
                          <CardContent className="flex items-center justify-between p-4">
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <p>Par Level: {item.parLevel}</p>
                              <p>Current Quantity: {item.currentQuantity}</p>
                              <p className="font-bold">
                                Order Quantity: {orderQuantity}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsCreateOrderOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
