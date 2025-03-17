// ตัวแปรสำหรับเก็บรายการสินค้าในตะกร้า
let cart = [];

// เลือก DOM elements
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = cartModal.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCount = document.getElementById('cart-count');

// เปิดปิด Modal ตะกร้าสินค้า
cartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    cartModal.style.display = 'block';
    renderCartItems();
});

closeCartBtn.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// ล้างตะกร้าสินค้า
clearCartBtn.addEventListener('click', function() {
    cart = [];
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
});

// ไปที่หน้า Checkout
checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('กรุณาเพิ่มสินค้าในตะกร้าก่อนทำการสั่งซื้อ');
        return;
    }
    
    cartModal.style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'block';
});

// เพิ่มสินค้าลงในตะกร้า
function addToCart(product) {
    // ตรวจสอบว่าสินค้านี้มีในตะกร้าแล้วหรือไม่
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        // ถ้ามีแล้ว เพิ่มจำนวน
        existingItem.quantity += 1;
    } else {
        // ถ้ายังไม่มี เพิ่มสินค้าใหม่
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // อัพเดทจำนวนสินค้าในตะกร้า
    updateCartCount();
    
    // บันทึกตะกร้าลง localStorage
    saveCartToLocalStorage();
    
    // แสดงข้อความยืนยัน
    showAddToCartConfirmation(product.name);
}

// แสดงข้อความยืนยันเมื่อเพิ่มสินค้าลงตะกร้า
function showAddToCartConfirmation(productName) {
    const confirmation = document.createElement('div');
    confirmation.className = 'add-to-cart-confirmation';
    confirmation.innerHTML = `<p>เพิ่ม ${productName} ลงในตะกร้าแล้ว</p>`;
    
    document.body.appendChild(confirmation);
    
    // ลบข้อความหลังจาก 2 วินาที
    setTimeout(() => {
        confirmation.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(confirmation);
        }, 300);
    }, 2000);
}

// อัพเดทจำนวนสินค้าในตะกร้า
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// แสดงรายการสินค้าในตะกร้า
function renderCartItems() {
    // ล้างรายการเดิม
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">ไม่มีสินค้าในตะกร้า</p>';
        cartTotalPrice.textContent = '0';
        return;
    }
    
    // คำนวณราคารวม
    let total = 0;
    
    // สร้าง HTML สำหรับแต่ละรายการ
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='${createCoffeeImageSVG(item.name, item.category)}'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} บาท</div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    // อัพเดทราคารวม
    cartTotalPrice.textContent = total;
    
    // เพิ่ม Event Listeners สำหรับปุ่มเพิ่ม/ลดจำนวน และลบสินค้า
    addCartItemEventListeners();
}

// เพิ่ม Event Listeners สำหรับปุ่มในรายการสินค้า
function addCartItemEventListeners() {
    // ปุ่มเพิ่มจำนวน
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            increaseQuantity(id);
        });
    });
    
    // ปุ่มลดจำนวน
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });
    
    // ปุ่มลบสินค้า
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// เพิ่มจำนวนสินค้า
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCartCount();
        renderCartItems();
        saveCartToLocalStorage();
    }
}

// ลดจำนวนสินค้า
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity -= 1;
        
        // ถ้าจำนวนเป็น 0 ให้ลบออกจากตะกร้า
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
        
        updateCartCount();
        renderCartItems();
        saveCartToLocalStorage();
    }
}

// ลบสินค้าออกจากตะกร้า
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
}

// บันทึกตะกร้าลง localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('daliCoffeeCart', JSON.stringify(cart));
}

// โหลดตะกร้าจาก localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('daliCoffeeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// เพิ่ม Event Listeners สำหรับปุ่ม "เพิ่มลงตะกร้า" ในหน้าเมนู
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const product = menuItems.find(item => item.id === id);
            if (product) {
                addToCart(product);
            }
        });
    });
}

// เริ่มต้นเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    // โหลดตะกร้าจาก localStorage
    loadCartFromLocalStorage();
    
    // แสดงเมนูกาแฟและตั้งค่าปุ่ม "เพิ่มลงตะกร้า"
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        // แสดงเมนูทั้งหมดเมื่อโหลดหน้าเว็บ
        displayMenuItems('all');
        
        // ตั้งค่าปุ่มกรองเมนู
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // ลบคลาส active จากปุ่มทั้งหมด
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // เพิ่มคลาส active ให้ปุ่มที่ถูกคลิก
                this.classList.add('active');
                
                // กรองเมนูตามประเภท
                const category = this.getAttribute('data-filter');
                displayMenuItems(category);
            });
        });
    }
});

// แสดงรายการเมนูตามประเภท
function displayMenuItems(category) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
    
    // กรองรายการตามประเภท
    const filteredItems = category === 'all' ? 
        menuItems : 
        menuItems.filter(item => item.category === category);
    
    // สร้าง HTML สำหรับแต่ละรายการ
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.innerHTML='${createCoffeeImageSVG(item.name, item.category)}'; this.src='data:image/svg+xml;charset=utf-8,${encodeURIComponent(createCoffeeImageSVG(item.name, item.category))}'">
            </div>
            <div class="menu-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-price">${item.price} บาท</div>
                <button class="btn add-to-cart" data-id="${item.id}">เพิ่มลงตะกร้า</button>
            </div>
        `;
        
        menuContainer.appendChild(menuItemElement);
    });
    
    // ตั้งค่าปุ่ม "เพิ่มลงตะกร้า"
    setupAddToCartButtons();
}