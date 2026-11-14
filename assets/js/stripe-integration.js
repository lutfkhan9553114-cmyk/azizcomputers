let stripe;
let elements;
let isCardPaymentSelected = false;

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Initialize Stripe with your Publishable Test Key
  stripe = Stripe("pk_test_your_actual_publishable_key_here");

  // Listen for changes in your payment options selection
  const paymentOptionsContainer = document.getElementById("payment-options");
  if (paymentOptionsContainer) {
    paymentOptionsContainer.addEventListener("change", async (e) => {
      // Assuming your radio buttons or options have values like 'card' or 'whatsapp'/'cod'
      if (e.target.value === "card" || e.target.id === "pay-card") {
        isCardPaymentSelected = true;
        document.getElementById("stripe-payment-container").style.display = "block";
        document.getElementById("place-order").textContent = "Pay Securely Now";
        
        // Initialize Stripe Elements when Card is selected
        await initializeStripePaymentIntent();
      } else {
        isCardPaymentSelected = false;
        document.getElementById("stripe-payment-container").style.display = "none";
        document.getElementById("place-order").textContent = "Place order on WhatsApp";
      }
    });
  }
});

// 2. Fetch PaymentIntent from your Node.js backend
async function initializeStripePaymentIntent() {
  try {
    // Calculate amount dynamically from your cart system if available (e.g., 2500 for $25.00)
    const response = await fetch("http://localhost:4242/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2500, currency: "usd" }),
    });

    const { clientSecret, error } = await response.json();
    if (error) {
      document.getElementById("payment-message").textContent = error;
      return;
    }

    // Mount Stripe Elements
    const appearance = { theme: 'stripe' };
    elements = stripe.elements({ appearance, clientSecret });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

  } catch (err) {
    console.error("Error initializing Stripe Elements:", err);
  }
}

// 3. Handle the 'Place Order / Pay Now' button click
document.getElementById("place-order").addEventListener("click", async (e) => {
  if (isCardPaymentSelected) {
    e.preventDefault();
    const submitButton = document.getElementById("place-order");
    submitButton.disabled = true;
    submitButton.textContent = "Processing Payment...";

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/index.html?payment=success",
      },
    });

    if (error) {
      document.getElementById("payment-message").textContent = error.message;
      submitButton.disabled = false;
      submitButton.textContent = "Pay Securely Now";
    }
  } else {
    // Fallback to your existing WhatsApp / non-card checkout flow handled by Pages.checkout()
    console.log("Proceeding with WhatsApp order flow...");
  }
});