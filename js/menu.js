// ข้อมูลเมนูกาแฟ
const menuItems = [
    {
        id: 1,
        name: 'เอสเพรสโซ่',
        description: 'กาแฟเข้มข้นที่สกัดด้วยแรงดันสูง',
        price: 55,
        image: 'images/espresso.jpg',
        category: 'hot'
    },
    {
        id: 2,
        name: 'อเมริกาโน่',
        description: 'เอสเพรสโซ่ผสมน้ำร้อน นุ่มนวลกว่า',
        price: 60,
        image: 'images/americano.jpg',
        category: 'hot'
    },
    {
        id: 3,
        name: 'ลาเต้',
        description: 'เอสเพรสโซ่ผสมนมร้อนและฟองนม',
        price: 65,
        image: 'images/latte.jpg',
        category: 'hot'
    },
    {
        id: 4,
        name: 'คาปูชิโน่',
        description: 'เอสเพรสโซ่ผสมนมร้อนและฟองนมหนานุ่ม',
        price: 65,
        image: 'images/cappuccino.jpg',
        category: 'hot'
    },
    {
        id: 5,
        name: 'มอคค่า',
        description: 'เอสเพรสโซ่ผสมช็อกโกแลตและนมร้อน',
        price: 70,
        image: 'images/mocha.jpg',
        category: 'hot'
    },
    {
        id: 6,
        name: 'อเมริกาโน่เย็น',
        description: 'เอสเพรสโซ่ผสมน้ำเย็น สดชื่น',
        price: 65,
        image: 'images/iced-americano.jpg',
        category: 'cold'
    },
    {
        id: 7,
        name: 'ลาเต้เย็น',
        description: 'เอสเพรสโซ่ผสมนมสดและน้ำแข็ง',
        price: 70,
        image: 'images/iced-latte.jpg',
        category: 'cold'
    },
    {
        id: 8,
        name: 'มอคค่าเย็น',
        description: 'เอสเพรสโซ่ผสมช็อกโกแลตและนมเย็น',
        price: 75,
        image: 'images/iced-mocha.jpg',
        category: 'cold'
    },
    {
        id: 9,
        name: 'คาราเมลมัคคิอาโต้เย็น',
        description: 'เอสเพรสโซ่ผสมนมและคาราเมลไซรัป',
        price: 80,
        image: 'images/iced-caramel-macchiato.jpg',
        category: 'cold'
    },
    {
        id: 10,
        name: 'กาแฟปั่น',
        description: 'กาแฟเข้มข้นปั่นกับนมและน้ำแข็ง',
        price: 85,
        image: 'images/coffee-frappe.jpg',
        category: 'frappe'
    },
    {
        id: 11,
        name: 'มอคค่าปั่น',
        description: 'กาแฟผสมช็อกโกแลตปั่นกับนมและน้ำแข็ง',
        price: 90,
        image: 'images/mocha-frappe.jpg',
        category: 'frappe'
    },
    {
        id: 12,
        name: 'คาราเมลปั่น',
        description: 'กาแฟผสมคาราเมลปั่นกับนมและน้ำแข็ง',
        price: 90,
        image: 'images/caramel-frappe.jpg',
        category: 'frappe'
    }
];

// แสดงรายการเมนูกาแฟ
document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบว่ามี element ที่ต้องการหรือไม่
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        displayMenuItems('all');
        
        // เพิ่มการทำงานของปุ่มกรอง
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // ลบคลาส active จากปุ่มทั้งหมด
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // เพิ่มคลาส active ให้ปุ่มที่ถูกคลิก
                this.classList.add('active');
                // แสดงรายการเมนูตามหมวดหมู่ที่เลือก
                const category = this.getAttribute('data-filter');
                displayMenuItems(category);
            });
        });
    } else {
        console.error('ไม่พบ element ที่มี id เป็น "menu-container"');
    }
});

// ฟังก์ชันแสดงรายการเมนูตามหมวดหมู่
function displayMenuItems(category) {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    
    // กรองรายการเมนูตามหมวดหมู่
    const filteredItems = category === 'all' ? 
        menuItems : 
        menuItems.filter(item => item.category === category);
    
    // สร้าง HTML สำหรับแต่ละรายการเมนู
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='data:image/svg+xml;charset=utf-8,${encodeURIComponent(createCoffeeImageSVG(item.name, item.category))}'">
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
    
    // เพิ่มการทำงานของปุ่มเพิ่มลงตะกร้า
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const selectedItem = menuItems.find(item => item.id === itemId);
            
            // เรียกใช้ฟังก์ชันเพิ่มสินค้าลงตะกร้าจาก cart.js
            if (typeof addToCart === 'function') {
                addToCart(selectedItem);
            }
        });
    });
}

// ฟังก์ชันสร้าง SVG รูปกาแฟ
function createCoffeeImageSVG(name, category) {
    return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" fill="#F7F7F7" rx="10" />
            <text x="50" y="50" font-size="24" font-weight="bold" text-anchor="middle" fill="#333">${name}</text>
            <text x="50" y="70" font-size="18" text-anchor="middle" fill="#666">${category}</text>
        </svg>
    `;
}