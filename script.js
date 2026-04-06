let cart = [];

const CART_STORAGE_KEY = "book-catalog-cart";

const products = document.querySelectorAll(".product");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");
const filterSelect = document.getElementById("filter-category");
const clearCartButton = document.getElementById("clear-cart-btn");
const payButton = document.getElementById("pay-btn");

const saveCart = () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

const loadCart = () => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
        return;
    }

    try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
            cart = parsedCart;
        }
    } catch (error) {
        console.error("Не удалось восстановить корзину из LocalStorage.", error);
        localStorage.removeItem(CART_STORAGE_KEY);
    }
};

// Фильтр по жанру
filterSelect.addEventListener("change", function() {
    const selected = filterSelect.value;

    products.forEach((product) => {
        if (selected === "all" || product.dataset.category === selected) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});

// Подсчёт общей суммы
const calculateTotal = () => {
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
    });

    return total;
};

// Отрисовка корзины
const renderCart = () => {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "Корзина пуста";
        cartItems.appendChild(emptyItem);
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item.name + " — " + item.price + " руб. ";

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Удалить";
            removeBtn.addEventListener("click", () => {
                cart.splice(index, 1);
                renderCart();
            });

            li.appendChild(removeBtn);
            cartItems.appendChild(li);
        });
    }

    totalElement.textContent = "Итого: " + calculateTotal() + " руб.";
    saveCart();
};

// Добавление товара в корзину
const addToCart = (product) => {
    cart.push(product);
    renderCart();
};

const clearCart = () => {
    cart = [];
    renderCart();
};

// Обработчики кнопок "Добавить в корзину"
const addButtons = document.querySelectorAll(".add-to-cart");
addButtons.forEach((button) => {
    button.addEventListener("click", function() {
        const product = button.closest(".product");
        const name = product.dataset.name;
        const price = Number(product.dataset.price);
        const category = product.dataset.category;

        addToCart({ name, price, category });
    });
});

clearCartButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Корзина уже пуста");
        return;
    }

    clearCart();
});

// Кнопка "Оплатить"
payButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        clearCart();
    }
});

loadCart();
renderCart();
