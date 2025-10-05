// src/app/api/checkout/route.js
import Stripe from "stripe";
export const runtime = "nodejs";

export async function GET() {
  // ajuda a diagnosticar no navegador
  return Response.json({
    status: "ok",
    expects: "POST",
    hasSecret: !!process.env.STRIPE_SECRET_KEY,
    siteUrlSet: !!process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export async function POST() {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!secret) return Response.json({ error: "STRIPE_SECRET_KEY ausente" }, { status: 500 });
    if (!siteUrl) return Response.json({ error: "NEXT_PUBLIC_SITE_URL ausente" }, { status: 500 });

    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: 99, // €0,99
            product_data: { name: "Acesso aos resultados do teste de QI" },
          },
          quantity: 1,
        },
      ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      metadata: { product: "iq_results" },
    });

    return Response.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    return Response.json({ error: e?.message || "Stripe error" }, { status: 500 });
  }
}