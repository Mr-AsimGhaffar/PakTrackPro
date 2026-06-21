import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPrice, getProductBySlug } from "@/data/productData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-container pt-28 pb-20">
          <div className="card-elevated max-w-xl mx-auto p-8 text-center">
            <h1 className="font-display text-3xl text-foreground mb-3">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The product you are looking for does not exist or was removed.
            </p>
            <Link to="/" className="btn-primary inline-flex">
              Back To Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-container pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.src = "/pak-track.jpg";
              }}
            />
          </div>

          <div>
            <p className="text-sm text-primary font-medium mb-2">
              Pak Track Pro
            </p>
            <h1 className="font-display text-3xl sm:text-4xl mb-4 text-foreground">
              {product.name}
            </h1>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <p className="text-2xl sm:text-3xl font-semibold text-primary mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="mb-6">
              <p className="font-medium text-foreground mb-3">Specifications</p>
              <ul className="space-y-2">
                {product.specifications.map((spec) => (
                  <li
                    key={spec.label}
                    className="flex justify-between gap-4 border-b border-border pb-2 text-sm"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="text-foreground font-medium text-right">
                      {spec.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="inline-flex items-center border border-border rounded-lg">
                <button
                  type="button"
                  className="p-2 hover:bg-accent rounded-l-lg"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  className="p-2 hover:bg-accent rounded-r-lg"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                className="btn-primary inline-flex items-center gap-2"
                onClick={() => {
                  addToCart(product, quantity);
                  toast({
                    title: "Added to cart",
                    description: `${product.name} x${quantity} has been added to your cart.`,
                  });
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add To Cart
              </button>
            </div>

            <Link to="/cart" className="text-sm text-primary hover:underline">
              Go to Cart
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
