let stripe;
let elements;
let isCardPaymentSelected = false;

document.addEventListener("DOMContentLoaded", () => {
  // Paste your actual Stripe Publishable Key below:
  stripe = Stripe("pk_test_51Tx5E8GwHv0iFMmrXCTH11X2eoI7tsPneqOeSRKL4OA4J1FQkRdp3g1m2eA1zDTQ8S3kvx6BC0DGbTELNioRmSdh00sMkcma3T");

  const paymentOptionsContainer = document.getElementById("payment-options");
  if (paymentOptionsContainer) {
    paymentOptionsContainer.addEventListener("change", async (e) => {
      const selectedValue = e.target.value ? e.target.value.toLowerCase() : "";
      const selectedId = e.target.id ? e.target.id.toLowerCase() : "";
      const labelText = e.target.parentElement ? e.target.parentElement.textContent.toLowerCase() : "";

      const btn = document.getElementById("place-order");

      // Detect if Card Online was chosen
      if (selectedValue.includes("card") || selectedId.includes("card") || labelText.includes("card online")) {
        isCardPaymentSelected = true;
        document.getElementById("stripe-payment-container").style.display = "block";
        
        // Force button to show, enable, and update text
        if (btn) {
          btn.style.display = "block";
          btn.disabled = false;
          btn.textContent = "Pay Securely Now";
        }
        
        await initializeStripePaymentIntent();
      } else {
        isCardPaymentSelected = false;
        document.getElementById("stripe-payment-container").style.display = "none";
        if (btn) {
          btn.style.display = "block";
          btn.disabled = false;
          btn.textContent = "Place order on WhatsApp";
        }
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

// Intercept click BEFORE pages.js can trigger WhatsApp
const placeOrderBtn = document.getElementById("place-order");
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", async (e) => {
    if (isCardPaymentSelected) {
      e.preventDefault();
      e.stopImmediatePropagation();

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
    }
  }, true);
}