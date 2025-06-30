/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu Show */
if(navToggle) {
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu Hidden */
if(navClose) {
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')

    this.scrollY >= 50 ? header.classList.add('shadow-header')
                        : header.classList.remove('shadow-header')
}

window.addEventListener('scroll', shadowHeader)

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper('.popular__swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scrollup')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                    : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link')
        }else{
            sectionClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal ({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
})

sr.reveal('.home__data, .popular__container, .footer')
sr.reveal('.home__board', {delay: 700, distance: '100px', origin: 'right'})
sr.reveal('.home__pizza', {delay: 1400, distance: '100px', origin: 'bottom', rotate: {z: -90}})
sr.reveal('.home__ingredient', {delay: 2000, interval: 100})
sr.reveal('.about__data, .recipe__list, .contact__data', {origin: 'right'})
sr.reveal('.about__img, .recipe__img, .contact__image', {origin: 'left'})
sr.reveal('.products__card', {interval: 100})



/*=============== CART FUNCTIONALITY ===============*/
const cartIcon = document.querySelector('.cart__icon');
const cartDropdown = document.querySelector('.cart__dropdown');
const cartItemsContainer = document.querySelector('.cart__items');
const cartCount = document.querySelector('.cart__count');
const cartTotal = document.querySelector('.cart__total-amount');
const cartCheckout = document.querySelector('.cart__checkout');
const cartClear = document.querySelector('.cart__clear');

let cart = [];

// Toggle cart dropdown
cartIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  cartDropdown.classList.toggle('show-cart');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
  if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
    cartDropdown.classList.remove('show-cart');
  }
});

// Add to cart functionality
function addToCart(productName, productPrice, productImg) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      img: productImg,
      quantity: 1
    });
  }
  
  updateCart();
}

// Remove from cart
function removeFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

// Update cart UI
function updateCart() {
  // Clear cart items
  cartItemsContainer.innerHTML = '';
  
  let total = 0;
  let itemCount = 0;
  
  // Add each item to cart
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart__item';
    
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart__item-img">
      <div class="cart__item-info">
        <h4 class="cart__item-name">${item.name}</h4>
        <span class="cart__item-price">$${item.price} x ${item.quantity}</span>
      </div>
      <i class="ri-delete-bin-line cart__item-remove"></i>
    `;
    
    cartItemsContainer.appendChild(cartItem);
    
    // Add event listener to remove button
    const removeBtn = cartItem.querySelector('.cart__item-remove');
    removeBtn.addEventListener('click', () => removeFromCart(index));
    
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });
  
  // Update total and count
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = itemCount;
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear cart
cartClear.addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Checkout (just an alert for demo)
cartCheckout.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert(`Order placed! Total: $${cartTotal.textContent}`);
  cart = [];
  updateCart();
});

// Initialize cart from localStorage
function initCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Add click event to all "Add to Cart" buttons
document.querySelectorAll('.products__button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.products__card');
    const productName = productCard.querySelector('.products__name').textContent.trim();
    const productPrice = parseFloat(productCard.querySelector('.products__price').textContent.replace('$', ''));
    const productImg = productCard.querySelector('.products__img').src;
    
    addToCart(productName, productPrice, productImg);
    
    // Show cart dropdown
    cartDropdown.classList.add('show-cart');
  });
});

// Initialize cart when page loads
initCart();
