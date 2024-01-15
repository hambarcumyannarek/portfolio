const likeBtns = document.querySelectorAll('.likeBtn');
const wishlistLength = document.querySelector('.wishlistLength');

likeBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        const productId = btn.getAttribute('data-productId');
        fetch('/wishlist', {
            method: 'delete',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({productId})
        }).then(() => {
            wishlistLength.innerText = +wishlistLength.innerText - 1;
            document.getElementById(`${productId}`).style.display = 'none';
        })
    })
})