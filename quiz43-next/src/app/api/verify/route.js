// src/app/api/verify/route.js
import Stripe from "stripe";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return Response.json({ error: "STRIPE_SECRET_KEY ausente" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return Response.json({ paid: false, reason: "missing_session_id" }, { status: 400 });
    }

    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === "paid" || session.status === "complete";

    return Response.json({
      paid,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (e) {
    console.error("verify error:", e);
    return Response.json({ paid: false, error: e.message }, { status: 500 });
  }
}