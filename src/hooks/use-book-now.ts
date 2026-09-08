import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/data/productData";
import { trackAddToCart } from "@/lib/metaPixel";

/**
 * Handler for the "Book Now" CTAs: seeds the cart with the featured product
 * and sends the visitor to the cart, so the button never lands them on an
 * empty cart page.
 */
export const useBookNow = () => {
  const navigate = useNavigate();
  const { items, addToCart } = useCart();

  // The catalog holds a single product today. If more are added, mark one as
  // featured here rather than relying on array order.
  const featuredProduct = getAllProducts()[0];

  return () => {
    if (featuredProduct) {
      // Clicking twice should not push the quantity to 2.
      const isAlreadyInCart = items.some(
        (item) => item.product.id === featuredProduct.id,
      );

      if (!isAlreadyInCart) {
        addToCart(featuredProduct, 1);
        trackAddToCart(featuredProduct, 1);
      }
    }

    navigate("/cart");
  };
};
