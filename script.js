const foodItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Cheese burger with fresh vegetables",
    price: 149,
    image: "🍔"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh tomato, mozzarella, and basil",
    price: 299,
    image: "🍕"
  },
  {
    id: 3,
    name: "French Fries",
    description: "Crispy golden potato fries",
    price: 99,
    image: "🍟"
  },
  {
    id: 4,
    name: "Veg Noodles",
    description: "Hot noodles with fresh vegetables",
    price: 179,
    image: "🍜"
  },
  {
    id: 5,
    name: "Chicken Biryani",
    description: "Aromatic rice with spicy chicken",
    price: 249,
    image: "🍛"
  },
  {
    id: 6,
    name: "Chocolate Cake",
    description: "Soft cake with chocolate cream",
    price: 129,
    image: "🍰"
  }
];

let cart = [];

const foodContainer = document.getElementById("foodContainer");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cartPanel");
const searchInput = document.getElementById("searchInput");

function displayFoodItems(items) {
  foodContainer.innerHTML = "";

  items.forEach((food) => {
    const foodCard = document.createElement("div");
    foodCard.className = "food-card";

    foodCard.innerHTML = `
      <div class="food-image">${food.image}</div>
      <h3>${food.name}</h3>
      <p>${food.description}</p>
      <div class="food-price">₹${food.price}</div>
      <button class="add-button" onclick="addToCart(${food.id})">
        Add to Cart
      </button>
    `;

    foodContainer.appendChild(foodCard);
  });
}

function addToCart(foodId) {
  const selectedFood = foodItems.find((food) => food.id === foodId);
  cart.push(selectedFood);
  updateCart();
  alert(`${selectedFood.name} added to cart`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <strong>${item.image} ${item.name}</strong>
        <p>₹${item.price}</p>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total;
}

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredItems = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchText)
  );

  displayFoodItems(filteredItems);
});

document.getElementById("cartButton").addEventListener("click", () => {
  cartPanel.classList.add("open");
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Order placed successfully!");
  cart = [];
  updateCart();
  cartPanel.classList.remove("open");
});

displayFoodItems(foodItems);