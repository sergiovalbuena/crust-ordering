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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Sun, Moon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { categories } from "@/data/categories";
import { CategorySection } from "@/components/CategorySection";
import { Card, CardContent } from "./ui/card";

type Item = {
  id: number;
  name: string;
  category: string;
  parLevel: number;
  image: string;
  visible: boolean;
  currentQuantity: number;
};

export function BakeryOrderManagement() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Cake boards - 1/2 slab",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/cake_board_half_slab.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 2,
      name: 'Cake boards - round silver cake 6"',
      category: "Packaging",
      parLevel: 2,
      image: "https://example.com/cake_board_round_6.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 3,
      name: 'Cake boards - round silver cake 10"',
      category: "Packaging",
      parLevel: 3,
      image: "https://example.com/cake_board_round_10.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 4,
      name: 'Cake boards - round silver cake 12"',
      category: "Packaging",
      parLevel: 2,
      image: "https://example.com/cake_board_round_12.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 5,
      name: 'Board Cake Round With Gold Tab 3.25"',
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/cake_board_round_gold_tab.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 6,
      name: "Boxes - 5 x 5 x 5",
      category: "Packaging",
      parLevel: 2,
      image: "https://example.com/box_5x5x5.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 7,
      name: "Boxes - 8 x 8 x 5",
      category: "Packaging",
      parLevel: 2,
      image: "https://example.com/box_8x8x5.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 8,
      name: "Boxes - 10 x 10 x 5 (cake)",
      category: "Packaging",
      parLevel: 4,
      image: "https://example.com/box_10x10x5.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 9,
      name: "Boxes - 12 x 12 x 6",
      category: "Packaging",
      parLevel: 2,
      image: "https://example.com/box_12x12x6.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 10,
      name: "Boxes - 9 x 9 x 4",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/box_9x9x4.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 11,
      name: "Brown 'craft' paper bags 6 x 3 x 11",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/brown_craft_bag_6x3x11.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 12,
      name: "Brown 'craft' paper bags 8 x 5.5 x 10.5",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/brown_craft_bag_8x5.5x10.5.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 13,
      name: "Brown 'craft' paper bags 10 x 5 x 13",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/brown_craft_bag_10x5x13.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 14,
      name: "Brown bag with window",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/brown_bag_window.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 15,
      name: "Clear 80 x 180 bags",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/clear_80x180_bags.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 16,
      name: "Panettone bags with window",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/panettone_bag_window.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 17,
      name: "Panettone bags with ties",
      category: "Packaging",
      parLevel: 3,
      image: "https://example.com/panettone_bag_ties.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 18,
      name: "Paper bag brown with handles",
      category: "Packaging",
      parLevel: 1,
      image: "https://example.com/paper_bag_brown_handles.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 19,
      name: "Silicone baking paper",
      category: "Packaging",
      parLevel: 3,
      image: "https://example.com/silicone_baking_paper.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 20,
      name: "Baking paper 9x11",
      category: "Packaging",
      parLevel: 3,
      image: "https://example.com/baking_paper_9x11.jpg",
      visible: true,
      currentQuantity: 0,
    },
    {
      id: 21,
      name: "Baking paper 25x35.25",
      category: "Packaging",
      parLevel: 3,
      image: "https://example.com/baking_paper_25x35.25.jpg",
      visible: true,
      currentQuantity: 0,
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
                  <CategorySection
                    key={category}
                    category={category}
                    items={categoryItems}
                    toggleVisibility={toggleVisibility}
                    setItemToDelete={setItemToDelete}
                    setIsDeleteConfirmOpen={setIsDeleteConfirmOpen}
                  />
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
