(function sendRequest() {

    let search = document.querySelector("#search");

    search.addEventListener('keyup', (e) => {

        if (e.key !== "ArrowDown") {

            let xhr = new XMLHttpRequest();
            let keyword = e.target.value;
            let form = new FormData();
            form.set("keyword", keyword);

            xhr.open('POST', "acHandler.php");

            xhr.onreadystatechange = function () {

                if (xhr.readyState === 4 && xhr.status === 200) {
                    let results = xhr.response;
                    console.log(results);
                    results = results.split(' ', 11);
                    results.pop();
                    recommend(results);
                }
            }
            xhr.send(form);
        }

        if (e.key == "Enter") {
            e.target.submit();
        }
    })

})();

function recommend(keywords) {

    let box = document.createElement('div');
    box.id = "recommended";
    let form = document.querySelector("form");
    let i = 0;
    keywords.forEach(keyword => {
        let word = document.createElement('div');
        word.classList.add('recommended')
        word.innerHTML = `<span>${keyword}</span>`;
        word.setAttribute('tabindex', i);
        i++;
        box.appendChild(word);
    })
    form.replaceChild(box, form.lastElementChild);
    selectKeyword();
}

function selectKeyword() {
    let input = document.querySelector('#search');

    let keywords = document.querySelectorAll('.recommended');

    let numberOfResults = keywords.length;

    input.addEventListener('keyup', (e) => {

        if (e.key == "ArrowDown" && keywords.length > 0) {
            keywords[0].classList.add('active');
            keywords[0].focus();
        }

    })

    keywords.forEach(keyword => {
        keyword.addEventListener('click', () => {
            input.value = keyword.textContent;
            document.querySelector("#recommended").innerHTML = '';
            input.focus();
        })

        keyword.addEventListener('mouseover', () => {
            keywords.forEach(others => {
                others.classList.remove('active');
                x
            })
            keyword.classList.add('active');
        })

        keyword.addEventListener('mouseleave', () => {
            keyword.classList.remove('active');
        })
        keyword.addEventListener('keyup', (e) => {

            switch (e.key) {
                case "ArrowDown":
                    if (keyword.nextElementSibling) {

                        keyword.classList.remove('active');
                        keyword.nextElementSibling.classList.add('active');
                        keyword.nextElementSibling.focus();

                    }
                    break;

                case "ArrowUp":
                    if (keyword.previousElementSibling) {

                        keyword.classList.remove('active');
                        keyword.previousElementSibling.classList.add('active');
                        keyword.previousElementSibling.focus();

                    } else {
                        input.focus()
                        keyword.classList.remove('active');
                    }
                    break;

                case "Enter":
                    input.value = keyword.textContent;
                    document.querySelector("#recommended").innerHTML = '';
                    input.focus();
                    break;

                default:
                    break;

            }
        })
        keyword.addEventListener('blur', () => {
            keyword.classList.remove('active');
        })
    })
}