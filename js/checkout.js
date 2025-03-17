// ตัวแปรสำหรับเก็บข้อมูลการสั่งซื้อ
let order = {
    items: [],
    customer: {},
    location: {},
    paymentMethod: 'cash',
    total: 0
};

// เลือก DOM elements
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = checkoutModal.querySelector('.close');
const checkoutForm = document.getElementById('checkout-form');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmationBtn = confirmationModal.querySelector('.close');
const backToHomeBtn = document.getElementById('back-to-home');
const orderNumberElement = document.getElementById('order-number');
const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
const transferInfo = document.getElementById('transfer-info');

// ตัวแปรสำหรับ Google Maps
let map;
let marker;

// เปิดปิด Modal
closeCheckoutBtn.addEventListener('click', function() {
    checkoutModal.style.display = 'none';
});

closeConfirmationBtn.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
});

backToHomeBtn.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
    window.scrollTo(0, 0);
});

window.addEventListener('click', function(e) {
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});

// สลับการแสดงข้อมูลการโอนเงิน
paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'transfer') {
            transferInfo.classList.remove('hidden');
        } else {
            transferInfo.classList.add('hidden');
        }
    });
});

// ส่งฟอร์มการสั่งซื้อ
checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // เก็บข้อมูลลูกค้า
    order.customer = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value
    };
    
    // เก็บข้อมูลตำแหน่ง
    order.location = {
        lat: document.getElementById('customer-lat').value,
        lng: document.getElementById('customer-lng').value
    };
    
    // เก็บข้อมูลวิธีการชำระเงิน
    order.paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // เก็บข้อมูลสินค้าจากตะกร้า
    order.items = [...cart];
    order.total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // สร้างหมายเลขคำสั่งซื้อ
    const orderNumber = generateOrderNumber();
    orderNumberElement.textContent = orderNumber;
    
    // บันทึกคำสั่งซื้อ (ในตัวอย่างนี้เราจะเก็บไว้ใน localStorage)
    saveOrder(orderNumber, order);
    
    // ล้างตะกร้าสินค้า
    cart = [];
    updateCartCount();
    saveCartToLocalStorage();
    
    // แสดง Modal ยืนยันการสั่งซื้อ
    checkoutModal.style.display = 'none';
    confirmationModal.style.display = 'block';
});

// สร้างหมายเลขคำสั่งซื้อ
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `DC${year}${month}${day}${random}`;
}

// บันทึกคำสั่งซื้อ
function saveOrder(orderNumber, orderData) {
    // ในตัวอย่างนี้เราจะเก็บไว้ใน localStorage
    // ในระบบจริงควรส่งข้อมูลไปยัง server
    const orders = JSON.parse(localStorage.getItem('daliCoffeeOrders') || '{}');
    orders[orderNumber] = {
        ...orderData,
        date: new Date().toISOString(),
        status: 'pending'
    };
    localStorage.setItem('daliCoffeeOrders', JSON.stringify(orders));
}

// ฟังก์ชันสำหรับ Google Maps
function initMap() {
    // ตำแหน่งเริ่มต้น (กรุงเทพฯ)
    const bangkok = { lat: 13.7563, lng: 100.5018 };
    
    // สร้างแผนที่
    map = new google.maps.Map(document.getElementById('map'), {
        center: bangkok,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false
    });
    
    // สร้างมาร์คเกอร์
    marker = new google.maps.Marker({
        position: bangkok,
        map: map,
        draggable: true,
        title: 'ตำแหน่งจัดส่ง'
    });
    
    // อัพเดทตำแหน่งเมื่อลากมาร์คเกอร์
    marker.addListener('dragend', function() {
        const position = marker.getPosition();
        document.getElementById('customer-lat').value = position.lat();
        document.getElementById('customer-lng').value = position.lng();
    });
    
    // ใช้ Geolocation API เพื่อระบุตำแหน่งปัจจุบันของผู้ใช้
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                map.setCenter(pos);
                marker.setPosition(pos);
                
                document.getElementById('customer-lat').value = pos.lat;
                document.getElementById('customer-lng').value = pos.lng;
            },
            function() {
                // กรณีผู้ใช้ไม่อนุญาตให้เข้าถึงตำแหน่ง
                console.log('ไม่สามารถระบุตำแหน่งปัจจุบันได้');
            }
        );
    }
    
    // เพิ่ม autocomplete สำหรับช่องกรอกที่อยู่
    const addressInput = document.getElementById('customer-address');
    const autocomplete = new google.maps.places.Autocomplete(addressInput);
    
    // อัพเดทแผนที่เมื่อเลือกที่อยู่จาก autocomplete
    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        
        if (!place.geometry) {
            return;
        }
        
        // อัพเดทแผนที่
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
        
        // บันทึกตำแหน่ง
        document.getElementById('customer-lat').value = place.geometry.location.lat();
        document.getElementById('customer-lng').value = place.geometry.location.lng();
    });
}

// เริ่มต้นเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบว่ามีการโหลด Google Maps API แล้วหรือไม่
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    }
});

// เพิ่ม CSS สำหรับข้อความยืนยันการเพิ่มสินค้าลงตะกร้า
const style = document.createElement('style');
style.textContent = `
.add-to-cart-confirmation {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #6f4e37;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.fade-out {
    animation: fade-out 0.3s ease-out forwards;
}

@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;

document.head.appendChild(style);

// แก้ไข API Key ของ Google Maps
window.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[src*="maps.googleapis.com"]');
    if (script) {
        // ในระบบจริงควรใช้ API Key ที่ถูกต้อง
        const src = script.src.replace('YOUR_API_KEY', 'AIzaSyD_placeholder_key_for_demo');
        script.src = src;
    }
});