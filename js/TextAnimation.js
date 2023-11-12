
if (document.getElementById('AnimarTexto')) {
    Animar()
}

function Animar() {

    var Elemento = document.getElementById('AnimarTexto')
    var texto = Elemento.textContent
    var index = 0

    var intervalo = Math.max(30, Math.floor(2500 / texto.length));

    var tex = ""
    function exibirLetras() {
        if (index < texto.length) {
            var caracter = texto.charAt(index);

            tex += caracter

            Elemento.innerHTML = tex + "|"

            index++;
        } else {
            clearInterval(intervalId);
            Elemento.innerHTML = tex
        }
    }

    var intervalId = setInterval(exibirLetras, intervalo);

}