import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock";
const stripe = new Stripe(stripeKey, {
  apiVersion: "2025-02-24.acacia" as "2026-04-22.dahlia",
});

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Brak klucza STRIPE_SECRET_KEY w pliku .env.local" },
        { status: 400 }
      );
    }

    const { amount, cartItems, customerName, customerEmail } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "pln",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cartItems: JSON.stringify(cartItems),
        customerName: customerName,
        customerEmail: customerEmail,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    console.error("Błąd Stripe:", error);
    const errorMessage = error instanceof Error ? error.message : "Wystąpił błąd podczas komunikacji ze Stripe.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
