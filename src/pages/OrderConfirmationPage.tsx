import { CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPrice } from "@/data/productData";

type ConfirmationState = {
  customerName?: string;
  email?: string;
  totalAmount?: number;
  itemCount?: number;
};

const OrderConfirmationPage = () => {
  const location = useLocation();
  const state = (location.state || {}) as ConfirmationState;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-container pt-28 pb-20">
        <div className="max-w-2xl mx-auto card-elevated p-8 sm:p-10 text-center">
          <CheckCircle2 className="w-16 h-16 text-success-green mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
            Order Successfully Placed
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. Your Cash on Delivery order has been
            received.
          </p>

          <div className="rounded-xl border border-border p-5 text-left mb-8 bg-background/80">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Info label="Customer Name" value={state.customerName || "N/A"} />
              <Info label="Email" value={state.email || "N/A"} />
              <Info
                label="Total Amount"
                value={
                  typeof state.totalAmount === "number"
                    ? formatPrice(state.totalAmount)
                    : "N/A"
                }
              />
              <Info
                label="Number of Items"
                value={
                  typeof state.itemCount === "number"
                    ? String(state.itemCount)
                    : "N/A"
                }
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/" className="btn-primary inline-flex justify-center">
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex justify-center px-6 py-3 rounded-xl border border-border hover:bg-accent transition-colors font-medium"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium text-foreground mt-1">{value}</p>
  </div>
);

export default OrderConfirmationPage;
