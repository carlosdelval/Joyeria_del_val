import { createContext, useContext, useState } from "react";
import FlyToAnimation from "../components/FlyToAnimation";

const FlyAnimationContext = createContext();

export const useFlyAnimation = () => {
  const context = useContext(FlyAnimationContext);
  if (!context) {
    throw new Error("useFlyAnimation must be used within FlyAnimationProvider");
  }
  return context;
};

export const FlyAnimationProvider = ({ children }) => {
  const [flyingItems, setFlyingItems] = useState([]);

  const addFlyingItem = (item) => {
    const newItem = {
      ...item,
      id: `${Date.now()}-${Math.random()}`,
    };
    setFlyingItems((prev) => [...prev, newItem]);
  };

  const removeFlyingItem = (id) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const flyToCart = (productImage, productName, startElement) => {
    addFlyingItem({
      type: "cart",
      image: productImage,
      name: productName,
      startElement,
    });
  };

  const flyToWishlist = (productImage, productName, startElement) => {
    addFlyingItem({
      type: "wishlist",
      image: productImage,
      name: productName,
      startElement,
    });
  };

  return (
    <FlyAnimationContext.Provider value={{ flyToCart, flyToWishlist }}>
      {children}
      <FlyToAnimation items={flyingItems} onComplete={removeFlyingItem} />
    </FlyAnimationContext.Provider>
  );
};
