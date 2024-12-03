let products = [
    {
        name: 'Short-Sleeved Embroidered Cotton',
        image1: './images/baju5.png',
        image2: './images/baju3.png',
        old_price: '20.xxx.xxx',
        curr_price: '15.000.000 IDR'
    },
    {
        name: 'Workwear Cotton Canvas Blouson',
        image1: './images/baju1.png',
        image2: './images/baju2.png',
        old_price: '35.xxx.xxx',
        curr_price: '25.400.000 IDR'
    },
    {
        name: 'Embossed LV Crewneck With LV Crystal Patch',
        image1: './images/baju20.png',
        image2: './images/baju21.png',
        old_price: '40.xxx.xxx',
        curr_price: '37.000.000 IDR'
    },
    {
        name: 'Embroidered Signature Short-Sleeved',
        image1: './images/baju22.png',
        image2: './images/baju23.png',
        old_price: '23.xxx.xxx',
        curr_price: '20.000.000 IDR'
    },
    {
        name: 'LV Blason Embroidered Denim Blouson',
        image1: './images/baju24.png',
        image2: './images/baju25.png',
        old_price: '57.XXX.XXX',
        curr_price: '50.000.000 IDR'
    },
    
]

let product_list = document.querySelector('#products')

renderProducts = (products) => {
    products.forEach(e => {
        let prod = `
            <div class="col-4 col-md-6 col-sm-12">  
                <div class="product-card">
                    <div class="product-card-img">
                        <img src="${e.image1}" alt="">
                        <img src="${e.image2}" alt="">
                    </div>
                    <div class="product-card-info">
                        <div class="product-btn">
                            <a href="./product-detail.html" class="btn-flat btn-hover btn-shop-now">shop now</a>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-cart-add'></i>
                            </button>
                            <button class="btn-flat btn-hover btn-cart-add">
                                <i class='bx bxs-heart'></i>
                            </button>
                        </div>
                        <div class="product-card-name">
                            ${e.name}
                        </div>
                        <div class="product-card-price">
                            <span><del>${e.old_price}</del></span>
                            <span class="curr-price">${e.curr_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        product_list.insertAdjacentHTML("beforeend", prod)
    })
}

// Render products sekali saja
renderProducts(products)

let filter_col = document.querySelector('#filter-col')

document.querySelector('#filter-toggle').addEventListener('click', () => filter_col.classList.toggle('active'))

document.querySelector('#filter-close').addEventListener('click', () => filter_col.classList.toggle('active'))
