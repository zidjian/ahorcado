let btnInicar = document.getElementById('iniciar_juego');
let modal = document.querySelector('.estado');
const mostrar_mensaje = document.getElementById("mensaje");
const ahorcado_img = document.getElementById("ahorcado_img");
const mostrar_cadena = document.getElementById("palabra");
let btn_teclado = document.querySelectorAll('.btn');
let intentos = 6;


let estadoJuego = true;
let cadenaElegida = [];
let cadenaFormateada= [];
let cadenaEstado = [];

let cadenas = [
    'El valor de una idea radica en su uso',
    'No busques los errores, busca un remedio',
    'La vida es una aventura, atrévete',
    'Tu actitud, no tu aptitud, determinará tu altitud',
    'Tienes que hacer las cosas que crees que no puedes hacer ',
    'Si te caíste ayer levántate hoy',
    'Siempre parece imposible hasta que se hace',
    'No dejes que el miedo se interponga en tu camino',
    'Cuando pierdas, no pierdas la lección'
];

btnInicar.addEventListener( 'click', iniciar );

// btn_teclado.addEventListener( 'click', miLetra, false );
btn_teclado.forEach(btn => {
    let letra = btn.textContent;
    btn.addEventListener('click', function( event ) {
        btn.setAttribute("disabled", "");
        comprobarLetra( letra );
    } );
});

function comprobarLetra( letra ) {
    let correcto = false;
    cadenaElegida.map( function( valor, index ) {
        if( valor == letra ) {
            cadenaEstado[index] = letra;
            correcto = true;
        }
    } );
    if( correcto == true) {
        mostrar_mensaje.innerHTML = 'Letra correcta';
    } else {
        intentos--;
        if ( intentos == 0 ) {
            finJuego( 'game_over' );
        }
        mostrar_mensaje.innerHTML = 'Letra incorrecta. Intentos restantes: ' + intentos;
        ahorcado_img.setAttribute('src', 'recursos/img/ahorcado' + ( 7 - intentos ) + '.png');
    }
    mostrarCadena();
    comprobarGanador();
}

function iniciar() {
    intentos = 6;
    ahorcado_img.setAttribute('src', 'recursos/img/ahorcado' + ( 7 - intentos ) + '.png');
    if( estadoJuego == true ) {
        modal.style.display = 'none';
        estado = false;
    }

    let valorAzar = Math.floor( Math.random() * cadenas.length );
    cadenaElegida = reemplazarAcentos(cadenas[valorAzar]);
    cadenaElegida = cadenaElegida.toUpperCase();
    cadenaFormateada = [cadenaElegida]
    cadenaElegida = cadenaElegida.split('');
    let cantidadPalabras = cadenaElegida.length;

    inicializarCadena( cadenaElegida );
    mostrarCadena();    
}

function inicializarCadena() {
    for( let i = 0; i < cadenaElegida.length; i++ ) {
        if( cadenaElegida[i] != ' ' ) {
            cadenaEstado[i] = '';
        } else {
            cadenaEstado[i] = '*';
        }
    }
}

function mostrarCadena() {
    let mensaje = '';
    for( let i = 0; i < cadenaElegida.length; i++ ) {
        if( cadenaElegida[i] != ' ' ) {
            mensaje += cadenaEstado[i] === '' ? '*' : cadenaEstado[i];
        } else {
            mensaje += ' ';
        }
    }
    mostrar_cadena.innerHTML = mensaje;
}

function reemplazarAcentos(cadena) { // Se inicializa la funcion par quitar los acentos
    let cambiar = {
        "á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
        "à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u",
        "Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
        "À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U", ",":""}; // Se crea un diccionario con las palabra con trilde y sin tilde par remplazarlas
    let tildes = /[áàéèíìóòúù,]/ig;  // La varaible que contiene las letras con tilde
    let cadena_normal=cadena.replaceAll(tildes,function(e){return cambiar[e]}); // remplaza la palabra con la cadena
    return cadena_normal; // devuelve la cadena
}

function comprobarGanador() {
    let gano = true;
    let cadena_con_espacios = [];
    let cadena = '';
    cadenaElegida.map( function( valor, index ) {
        if( valor == ' ' && cadenaEstado[index] == '*' ) {
            cadena_con_espacios[index] = ' ';
        } else if( valor == cadenaEstado[index] ) {
            cadena_con_espacios[index] = valor;
        }
    } );
    cadena = cadena_con_espacios.join('');

    if( cadenaFormateada.indexOf( cadena ) == -1 ) {
        gano = false;
    } else {
        gano = true;
        finJuego( gano );
    }
}

function finJuego( estado ) {
    btn_teclado.forEach(btn => {
        btn.removeAttribute("disabled");
    });
    cadenaElegida = [];
    cadenaEstado = [];
    if( estado == true ) {
        modal.style.display = 'flex';
        modal.querySelector('h2').innerHTML = 'Ganaste el juego del ahorcado';
        modal.querySelector('button').innerHTML = 'Nuevo juego';
        estadoJuego = true;
    } else if( estado == 'game_over' ) {
        modal.style.display = 'flex';
        modal.querySelector('h2').innerHTML = 'Perdiste el juego del ahorcado';
        modal.querySelector('button').innerHTML = 'Reintentar juego';
        estadoJuego = true;
    }
}