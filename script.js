let cart = [];

const products = document.querySelectorAll(".product");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");
const filterSelect = document.getElementById("filter-category");

// Фильтр по жанру
filterSelect.addEventListener("change", function() {
    const selected = filterSelect.value;
    products.forEach(product => {
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
    cart.forEach(item => total += item.price);
    return total;
};

// Отрисовка корзины
const renderCart = () => {
    cartItems.innerHTML = "";
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
    totalElement.textContent = "Итого: " + calculateTotal() + " руб.";
};

// Добавление товара в корзину
const addToCart = (product) => {
    cart.push(product);
    renderCart();
};

// Обработчики кнопок "Добавить в корзину"
const addButtons = document.querySelectorAll(".add-to-cart");
addButtons.forEach(button => {
    button.addEventListener("click", function() {
        const product = button.closest(".product");
        const name = product.dataset.name;
        const price = Number(product.dataset.price);
        const category = product.dataset.category;
        addToCart({ name, price, category });
    });
});

// Кнопка "Оплатить"
document.getElementById("pay-btn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        renderCart();
    }
});
