let stripe;
let elements;
let isCardPaymentSelected = false;

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Initialize Stripe with your Publishable Test Key
  stripe = Stripe("pk_test_your_actual_publishable_key_here");

  const paymentOptionsContainer = document.getElementById("payment-options");
  if (paymentOptionsContainer) {
    paymentOptionsContainer.addEventListener("change", async (e) => {
      const selectedValue = e.target.value ? e.target.value.toLowerCase() : "";
      const selectedId = e.target.id ? e.target.id.toLowerCase() : "";

      // Check if the user picked card/online payment
      if (selectedValue.includes("card") || selectedId.includes("card") || selectedValue.includes("online")) {
        isCardPaymentSelected = true;
        document.getElementById("stripe-payment-container").style.display = "block";
        document.getElementById("place-order").textContent = "Pay Securely Now";
        
        await initializeStripePaymentIntent();
      } else {
        isCardPaymentSelected = false;
        document.getElementById("stripe-payment-container").style.display = "none";
        document.getElementById("place-order").textContent = "Place order on WhatsApp";
      }
    });
  }
});

async function initializeStripePaymentIntent() {
  try {
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

    const appearance = { theme: 'stripe' };
    elements = stripe.elements({ appearance, clientSecret });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

  } catch (err) {
    console.error("Error initializing Stripe Elements:", err);
  }
}

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
    // Falls through to your default WhatsApp handler if card is not selected
    console.log("WhatsApp flow selected.");
  }
});