"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

const items = [
  { type: "rock", icon: "🪨" },
  { type: "flower", icon: "🌸" },
  { type: "tree", icon: "🌲" },
  { type: "bamboo", icon: "🎋" },
];

export function ZenGarden() {
  const [placedItems, setPlacedItems] = useState<
    Array<{
      type: string;
      icon: string;
      x: number;
      y: number;
    }>
  >([]);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPlacedItems([...placedItems, { ...selectedItem, x, y }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        {items.map((item) => (
          <motion.button
            key={item.type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedItem(item)}
            className={`p-3 rounded-lg ${
              selectedItem.type === item.type ? "bg-primary/20" : "bg-primary/5"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
          </motion.button>
        ))}
      </div>

      <div
        onClick={handleCanvasClick}
        className="relative w-full h-[400px] bg-primary/5 rounded-lg cursor-pointer overflow-hidden"
      >
        {placedItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: "absolute",
              left: item.x - 12,
              top: item.y - 12,
            }}
            className="text-2xl"
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
