const cart = {};

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const itemID = card.querySelector('input[type="number"]').id;
    const itemName = card.querySelector(".card-title").textContent;
    const itemPriceText = card.querySelector(".card-text").textContent;
    const itemPrice = parseFloat(
      itemPriceText.replace("Rp. ", "").replace(",", "")
    );

    const incrementButton = card.querySelector(
      ".kontainer button:nth-child(3)"
    );
    const decrementButton = card.querySelector(
      ".kontainer button:nth-child(1)"
    );
    const quantityInput = card.querySelector('input[type="number"]');

    incrementButton.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decrementButton.addEventListener("click", () => {
      if (quantityInput.value > 0) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });

    card.querySelector(".btn-success").addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value);
      if (quantity > 0) {
        addToCart(itemID, itemName, itemPrice, quantity);
        quantityInput.value = 0;
      }
    });
  });
});

function addToCart(itemID, itemName, itemPrice, quantity) {
  if (cart[itemID] === undefined) {
    cart[itemID] = { name: itemName, price: itemPrice, quantity: quantity };
  } else {
    cart[itemID].quantity += quantity;
  }
  updateCart();
}

function updateCart() {
  const cartDetail = document.querySelector(".cart-detail");
  cartDetail.innerHTML = "";

  let totalPembelian = 0;
  for (const itemID in cart) {
    const { name, price, quantity } = cart[itemID];
    const itemTotal = price * quantity;
    totalPembelian += itemTotal;

    const cartItem = document.createElement("p");
    cartItem.textContent = `${name} x${quantity} = Rp. ${itemTotal.toFixed(2)}`;
    cartDetail.appendChild(cartItem);
  }

  const pajak = totalPembelian * 0.11;
  const totalBayar = totalPembelian + pajak;

  const detail = document.querySelector(".detail");
  detail.innerHTML = `
    <p>Total Pembelian: Rp. ${totalPembelian.toFixed(2)}</p>
    <p>Pajak 11%: Rp. ${pajak.toFixed(2)}</p>
    <p>Total Bayar: Rp. ${totalBayar.toFixed(2)}</p>
  `;
}
