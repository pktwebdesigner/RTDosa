
let cartItems = [];
let totalAmount = 0;

this.document.addEventListener('DOMContentLoaded', function () {
    const currentPage = document.querySelector('body').id;
    console.log(currentPage);

    if (currentPage === 'tableReservation') {
        const personSelect = document.getElementById('personSelect')
        const option1 = document.createElement('option');
        option1.value = 0;
        option1.text = 'select no of persons';
        personSelect.appendChild(option1);

        for (let i = 2; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i + 'persons';
            personSelect.appendChild(option);
        }

        //dateselect function
        const dateSelect = document.getElementById('dateSelect');
        const currentDate = new Date()
        const option2 = document.createElement('option');
        option2.value = 0;
        option2.text = 'select a date';
        dateSelect.appendChild(option2);

        const timeSelect = document.getElementById('timeSelect');
        const options = document.createElement('option');
        options.value = 0;
        options.text = 'Select a Time';
        timeSelect.appendChild(options);

        for (let i = 0; i <= 20; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            const option = document.createElement('option');
            if (date.getDay() == 2) {
                option.value = 2;
                option.text = 'Closed';
            }
            else {
                option.value = formatDate(date);
                option.text = formatDate(date);
            }

            dateSelect.appendChild(option);
        }

        dateSelect.addEventListener('change', function () {
            const selectedValue = dateSelect.value;
            populateTime(selectedValue);
        })
    }
})


function populateTime(selectedValue) {
    const timeSelect = document.getElementById('timeSelect');

    timeSelect.innerHTML = '';
    const option = document.createElement('option');
    option.value = 0;
    option.text = 'Select a Time';
    timeSelect.appendChild(option);
    const date = new Date(selectedValue);
    console.log(date.getDay());
    if (selectedValue == 2) {
        timeSelect.disabled = true;
    }

    else if (date.getDay() == 6 || date.getDay() == 0) {
        for (let i = 12; i <= 22; i++) {
            for (let j = 0; j < 60; j += 30) {
                timeSelect.disabled = false;
                const formatedDate = i + ":" + (j === 0 ? '00' : j);
                const option = document.createElement('option');
                option.value = formatedDate;
                option.text = formatedDate;
                timeSelect.appendChild(option);
            }
        }
    }
    else {
        for (let i = 17; i <= 22; i++) {
            for (let j = 0; j < 60; j += 30) {
                timeSelect.disabled = false;
                const formatedDate = i + ":" + (j === 0 ? '00' : j);
                const option = document.createElement('option');
                option.value = formatedDate;
                option.text = formatedDate;
                timeSelect.appendChild(option);
            }
        }
    }
}


function formatDate(date) {
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString('en-US', options);
}


var myCarousel = new bootstrap.Carousel(document.getElementById('myCarousel'), {
    interval: false,
    wrap: false
});

function toggleNavbar() {
    const navbar = document.getElementById("homeNav");
    navbar.classList.toggle('responsive');
}

function goToOrderPage() {
    window.location.href = 'orderOnline.html'
}

function tableReservation() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('customDialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('customDialog').style.display = 'none';

}

function confirmReservation() {
    document.getElementById('confirmDialog').style.display = 'block';
}
function closeconfirmDialog() {
    document.getElementById('confirmDialog').style.display = 'none';
}

function goToHome() {
    window.location.href = 'index.html'
}

function scrollToTop() {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera

}

function scrollFunction() {
    console.log("document resie")
    var ScrollTopButton = document.getElementById("scrollToTopbtn");
    var header = document.querySelector('nav');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        ScrollTopButton.style.display = "block";
    }
    else {
        ScrollTopButton.style.display = "none";
    }
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
}


//Add Item to cart


function addToCart(row) {
    const itemValue = row.querySelector('td[data-item]').dataset.item;
    const itemPrice = parseFloat(row.querySelector('td[data-price]').dataset.price);
    console.log(itemValue, itemPrice)
    const item = { itemValue, itemPrice };
    cartItems.push(item);
    updateCart()
}

function updateCart() {
    const cartElement = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    //clear previous items
    cartElement.innerHTML = '';

    //display Current Items
    cartItems.forEach(item => {
        console.log(item)
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
    <span>${item.itemValue}</span><span>${item.itemPrice.toFixed(2)}</span>`;
        cartElement.appendChild(itemElement)
    });
    const total = cartItems.reduce((sum, item) => sum + item.itemPrice, 0);
    console.log(total)
    totalElement.textContent = total.toFixed(2);
    localStorage.setItem('ItemAmount', total.toFixed(2))
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = false;
}
function checkout() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('payment').style.display = 'block';
}

function checkboxchanged(checkboxName) {
    const collection = document.getElementById('collection');
    const delivery = document.getElementById('delivery');
    const contactDetails = document.getElementById('contactDetails');
    const totalAmounts = document.getElementById('totalAmount');
    const itemAmount = localStorage.getItem('ItemAmount');
    const itemElement = document.createElement('div');
    itemElement.innerHTML = `
    <div>
    <p>Item Amount<span>£${itemAmount}</span></p>
    <p>Total Amount<span>£${itemAmount}</span></p>
    </div>`;
    totalAmounts.appendChild(itemElement);

    if (checkboxName === 'collection' && collection.checked) {
        delivery.checked = false;
        contactDetails.style.display = 'none';
        console.log("collection");
    } else if (checkboxName === 'delivery' && delivery.checked) {
        console.log("delivery");
        collection.checked = false;
        contactDetails.style.display = 'block';
    } else if (checkboxName === 'collection' && !collection.checked) {
        delivery.checked = true;
        contactDetails.style.display = 'block';
    }
    else if (checkboxName === 'delivery' && !delivery.checked) {
        collection.checked = true;
        contactDetails.style.display = 'none';
    }
    if (collection.checked) {
        totalAmounts.innerHTML = '';
        itemElement.innerHTML = `
        <div>
        <p>Item Amount<span>£${itemAmount}</span></p>
        <p>Total Amount<span>£${itemAmount}</span></p>
        </div>`;
        totalAmounts.appendChild(itemElement);
    }
    else if (delivery.checked) {
        totalAmounts.innerHTML = '';
        itemElement.innerHTML = `
        <p>Item Amount<span>£${itemAmount}</span></p>
        <p>Delivery Charge<span>£2.00</span>
        <p>Total Amount<span>£${parseFloat(itemAmount)+2}</span>`;
        totalAmounts.appendChild(itemElement);
    }

}
function paymentDialog() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('payment').style.display = 'none';
    localStorage.removeItem('ItemAmount');

}