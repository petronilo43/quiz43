import Stripe from "stripe";

export const runtime = "nodejs";

export async function GET() {
  // útil pra testar no navegador: http://localhost:3000/api/checkout
  return Response.json({ status: "ok", expects: "POST" });
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
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: { product: "iq_results" },
    });

    return Response.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    return Response.json({ error: e?.message || "Stripe error" }, { status: 500 });
  }
}