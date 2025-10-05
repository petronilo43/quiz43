import Stripe from "stripe";

export async function GET() {
  // health check to avoid 404 on GET
  return Response.json({
    status: "ok",
    expects: "POST",
    hasSecret: !!process.env.STRIPE_SECRET_KEY,
    siteUrlSet: !!process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export async function POST() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: "STRIPE_SECRET_KEY missing" }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return Response.json({ error: "NEXT_PUBLIC_SITE_URL missing" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "IQ Test Results" },
            unit_amount: 99, // €0.99
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      automatic_tax: { enabled: false },
      billing_address_collection: "auto",
      allow_promotion_codes: false,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message || "checkout error" }, { status: 500 });
  }
}