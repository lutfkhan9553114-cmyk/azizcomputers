let stripe;
let elements;
let isCardPaymentSelected = false;

document.addEventListener("DOMContentLoaded", () => {
  // Replace with your actual Stripe Publishable Key
  stripe = Stripe("pk_live_51Tx5E8GwHv0iFMmruE8EjLn1wfWga9FsskDhJUV3KiHG88vt6gIyRMS78IVlCzPQtz4Aqmz3XEElnLgceNav8D7100XOpyDnP8");

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
        
        // Style button for Stripe Payment (Golden theme)
        if (btn) {
          btn.style.display = "block";
          btn.disabled = false;
          btn.textContent = "Pay Securely Now";
          btn.style.backgroundColor = "#d4af37"; // Golden color
          btn.style.color = "#000000";            // Dark text for contrast
          btn.style.border = "none";
        }
        
        await initializeStripePaymentIntent();
      } else {
        isCardPaymentSelected = false;
        document.getElementById("stripe-payment-container").style.display = "none";
        
        // Style button for WhatsApp (Green theme)
        if (btn) {
          btn.style.display = "block";
          btn.disabled = false;
          btn.textContent = "Place order on WhatsApp";
          btn.style.backgroundColor = "#25D366"; // WhatsApp Green
          btn.style.color = "#ffffff";            // White text
          btn.style.border = "none";
        }
      }
    });
  }
});

async function initializeStripePaymentIntent() {
  try {
    let cartTotalAED = 25.00; // Fallback default
    
    try {
      // Let's check common keys your store might use for the cart
      let rawCart = localStorage.getItem('cart') || localStorage.getItem('shoppingCart') || localStorage.getItem('aziz_cart');
      console.log("Raw cart data found in localStorage:", rawCart); // Check your F12 Console to see this!

      if (rawCart) {
        const cartData = JSON.parse(rawCart);
        if (Array.isArray(cartData) && cartData.length > 0) {
          const calculatedTotal = cartData.reduce((sum, item) => {
            // Support different property names like price, itemPrice, or product.price
            const itemPrice = parseFloat(item.price || item.itemPrice || item.cost || 0);
            const itemQty = parseInt(item.quantity || item.qty || 1, 10);
            return sum + (itemPrice * itemQty);
          }, 0);

          if (calculatedTotal > 0) {
            cartTotalAED = calculatedTotal;
          }
        }
      }
    } catch (e) {
      console.log("Error reading cart from localStorage:", e);
    }

    console.log("Final calculated amount in AED to charge:", cartTotalAED);

    // Convert total AED to fils (multiply by 100)
    const amountInCents = Math.round(cartTotalAED * 100);

    const response = await fetch("https://azizcomputers.onrender.com/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents, currency: "aed" }),
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