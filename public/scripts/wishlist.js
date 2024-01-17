const likeBtns = document.querySelectorAll('.likeBtn');
const wishlistLength = document.querySelector('.wishlistLength');

likeBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        const productId = btn.getAttribute('data-productId');
        fetch(`/wishlist/${btn.getAttribute('data-productId')}`, {
            method: 'delete'
        }).then(() => {
            wishlistLength.innerText = +wishlistLength.innerText - 1;
            document.getElementById(`${productId}`).style.display = 'none';
        })
    })
})