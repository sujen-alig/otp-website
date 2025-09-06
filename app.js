// Phone data from provided JSON
const phones = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        originalPrice: "₹1,34,900",
        discountedPrice: "₹1,199",
        discount: "99%",
        rating: 4.8,
        reviews: 1247,
        specs: ["A17 Pro Chip", "48+12+12 MP Camera", "12 MP TrueDepth", "6.7″ Super Retina XDR", "8 GB RAM", "4441 mAh"],
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
        features: ["5G Ready", "Face ID", "Wireless Charging", "Water Resistant"]
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        originalPrice: "₹1,29,999",
        discountedPrice: "₹1,199",
        discount: "99%",
        rating: 4.7,
        reviews: 2156,
        specs: ["Snapdragon 8 Gen 3", "200+50+12+10 MP Camera", "12 MP Front", "6.8″ Dynamic AMOLED 2X", "12 GB RAM", "5000 mAh"],
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
        features: ["S Pen", "5G", "120Hz Display", "Fast Charging"]
    },
    {
        id: 3,
        name: "OnePlus 12 Pro",
        brand: "OnePlus",
        originalPrice: "₹64,999",
        discountedPrice: "₹1,199",
        discount: "98%",
        rating: 4.6,
        reviews: 892,
        specs: ["Snapdragon 8 Gen 3", "50+64+48 MP Camera", "32 MP Front", "6.82″ LTPO AMOLED", "16 GB RAM", "5400 mAh"],
        image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300",
        features: ["Hasselblad Camera", "150W Charging", "5G", "OxygenOS 14"]
    },
    {
        id: 4,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        originalPrice: "₹1,06,999",
        discountedPrice: "₹1,199",
        discount: "99%",
        rating: 4.5,
        reviews: 743,
        specs: ["Google Tensor G3", "50+48+48 MP Camera", "10.5 MP Front", "6.7″ LTPO OLED", "12 GB RAM", "5050 mAh"],
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300",
        features: ["AI Photography", "Pure Android", "5G", "Wireless Charging"]
    },
    {
        id: 5,
        name: "Xiaomi 14 Pro",
        brand: "Xiaomi",
        originalPrice: "₹79,999",
        discountedPrice: "₹1,199",
        discount: "98%",
        rating: 4.4,
        reviews: 1534,
        specs: ["Snapdragon 8 Gen 3", "50+50+50 MP Camera", "32 MP Front", "6.73″ LTPO AMOLED", "12 GB RAM", "4880 mAh"],
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300",
        features: ["Leica Camera", "120W HyperCharge", "5G", "MIUI 14"]
    },
    {
        id: 6,
        name: "vivo X100 Pro",
        brand: "vivo",
        originalPrice: "₹89,999",
        discountedPrice: "₹1,199",
        discount: "98%",
        rating: 4.3,
        reviews: 689,
        specs: ["Dimensity 9300", "50+50+64 MP Camera", "32 MP Front", "6.78″ LTPO AMOLED", "16 GB RAM", "5400 mAh"],
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300",
        features: ["Zeiss Optics", "120W FlashCharge", "5G", "Funtouch OS 14"]
    },
    {
        id: 7,
        name: "OPPO Find X7 Pro",
        brand: "OPPO",
        originalPrice: "₹99,999",
        discountedPrice: "₹1,199",
        discount: "99%",
        rating: 4.2,
        reviews: 456,
        specs: ["Snapdragon 8 Gen 3", "50+50+64 MP Camera", "32 MP Front", "6.82″ LTPO AMOLED", "16 GB RAM", "5000 mAh"],
        image: "https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?w=300",
        features: ["Hasselblad Camera", "100W SuperVOOC", "5G", "ColorOS 14"]
    },
    {
        id: 8,
        name: "Realme GT 5 Pro",
        brand: "Realme",
        originalPrice: "₹54,999",
        discountedPrice: "₹1,199",
        discount: "98%",
        rating: 4.1,
        reviews: 1023,
        specs: ["Snapdragon 8 Gen 3", "50+8+2 MP Camera", "16 MP Front", "6.7″ AMOLED", "12 GB RAM", "5240 mAh"],
        image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300",
        features: ["150W UltraDart", "5G", "realme UI 5.0", "Gaming Optimization"]
    }
];

// Razorpay Configuration
const razorpayConfig = {
    key: "rzp_test_1DP5mmOlF5G5ag",
    currency: "INR",
    amount: 119900,
    name: "Flipkart Electronics Store",
    description: "Smartphone Purchase - Mega Sale Offer",
    theme: {
        color: "#2874F0"
    }
};

// Application state
let selectedPhone = null;
let userAddress = null;
let orderData = null;
let paymentData = null;

// Timer functionality
let countdownTimer = null;
let timeLeft = 12 * 60;

function startCountdown() {
    const timerElement = document.getElementById('countdown-timer');
    if (!timerElement) return;
    
    countdownTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            timerElement.textContent = "EXPIRED";
            timerElement.style.background = "#FF6164";
        }
        
        timeLeft--;
    }, 1000);
}

// Page navigation
function navigateToPage(pageClass) {
    console.log('Navigating to:', pageClass);
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.querySelector(`.${pageClass}`);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Successfully navigated to:', pageClass);
    }
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    return stars;
}

// Render products with event delegation
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = phones.map(phone => `
        <div class="product-card" data-phone-id="${phone.id}">
            <img src="${phone.image}" alt="${phone.name}" class="product-image" 
                 onerror="this.src='https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300'">
            
            <div class="product-brand">${phone.brand}</div>
            <h3 class="product-name">${phone.name}</h3>
            
            <div class="product-rating">
                <span class="rating-stars">${generateStars(phone.rating)}</span>
                <span class="rating-text">${phone.rating} (${phone.reviews.toLocaleString()})</span>
            </div>
            
            <div class="product-specs">
                <div class="specs-list">
                    ${phone.specs.slice(0, 3).map(spec => `<span class="spec-tag">${spec}</span>`).join('')}
                </div>
            </div>
            
            <div class="product-features">
                <div class="features-list">
                    ${phone.features.slice(0, 2).map(feature => `<span class="feature-tag">✓ ${feature}</span>`).join('')}
                </div>
            </div>
            
            <div class="product-price">
                <div>
                    <span class="original-price">${phone.originalPrice}</span>
                    <span class="discounted-price">${phone.discountedPrice}</span>
                    <span class="discount-badge">${phone.discount} off</span>
                </div>
            </div>
            
            <button class="buy-btn" data-phone-id="${phone.id}">
                🔥 Buy Now - Only ₹1,199
            </button>
        </div>
    `).join('');
    
    // Add event delegation for buy buttons
    productsGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-btn')) {
            e.preventDefault();
            const phoneId = parseInt(e.target.getAttribute('data-phone-id'));
            buyNow(phoneId);
        }
    });
}

// Buy now functionality - Fixed with proper phone selection
function buyNow(phoneId) {
    console.log('Buy now clicked for phone ID:', phoneId);
    
    // Find the correct phone
    selectedPhone = phones.find(phone => phone.id === phoneId);
    
    if (selectedPhone) {
        console.log('Selected phone:', selectedPhone.name, selectedPhone.id);
        
        // Clear any existing data first
        userAddress = null;
        orderData = null;
        paymentData = null;
        
        // Update displays
        updateSelectedProductDisplay();
        
        // Navigate to address page
        navigateToPage('address-page');
    } else {
        console.error('Phone not found with ID:', phoneId);
        alert('Error selecting product. Please try again.');
    }
}

// Update selected product display - Fixed to show correct product
function updateSelectedProductDisplay() {
    if (!selectedPhone) {
        console.error('No phone selected');
        return;
    }
    
    console.log('Updating display for:', selectedPhone.name);
    
    const productHTML = `
        <div class="selected-product-info">
            <img src="${selectedPhone.image}" alt="${selectedPhone.name}" class="selected-product-image" 
                 onerror="this.src='https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300'">
            <div class="selected-product-details">
                <h3>${selectedPhone.name}</h3>
                <div class="selected-product-price">₹1,199</div>
                <div style="color: #878787; font-size: 14px; margin-top: 8px;">
                    ${selectedPhone.specs.slice(0, 2).join(' • ')}
                </div>
                <div style="color: #388E3C; font-size: 12px; font-weight: bold; margin-top: 4px;">
                    ✓ ${selectedPhone.features.slice(0, 2).join(' ✓ ')}
                </div>
            </div>
        </div>
    `;
    
    // Update address page
    const addressDisplay = document.getElementById('selected-product-address');
    if (addressDisplay) {
        addressDisplay.innerHTML = productHTML;
    }
    
    // Update payment page
    const orderSummary = document.getElementById('order-summary');
    if (orderSummary) {
        orderSummary.innerHTML = `
            <h3>Order Summary</h3>
            ${productHTML}
            <div style="border-top: 1px solid #e0e0e0; margin-top: 20px; padding-top: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Product Price:</span>
                    <span style="text-decoration: line-through; color: #878787;">${selectedPhone.originalPrice}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Discounted Price:</span>
                    <span style="color: #388E3C; font-weight: bold;">₹1,199</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Delivery Charges:</span>
                    <span style="color: #388E3C;">FREE</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; border-top: 1px solid #e0e0e0; padding-top: 8px; color: #2874F0;">
                    <span>Total Amount:</span>
                    <span>₹1,199</span>
                </div>
            </div>
        `;
    }
    
    // Update confirmation page
    const orderDetails = document.getElementById('order-details');
    if (orderDetails) {
        orderDetails.innerHTML = `
            <h3>Order Details</h3>
            ${productHTML}
            <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
                <div><strong>Amount Paid:</strong> ₹1,199</div>
                <div><strong>Payment Method:</strong> Razorpay Secure Payment</div>
                <div><strong>Discount Applied:</strong> ${selectedPhone.discount} OFF</div>
            </div>
        `;
    }
}

// Address form handling - Fixed form field issues
function setupAddressForm() {
    console.log('Setting up address form');
    
    // Wait for DOM to be ready, then setup form
    setTimeout(() => {
        const addressForm = document.getElementById('address-form');
        if (!addressForm) {
            console.log('Address form not found, retrying...');
            return;
        }
        
        console.log('Address form found, adding event listener');
        
        // Remove existing listeners and clone form to ensure clean state
        const newForm = addressForm.cloneNode(true);
        addressForm.parentNode.replaceChild(newForm, addressForm);
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Form submitted');
            
            // Get values from form fields using querySelector to avoid caching issues
            const fullNameField = document.querySelector('#fullName');
            const phoneField = document.querySelector('#phone');
            const addressField = document.querySelector('#address');
            const cityField = document.querySelector('#city');
            const stateField = document.querySelector('#state');
            const pincodeField = document.querySelector('#pincode');
            
            if (!fullNameField || !phoneField || !addressField || !cityField || !stateField || !pincodeField) {
                console.error('Form fields not found');
                alert('Form error. Please refresh the page and try again.');
                return;
            }
            
            const fullName = fullNameField.value.trim();
            const phone = phoneField.value.trim();
            const address = addressField.value.trim();
            const city = cityField.value.trim();
            const state = stateField.value.trim();
            const pincode = pincodeField.value.trim();
            
            console.log('Form values:', { fullName, phone, address, city, state, pincode });
            
            // Validate fields
            if (!fullName) {
                alert('Please enter your full name');
                fullNameField.focus();
                return;
            }
            
            if (!phone || !/^[0-9]{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit mobile number');
                phoneField.focus();
                return;
            }
            
            if (!address) {
                alert('Please enter your address');
                addressField.focus();
                return;
            }
            
            if (!city) {
                alert('Please enter your city');
                cityField.focus();
                return;
            }
            
            if (!state) {
                alert('Please enter your state');
                stateField.focus();
                return;
            }
            
            if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
                alert('Please enter a valid 6-digit pincode');
                pincodeField.focus();
                return;
            }
            
            // Store data
            userAddress = {
                fullName,
                phone, 
                address,
                city,
                state,
                pincode
            };
            
            console.log('Address saved:', userAddress);
            
            // Update product display for payment page
            updateSelectedProductDisplay();
            
            // Navigate to payment page
            navigateToPage('payment-page');
        });
    }, 100);
}

// Create Razorpay order
async function createRazorpayOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const orderId = 'order_' + Math.random().toString(36).substr(2, 9);
            resolve({
                id: orderId,
                amount: razorpayConfig.amount,
                currency: razorpayConfig.currency
            });
        }, 500);
    });
}

// Setup payment
function setupPayment() {
    console.log('Setting up payment');
    
    setTimeout(() => {
        const payNowBtn = document.getElementById('pay-now-btn');
        if (!payNowBtn) {
            console.log('Pay now button not found');
            return;
        }
        
        payNowBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('Pay now button clicked');
            
            if (!selectedPhone) {
                alert('Error: No product selected');
                return;
            }
            
            if (!userAddress) {
                alert('Error: Please complete the address form first');
                return;
            }
            
            showLoading();
            
            try {
                const order = await createRazorpayOrder();
                
                const options = {
                    key: razorpayConfig.key,
                    amount: order.amount,
                    currency: order.currency,
                    name: razorpayConfig.name,
                    description: `${selectedPhone.name} - ${razorpayConfig.description}`,
                    order_id: order.id,
                    theme: razorpayConfig.theme,
                    prefill: {
                        name: userAddress.fullName,
                        contact: userAddress.phone,
                        email: 'customer@flipkart.com'
                    },
                    handler: function(response) {
                        hideLoading();
                        processPaymentSuccess(response, order);
                    },
                    modal: {
                        ondismiss: function() {
                            hideLoading();
                            alert('Payment cancelled. Please try again.');
                        }
                    }
                };
                
                hideLoading();
                const rzp = new Razorpay(options);
                rzp.open();
                
            } catch (error) {
                console.error('Payment error:', error);
                hideLoading();
                alert('Payment initialization failed. Please try again.');
            }
        });
    }, 100);
}

// Process payment success
function processPaymentSuccess(razorpayResponse, orderDetails) {
    console.log('Processing payment success');
    
    paymentData = {
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        amount: orderDetails.amount
    };
    
    const currentDate = new Date(2025, 8, 7);
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 5);
    
    orderData = {
        orderId: 'FLP' + Date.now().toString().slice(-8),
        phone: selectedPhone,
        address: userAddress,
        payment: paymentData,
        orderDate: currentDate,
        deliveryDate: deliveryDate,
        amount: 1199
    };
    
    updatePaymentSuccessInfo();
    updateDeliveryInfo();
    navigateToPage('confirmation-page');
}

// Update payment success info
function updatePaymentSuccessInfo() {
    const paymentSuccessInfo = document.getElementById('payment-success-info');
    
    if (paymentSuccessInfo && paymentData) {
        paymentSuccessInfo.innerHTML = `
            <h3>🎉 Payment Successful!</h3>
            <div style="text-align: left; margin-top: 16px;">
                <div style="margin-bottom: 8px;"><strong>Transaction ID:</strong> ${paymentData.razorpay_payment_id}</div>
                <div style="margin-bottom: 8px;"><strong>Amount Deducted:</strong> ₹1,199</div>
                <div style="margin-bottom: 8px;"><strong>Payment Status:</strong> <span style="color: #388E3C;">✓ Confirmed</span></div>
                <div style="font-size: 12px; color: #878787; margin-top: 12px;">
                    Real money has been deducted from your account via Razorpay secure gateway.
                </div>
            </div>
        `;
    }
}

// Update delivery info
function updateDeliveryInfo() {
    const deliveryDateElement = document.getElementById('delivery-date');
    const orderIdElement = document.getElementById('order-id');
    
    if (deliveryDateElement && orderData) {
        const deliveryDateStr = orderData.deliveryDate.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        deliveryDateElement.innerHTML = `
            <strong>📦 Expected Delivery:</strong><br>
            <span style="color: #388E3C; font-size: 18px;">${deliveryDateStr}</span><br>
            <small style="color: #878787;">Your order will be delivered within 5 days</small>
        `;
    }
    
    if (orderIdElement && orderData) {
        orderIdElement.textContent = orderData.orderId;
    }
}

// Loading overlay
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productBrand = card.querySelector('.product-brand').textContent.toLowerCase();
            
            const isVisible = searchTerm === '' || 
                            productName.includes(searchTerm) || 
                            productBrand.includes(searchTerm);
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    searchInput.addEventListener('input', performSearch);
}

// Initialize application
function initApp() {
    console.log('Initializing Flipkart application...');
    
    try {
        renderProducts();
        startCountdown();
        setupAddressForm();
        setupPayment();
        setupSearch();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', initApp);

window.addEventListener('beforeunload', function() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
});

// Global functions
window.navigateToPage = navigateToPage;
window.buyNow = buyNow;