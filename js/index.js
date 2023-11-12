let toggle_menu = document.querySelectorAll('.toggle-side-menu')

var newChat = true
var intervalId

toggle_menu.forEach(btn1 => {
    if (btn1.classList.contains('hide') && document.querySelector('.sideMenu').classList.contains('open')) {
        btn1.style.display = "none"
    } else {
        btn1.style.display = "block"
    }
})

toggle_menu.forEach(btn => {
    btn.addEventListener('click', () => {
        let sideMenu = document.querySelector('.sideMenu')
        sideMenu.classList.toggle('open')

        toggle_menu.forEach(btn1 => {
            if (btn1.classList.contains('hide') && document.querySelector('.sideMenu').classList.contains('open')) {
                btn1.style.display = "none"
            } else {
                btn1.style.display = "block"
            }
        })

    })
})

if (document.getElementById('floatingInputValue')) {
    document.getElementById('floatingInputValue').addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {
            e.preventDefault()
            var data = ReturnData()

            data.forEach((item, id) => {

                if (item.recive == document.getElementById('floatingInputValue').value) {

                    document.querySelector('.chat').innerHTML += `
                        <div class="d-flex p-4">
                            <div class="flex-shrink-0 flex flex-col relative items-end me-4">
                                <div>
                                    <div class="d-flex align-items-center justify-content-center"
                                        style="width: 36px; height: 36px;">

                                        <img src="img/user.png" class="w-100 h-100 ">

                                    </div>
                                </div>

                            </div>
                            <div>
                                ${document.getElementById('floatingInputValue').value}
                            </div>
                        </div>
                    `

                    reponde(item.response, id)
                    if (newChat) {
                        AddChatHistory(item.chatName)
                        newChat = false
                    }


                    document.getElementById('floatingInputValue').value = ""
                }
            })
        }


    })
}
if (document.querySelector('.newchat')) {
    document.querySelector('.newchat').addEventListener('click', () => {
        newChat = true
        document.querySelector('.chat').innerHTML = ""
        clearInterval(intervalId);
    })

}

function reponde(texto, id) {

    var Textcontainers = document.querySelector('.chat').getElementsByClassName('chatItem')
    var boxId = Textcontainers.length
    var index = 0

    var intervalo = Math.max(10, Math.floor(1000 / texto.length));

    document.querySelector('.chat').innerHTML += `
        <div class="d-flex p-4 chatItem">
            <div class="flex-shrink-0 flex flex-col relative items-end me-4">
                <div>
                    <div style="width: 36px; height: 36px;">

                        <img src="img/logo.png" class="w-100 h-100 IAPFP">

                        <button onclick="say('${id}')" class="mt-3 btn p-0 btn-outline-info" style="width: 36px; height: 36px;"><i class="bi bi-mic-fill m-0"></i></button>

                    </div>
                </div>

            </div>
            <div id="Textcontainer${boxId}">
                
            </div>
        </div>
    `
    var tex = ""
    function exibirLetras() {
        if (index < texto.length) {
            var caracter = texto.charAt(index);

            if (caracter.toLowerCase() == "n" && texto.charAt(index - 1) == "/") {
                tex += ""
            } else {
                if (caracter == "/" && texto.charAt(index + 1).toLowerCase() == "n") {
                    tex += "<br>"
                } else {
                    tex += caracter
                }
            }

            document.getElementById(`Textcontainer${boxId}`).innerHTML = tex + "|"

            index++;
        } else {
            clearInterval(intervalId);
            document.getElementById(`Textcontainer${boxId}`).innerHTML = tex
        }
    }

    intervalId = setInterval(exibirLetras, intervalo);

}

function AddChatHistory(texto) {

    var Historico = document.querySelector('.Historico').getElementsByTagName('li')
    var bixId = Historico.length
    var index = 0

    var intervalo = Math.max(20, Math.floor(5000 / texto.length));

    document.querySelector('.Historico').innerHTML += `

        <li class="nav-item">
            <a href="#"
                class="text-decoration-none nav-link d-flex align-items-center justify-content-start">
                <i class="bi bi-chat-left-dots"></i>
                <span class="ms-3 escrevendo" id="histo${Historico.length}"></span>
            </a>
        </li>
    
    `

    function exibirLetras() {
        if (index < texto.length) {
            var caracter = texto.charAt(index);

            if (caracter.toLowerCase() == "n" && texto.charAt(index - 1) == "/") {
                document.getElementById(`histo${bixId}`).innerHTML += ""
            } else {
                if (caracter == "/" && texto.charAt(index + 1).toLowerCase() == "n") {
                    document.getElementById(`histo${bixId}`).innerHTML += "<br>"
                } else {
                    document.getElementById(`histo${bixId}`).innerHTML += caracter
                }
            }



            index++;
        } else {
            clearInterval(intervalId);

            document.getElementById(`histo${bixId}`).classList.remove("escrevendo")

        }
    }

    var intervalId = setInterval(exibirLetras, intervalo);

}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.launchmodal')) {
        document.querySelector('.launchmodal').click()
    }
    document.body.setAttribute('data-bs-theme', localStorage.getItem('theme'))
})

if (document.getElementById('checkboxTheme')) {
    document.getElementById('checkboxTheme').checked = false
    document.getElementById('checkboxTheme').addEventListener('click', () => {

        console.log("checkboxTheme");

        if (document.getElementById('checkboxTheme').checked) {
            document.body.setAttribute('data-bs-theme', "dark")
            localStorage.setItem('theme', "dark")
        } else {
            document.body.setAttribute('data-bs-theme', "light")
            localStorage.setItem('theme', "light")
        }
    })
}

