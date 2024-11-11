import { ItemCard } from "./ItemCard";
import { motion } from "framer-motion";

type Item = {
  id: number;
  name: string;
  category: string;
  parLevel: number;
  image: string;
  visible: boolean;
  currentQuantity: number;
};

type CategorySectionProps = {
  category: string;
  items: Item[];
  toggleVisibility: (id: number) => void;
  setItemToDelete: (id: number) => void;
  setIsDeleteConfirmOpen: (isOpen: boolean) => void;
};

export const CategorySection = ({
  category,
  items,
  toggleVisibility,
  setItemToDelete,
  setIsDeleteConfirmOpen,
}: CategorySectionProps) => (
  <motion.div
    key={category}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-xl font-semibold mt-4 mb-2">{category}</h2>
    {items.map((item) => (
      <ItemCard
        key={item.id}
        item={item}
        toggleVisibility={toggleVisibility}
        setItemToDelete={setItemToDelete}
        setIsDeleteConfirmOpen={setIsDeleteConfirmOpen}
      />
    ))}
  </motion.div>
);
