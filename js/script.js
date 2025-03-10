document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".list-products");
  const totalElement = document.querySelector(".total");
  const favoriteCountElement = document.querySelector(".favorite-count");

  function updateTotal() {
    let total = 0;
    let items = document.querySelectorAll(".card-body");

    items.forEach((card) => {
      const price = parseInt(card.querySelector(".unit-price").textContent);
      const quantity = parseInt(card.querySelector(".quantity").textContent);
      total += price * quantity;
    });

    totalElement.textContent = total + " $";

    // Display message if cart is empty
    if (items.length === 0) {
      cartContainer.innerHTML = "<p class='text-center'>Your cart is empty</p>";
    }
  }

  function updateFavoriteCount() {
    let favoriteCount = document.querySelectorAll(
      ".fa-heart.text-danger"
    ).length;
    favoriteCountElement.textContent = "Favorites: " + favoriteCount;
  }

  cartContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("fa-plus-circle")) {
      let quantityElement = target.nextElementSibling;
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
      updateTotal();
    }

    if (target.classList.contains("fa-minus-circle")) {
      let quantityElement = target.previousElementSibling;
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantityElement.textContent = quantity - 1;
        updateTotal();
      }
    }

    if (target.classList.contains("fa-trash-alt")) {
      let card = target.closest(".card");
      if (card) {
        card.remove();
        updateTotal();
      }
    }

    if (target.classList.contains("fa-heart")) {
      target.classList.toggle("text-danger");
      updateFavoriteCount();
    }
  });

  updateTotal();
  updateFavoriteCount();
});
