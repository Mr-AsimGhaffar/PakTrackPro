import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.API_PORT || 8787);
const allowedOrigins = [
  "https://paktrackpro.com",
  "https://www.paktrackpro.com",
  "https://pak-track-pro.vercel.app",
];

app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    response.header("Access-Control-Allow-Origin", origin);
    response.header("Vary", "Origin");
  }

  response.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (request.method === "OPTIONS") {
    return response.status(204).send();
  }

  next();
});

app.use(express.json({ limit: "1mb" }));

const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "ADMIN_EMAIL",
];

const hasAllRequiredEnv = () =>
  requiredEnvVars.every((key) => Boolean(process.env[key]));

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildOrderRows = (items) =>
  items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#111827;">${escapeHtml(item.name)}</td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#111827;text-align:center;">${item.quantity}</td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#111827;text-align:right;">${formatCurrency(item.price)}</td>
          <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#111827;text-align:right;font-weight:600;">${formatCurrency(item.total)}</td>
        </tr>
      `,
    )
    .join("");

const adminTemplate = ({
  customer,
  shipping,
  items,
  subtotal,
  shippingCost,
  totalAmount,
  paymentMethod,
}) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#f3f4f6;padding:24px;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:linear-gradient(135deg,#0f766e,#064e3b);padding:24px;color:#ffffff;">
        <h1 style="margin:0;font-size:24px;">New Order Received</h1>
        <p style="margin:8px 0 0;opacity:0.92;">Cash on Delivery order notification</p>
      </div>
      <div style="padding:24px;">
        <h2 style="margin:0 0 10px;font-size:18px;color:#111827;">Customer Information</h2>
        <p style="margin:4px 0;color:#374151;"><strong>Name:</strong> ${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)}</p>
        <p style="margin:4px 0;color:#374151;"><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
        <p style="margin:4px 0 16px;color:#374151;"><strong>Phone:</strong> ${escapeHtml(customer.phone)}</p>

        <h2 style="margin:0 0 10px;font-size:18px;color:#111827;">Shipping Information</h2>
        <p style="margin:4px 0 16px;color:#374151;">
          ${escapeHtml(shipping.addressLine1)}${shipping.addressLine2 ? `, ${escapeHtml(shipping.addressLine2)}` : ""},
          ${escapeHtml(shipping.city)}, ${escapeHtml(shipping.province)}
        </p>

        <h2 style="margin:0 0 10px;font-size:18px;color:#111827;">Order Items</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr>
              <th style="padding:10px;text-align:left;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Product</th>
              <th style="padding:10px;text-align:center;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Qty</th>
              <th style="padding:10px;text-align:right;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Price</th>
              <th style="padding:10px;text-align:right;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>${buildOrderRows(items)}</tbody>
        </table>

        <p style="margin:0;color:#111827;font-size:16px;"><strong>Subtotal:</strong> ${formatCurrency(subtotal)}</p>
        <p style="margin:8px 0 0;color:#374151;"><strong>Shipping:</strong> ${formatCurrency(shippingCost || 0)}</p>
        <p style="margin:8px 0 0;color:#111827;font-size:16px;"><strong>Total:</strong> ${formatCurrency(totalAmount || subtotal)}</p>
        <p style="margin:8px 0 0;color:#374151;"><strong>Payment Method:</strong> ${escapeHtml(paymentMethod)}</p>
      </div>
    </div>
  </div>
`;

const customerTemplate = ({
  customer,
  shipping,
  items,
  subtotal,
  shippingCost,
  totalAmount,
  paymentMethod,
}) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#f3f4f6;padding:20px;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="padding:22px;background:linear-gradient(135deg,#166534,#14532d);color:#ffffff;">
        <h1 style="margin:0;font-size:22px;">Your Pak Track Pro Order Has Been Received</h1>
      </div>
      <div style="padding:22px;">
        <p style="margin:0 0 14px;color:#111827;">Hi ${escapeHtml(customer.firstName)},</p>
        <p style="margin:0 0 16px;color:#374151;">
          Thank you for your order. We are preparing your shipment and will contact you shortly for delivery confirmation.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:0 0 16px;">
          <thead>
            <tr>
              <th style="padding:10px;text-align:left;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Product</th>
              <th style="padding:10px;text-align:center;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Qty</th>
              <th style="padding:10px;text-align:right;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Price</th>
              <th style="padding:10px;text-align:right;background:#f9fafb;color:#4b5563;border-bottom:1px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>${buildOrderRows(items)}</tbody>
        </table>

        <p style="margin:0 0 8px;color:#111827;font-size:16px;"><strong>Subtotal:</strong> ${formatCurrency(subtotal)}</p>
        <p style="margin:0 0 8px;color:#374151;"><strong>Shipping:</strong> ${formatCurrency(shippingCost || 0)}</p>
        <p style="margin:0 0 8px;color:#111827;font-size:16px;"><strong>Total:</strong> ${formatCurrency(totalAmount || subtotal)}</p>
        <p style="margin:0 0 8px;color:#374151;"><strong>Shipping Address:</strong>
          ${escapeHtml(shipping.addressLine1)}${shipping.addressLine2 ? `, ${escapeHtml(shipping.addressLine2)}` : ""},
          ${escapeHtml(shipping.city)}, ${escapeHtml(shipping.province)}
        </p>
        <p style="margin:0;color:#374151;"><strong>Payment:</strong> ${escapeHtml(paymentMethod)} - pay at delivery.</p>
      </div>
    </div>
  </div>
`;

const isValidPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  if (!payload.customer || !payload.shipping || !Array.isArray(payload.items)) {
    return false;
  }

  if (payload.items.length === 0) {
    return false;
  }

  if (typeof payload.subtotal !== "number") {
    return false;
  }

  if (typeof payload.shippingCost !== "number") {
    return false;
  }

  if (typeof payload.totalAmount !== "number") {
    return false;
  }

  return true;
};

app.post("/api/place-order", async (request, response) => {
  if (!hasAllRequiredEnv()) {
    return response.status(500).json({
      message:
        "SMTP configuration is incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and ADMIN_EMAIL.",
    });
  }

  const payload = request.body;
  if (!isValidPayload(payload)) {
    return response.status(400).json({ message: "Invalid order payload." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Pak Track Pro <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: payload.customer.email,
      subject: "New Order Received",
      html: adminTemplate(payload),
    });

    await transporter.sendMail({
      from: `Pak Track Pro <${process.env.SMTP_USER}>`,
      to: payload.customer.email,
      subject: "Your Pak Track Pro Order Has Been Received",
      html: customerTemplate(payload),
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send order email", error);
    return response
      .status(500)
      .json({ message: "Could not send order emails." });
  }
});

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Pak Track Pro API listening on port ${port}`);
});
