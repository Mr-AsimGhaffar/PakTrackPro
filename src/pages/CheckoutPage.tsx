import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPrice, SHIPPING_COST_PKR } from "@/data/productData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

type PlaceOrderPayload = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
  };
  items: {
    productId: string;
    slug: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  paymentMethod: "Cash On Delivery";
};

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please provide a valid email"),
  phone: z
    .string()
    .regex(/^[0-9+\-()\s]{8,20}$/, "Please provide a valid phone number"),
  addressLine1: z.string().min(5, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province/State is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/+$/,
  "",
);
const placeOrderUrl = `${apiBaseUrl}/api/place-order`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, subtotal, clearCart } = useCart();
  const shippingCost = items.length > 0 ? SHIPPING_COST_PKR : 0;
  const totalAmount = subtotal + shippingCost;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add products to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    const payload: PlaceOrderPayload = {
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      },
      shipping: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        province: values.province,
      },
      items: items.map((item) => ({
        productId: item.product.id,
        slug: item.product.slug,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
      subtotal,
      shippingCost,
      totalAmount,
      paymentMethod: "Cash On Delivery",
    };

    try {
      const response = await fetch(placeOrderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseBody = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        toast({
          title: "Order failed",
          description:
            responseBody?.message ||
            "Unable to place your order right now. Please try again.",
          variant: "destructive",
        });
        return;
      }
    } catch {
      toast({
        title: "Network error",
        description: "Unable to connect to the server. Please try again.",
        variant: "destructive",
      });
      return;
    }

    clearCart();
    navigate("/order-confirmation", {
      replace: true,
      state: {
        customerName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        totalAmount,
        itemCount: payload.items.reduce(
          (total, item) => total + item.quantity,
          0,
        ),
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-container pt-28 pb-20">
          <div className="card-elevated p-10 max-w-2xl mx-auto text-center">
            <h1 className="font-display text-3xl mb-3">Checkout</h1>
            <p className="text-muted-foreground mb-6">
              Your cart is empty. Add products to continue checkout.
            </p>
            <Link to="/" className="btn-primary inline-flex">
              Continue Shopping
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
        <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-8">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-[1fr_360px] gap-8"
        >
          <section className="space-y-6">
            <div className="card-elevated p-6 sm:p-7">
              <h2 className="font-display text-xl mb-4">
                Customer Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First Name" error={errors.firstName?.message}>
                  <input
                    {...register("firstName")}
                    className="input-field"
                    aria-invalid={!!errors.firstName}
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName?.message}>
                  <input
                    {...register("lastName")}
                    className="input-field"
                    aria-invalid={!!errors.lastName}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email")}
                    className="input-field"
                    aria-invalid={!!errors.email}
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    className="input-field"
                    aria-invalid={!!errors.phone}
                  />
                </Field>
              </div>
            </div>

            <div className="card-elevated p-6 sm:p-7">
              <h2 className="font-display text-xl mb-4">
                Shipping Information
              </h2>
              <div className="grid gap-4">
                <Field
                  label="Address Line 1"
                  error={errors.addressLine1?.message}
                >
                  <input
                    {...register("addressLine1")}
                    className="input-field"
                    aria-invalid={!!errors.addressLine1}
                  />
                </Field>
                <Field
                  label="Address Line 2"
                  error={errors.addressLine2?.message}
                >
                  <input
                    {...register("addressLine2")}
                    className="input-field"
                    aria-invalid={!!errors.addressLine2}
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="City" error={errors.city?.message}>
                    <input
                      {...register("city")}
                      className="input-field"
                      aria-invalid={!!errors.city}
                    />
                  </Field>
                  <Field
                    label="Province/State"
                    error={errors.province?.message}
                  >
                    <input
                      {...register("province")}
                      className="input-field"
                      aria-invalid={!!errors.province}
                    />
                  </Field>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="card-elevated p-6 lg:sticky lg:top-28">
              <h2 className="font-display text-xl mb-4">Order Summary</h2>
              <ul className="space-y-3 mb-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="pt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{formatPrice(shippingCost)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-border flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-semibold text-primary">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            <div className="card-elevated p-6">
              <h3 className="font-display text-lg mb-2">Payment Method</h3>
              <p className="text-sm text-muted-foreground">Cash On Delivery</p>
              <p className="text-xs text-muted-foreground mt-2">
                You will pay at the time of delivery.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full inline-flex justify-center disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) => (
  <label className="grid gap-1 text-sm">
    <span className="font-medium text-foreground">{label}</span>
    {children}
    {error ? <span className="text-xs text-destructive">{error}</span> : null}
  </label>
);

export default CheckoutPage;
