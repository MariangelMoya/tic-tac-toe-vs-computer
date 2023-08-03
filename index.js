let turno = 1;                          //de quien es el turno 1 es la X
let fichas = ["O", "X"];
let puestas = 0;                        //indica el numero de fichas que he puesto, inicializa en 0
let partidaAcabada = false;             //indica si la partida ha terminado
let textoTriunfo = document.getElementById("textoTriunfo"); //hace referencia en donde colocaremos el mensaje de triunfo
let createTablero = () => {
    let tablero = document.querySelector("#tablero")

    let elementos = ''

    for (let i = 0; i < 9; i++) {
        elementos += `<button></button>`
    }

    tablero.innerHTML = elementos

}
createTablero()
let botones = Array.from(document.getElementsByTagName("button"));//con este metodo agarro todos los elementos que tienen esta etiqueta, estoy agarrando todos los botones.Este metodo me devuelve una colecion nhtml,por eso lo meto dentro un Array.from para transformarlo en array

let message = (message, color) => {
    textoTriunfo.innerHTML = message;
    textoTriunfo.style.color = color;
    partidaAcabada = true;
    textoTriunfo.style.visibility = 'visible'
}

botones.forEach(x => x.addEventListener("click", ponerFicha));//aqui con el forEach le esoy poniendo un evento a cada boton, sera de tipo click y llamara el evento ponerFicha

function ponerFicha(event) { //recive el parametro event, este parametro contiene datos de evento que ha invocado ponerFicha, es decir el click sobre el boton
    let botonPulsado = event.target;//dentro de event tenemos target que representa el elemento que en este caso ha sido pulsado, que sera el valor de botonPulsado
    if (!partidaAcabada && botonPulsado.innerHTML === "") {//aca se comprueba que cuando pulsamos un boton tenemos que que comprobar que la partidano se ha acabado y que el boton no ha sido pulsado previamente
        botonPulsado.innerHTML = fichas[turno];//una vez ya hecha la comprobacion decidimos que el html de dicho boton sea igual a ficha de turno
        puestas += 1;                           //aca incrementamos en 1 el contador de fichas puestas

        if (puestas === 1) {
            textoTriunfo.style.visibility = 'hidden'
        }

        let estadoPartida = estado(); //aqui se consultara el estado de la partida. Se crea una funcion que lo que haga es devolvernos un 0 si nadie ha ganado devolver un 1 se he ganado yo o edvolver un -1 si gano la computadora
        if (estadoPartida === 0) {        //comprueba que aun no ha ganado nadie, ya que estadoPartida en 0 significa que aun no hay ganador
            cambiarTurno();             //invoco la funcion de cambiar turno
            if (puestas < 9) {            //compruebo que el numero de fichas sea menor que 9
                ia();                   //lamo a la ia
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();
            }
        }

        if (estadoPartida === 1) {
            message('You win! :)', "#e750f8")
        } else if (estadoPartida === -1) {
            message('You lost! ;(', "#f85065")
        } else if (puestas === 9) {
            message('Tie :)', "gray")
        }
    }
}

function cambiarTurno() {
    if (turno === 1) {        //si el turno es 1
        turno = 0;          //que turno cambie a 0
    } else {                   //sino
        turno = 1;          //vuelve a 1
    }
}

function estado() {//en esta funcion tendremos las variables posicioTriunfo y nEstado
    posicionTriunfo = 0; //no solo dira si hay gaandor, sea yo a la compu sino en que fila, diagonal o columna se ha producido el triunfo para luego cambiarle el background
    nEstado = 0; //sera 0 cuando no ha ganado nadie 1 si gano yo y -1 cuando gane la compu

    function sonIguales(...args) {//esta funcion va a comprobar si n parametros que le paso son iguales entre si. Aqui utilizo el operador ... que lo que le estoy diciendo es si son iguales entran en el elemento SI ES QUE NO ENTENDI MAL. lo que hace esta funcion es comprobar que los elementos sean iguales, a exepcion de los valores vacios, ya que todos estan vacios al inicio
        valores = args.map(x => x.innerHTML); //saco los valores de esos botones
        if (valores[0] !== "" && valores.every((x, i, arr) => x === arr[0])) {//el every es un metodo que vamos a aplicar a un array y compruebo que cada elemento de los que paso sea igual al primer elemento
            args.forEach(x => x.style.backgroundColor = 'violet')//si se da la condicion lo que hago es iterar por cada uno de los argumentos que paso con un forEach y poner ese boton en concreto en fuchsia
            return true;        //devuelve un rue porque fueron todos iguales
        }
        return false;          //retorna un false si no se cumple
    }

    //comprobando si hay alguna linea
    if (sonIguales(botones[0], botones[1], botones[2])) {
        posicionTriunfo = 1;
    } else if (sonIguales(botones[3], botones[4], botones[5])) {
        posicionTriunfo = 2;
    } else if (sonIguales(botones[6], botones[7], botones[8])) {
        posicionTriunfo = 3;
    } else if (sonIguales(botones[0], botones[3], botones[6])) {
        posicionTriunfo = 4;
    } else if (sonIguales(botones[1], botones[4], botones[7])) {
        posicionTriunfo = 5;
    } else if (sonIguales(botones[2], botones[5], botones[8])) {
        posicionTriunfo = 6;
    } else if (sonIguales(botones[0], botones[4], botones[8])) {
        posicionTriunfo = 7;
    } else if (sonIguales(botones[2], botones[4], botones[6])) {
        posicionTriunfo = 8;
    }

    //comprobamos quien ha ganado
    if (posicionTriunfo > 0) {            //si posicionTriunfo es mayor a cero es que alguien ha ganado
        if (turno === 1) {                //si es turno de 1 el ganador es x o sea yo
            nEstado = 1;                //devuelvo un 1
        } else {                           //si no
            nEstado = -1;               //devuelvo un -1 que quiere decir que gano la compu
        }
    }
    return nEstado;                 //termino devolviendo el estado
}

function ia() {
    function aleatorio(min, max) { //que me devuelva un numero aleatorio entre el minimo y el maximo
        return Math.floor(Math.random() * (max - min + 1)) + min; //Math.random devuelve() u numero random con decimales entre 0 y 1
    }                                                                //empieza en ese minimo y le suma la distancia entre el maximo y el minimo mas 1 y eso lo multiplica por el numero random que genera Math.random(), luego el resultado de toda esta operacion se conviwrte en un numero entero con Math.floor

    let valores = botones.map(x => x.innerHTML); //a mi me llegan los botones, pero yo quiero el valor de los botones, aqui se saca el valor de los botones. usando el map y diciendo que cada uno de los elementos de este bucle sacar su innerHTML
    let pos = -1;                   //aqui elijo una posicion que no existe

    if (valores[4] === "") {                      //esta el centro libre?
        pos = 4;                                //si esta libre el centro lo quiero
    } else {                                       // si no esta libre el cento
        let n = aleatorio(0, botones.length - 1);  //crea un aleatorio entre 0 y el numero de botones -1
        while (valores[n] !== "") {               //ese aleatorio valor de n mientras que no este vacio, o sea si el aleatorio resulta que ya esta ocupado
            n = aleatorio(0, botones.length - 1)  //vuelve a generar un aleatorio, hasta que no encuentre una posicion libre seguira generando un aleatori. Saldra del bucle cuando encuentre la posicion libre
        }
        pos = n;                                //cuando genere una posicion aleatoria libre pos sera igual a la posicion aleatoria libre
    }

    botones[pos].innerHTML = "O";           //el TML del boton de pos le ponemos O que es la letra que representa a la compu
    return pos;                             //devolvemos la posicion
}





















