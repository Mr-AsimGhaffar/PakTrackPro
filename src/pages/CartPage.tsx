import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPrice, SHIPPING_COST_PKR } from "@/data/productData";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const {
    items,
    subtotal,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const shippingCost = items.length > 0 ? SHIPPING_COST_PKR : 0;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-container pt-28 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground">
            Your Cart
          </h1>
          {items.length > 0 ? (
            <button
              type="button"
              className="text-sm text-destructive hover:underline"
              onClick={clearCart}
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {items.length === 0 ? (
          <div className="card-elevated p-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Explore our products and add what you need before checkout.
            </p>
            <Link to="/" className="btn-primary inline-flex">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <section className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.product.id}
                  className="card-elevated p-4 sm:p-5"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-muted"
                      onError={(event) => {
                        event.currentTarget.src = "/pak-track.jpg";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Unit Price: {formatPrice(item.product.price)}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-border rounded-lg">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="p-2 hover:bg-accent rounded-l-lg"
                            aria-label={`Decrease quantity for ${item.product.name}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.product.id)}
                            className="p-2 hover:bg-accent rounded-r-lg"
                            aria-label={`Increase quantity for ${item.product.name}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-semibold text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="self-start p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="card-elevated p-6 h-fit lg:sticky lg:top-28">
              <h2 className="font-display text-xl text-foreground mb-4">
                Order Summary
              </h2>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-6 border-t border-border pt-3">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-primary">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center inline-flex justify-center"
                >
                  Proceed To Checkout
                </Link>
                <Link
                  to="/"
                  className="w-full inline-flex justify-center py-3 rounded-xl border border-border hover:bg-accent transition-colors text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
