
const chooses = document.querySelectorAll('.propertyInputs .choose');

function removeAllActive(elements) {
    elements.forEach(val => val.classList.remove('active'));
}

chooses.forEach(choose => {
    const chooseBtns = choose.querySelectorAll('.btn');
    const chooseInput = choose.querySelector('.chooseInput');
    chooseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            removeAllActive(chooseBtns);
            btn.classList.add('active');
            chooseInput.value = btn.getAttribute('data-count');
        })
    })
})





const fileInput = document.querySelector('#file');
const removeImgesId = document.querySelector('.removeImage');
const fileBox = document.querySelector('.images');

function returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }

fileInput.addEventListener('change', () => {
    fileBox.innerHTML = '';
    removeImgesId.value = '';
    for(let k in fileInput.files) {
        if(parseInt(k) * 1 == parseInt(k)) { // because when k === 0 if(parseInt(k)) this mexanizm falsy
            var imgDate = fileInput.files[k]
        } else {
            break;
        }
        const img = URL.createObjectURL(imgDate);
        // console.log(img)
        fileBox.innerHTML += `
        <div class="img">
            <div class="top">
                <div class="closeImg" data-img-key="${k}"><i class="fa-solid fa-xmark"></i></div>
                <div class="imgInfo">
                    <p>${imgDate.name}</p>
                    <p>${returnFileSize(imgDate.size)}</p>
                </div>
            </div>
            <img src="${img}" alt="img">
        </div>
        `;
    }
    // console.log(fileInput.files);

    document.querySelectorAll('.closeImg').forEach(btn => {
        btn.addEventListener('click', (evn) => {
            function recursia(element) {
                if(element.parentElement.className.search('img') !== -1) {
                    return element.parentElement;
                }
                return recursia(element.parentElement);
            }
            recursia(btn).style.display = 'none';
            removeImgesId.value += btn.getAttribute('data-img-key');
        })
    })
})

