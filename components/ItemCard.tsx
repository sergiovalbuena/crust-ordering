import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Trash2 } from "lucide-react";
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

type ItemCardProps = {
  item: Item;
  toggleVisibility: (id: number) => void;
  setItemToDelete: (id: number) => void;
  setIsDeleteConfirmOpen: (isOpen: boolean) => void;
};

export const ItemCard = ({
  item,
  toggleVisibility,
  setItemToDelete,
  setIsDeleteConfirmOpen,
}: ItemCardProps) => (
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
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-sm">Par Level: {item.parLevel}</p>
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
);
