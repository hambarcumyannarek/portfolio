export function update() {
    let wishlistBtns = document.querySelectorAll('.wishlistBtn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
    
            if(btn.className.search('active') !== -1) {
                fetch('/wishlist', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({productId: btn.getAttribute('data-id')})
                })
            } else {
                fetch('/wishlist', {
                    method: 'delete',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({productId: btn.getAttribute('data-id')})
                })
            }
    
        })
    })
}

update()