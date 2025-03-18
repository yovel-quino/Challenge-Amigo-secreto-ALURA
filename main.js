/**
 * @class GestorAmigos
 * @description Maneja la lógica principal para la gestión de amigos y el sorteo
 */
class GestorAmigos {
    constructor() {
        this.listaAmigos = [];
    }

    /**
     * Agrega un amigo a la lista de amigos.
     * 
     * @param {string} nombre - El nombre del amigo a agregar.
     * @throws {Error} Si el nombre está vacío.
     * @throws {Error} Si el nombre ya existe en la lista de amigos.
     */
    agregarAmigo(nombre) {
        const nombreLimpio = nombre.trim();
        if (nombreLimpio === "") {
            throw new Error("Por favor, inserte un nombre.");
        }
        if (this.listaAmigos.includes(nombreLimpio)) {
            throw new Error("Este nombre ya existe en la lista.");
        }
        this.listaAmigos.push(nombreLimpio);
    }

    obtenerListaAmigos() {
        return this.listaAmigos;
    }

    sortearAmigo() {
        if (this.listaAmigos.length === 0) {
            throw new Error("No hay amigos en la lista para sortear.");
        }
        const indiceAleatorio = Math.floor(Math.random() * this.listaAmigos.length);
        return this.listaAmigos[indiceAleatorio];
    }
}

/**
 * @class ManejadorUI
 * @description Controla la interacción con la interfaz de usuario y las animaciones
 */
class ManejadorUI {
    constructor(gestorAmigos) {
        this.gestorAmigos = gestorAmigos;
        this.inputAmigo = document.getElementById("amigo");
        this.listaHTML = document.getElementById("listaAmigos");
        this.resultado = document.getElementById("resultado");
    }

    agregarAmigo() {
        try {
            this.gestorAmigos.agregarAmigo(this.inputAmigo.value);
            this.actualizarLista();
            this.inputAmigo.value = "";
        } catch (error) {
            alert(error.message);
        }
    }

    actualizarLista() {
        this.listaHTML.innerHTML = "";
        const amigos = this.gestorAmigos.obtenerListaAmigos();
        amigos.forEach(amigo => {
            const li = document.createElement("li");
            li.textContent = amigo;
            this.listaHTML.appendChild(li);
        });
    }

    crearConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    sortearAmigo() {
        try {
            const amigoSorteado = this.gestorAmigos.sortearAmigo();
            this.resultado.innerHTML = '';
            
            // Efecto de "ruleta"
            let contador = 0;
            const amigos = this.gestorAmigos.obtenerListaAmigos();
            const intervalo = setInterval(() => {
                this.resultado.innerHTML = `<li>${amigos[contador % amigos.length]}</li>`;
                contador++;
                if (contador > 10) {
                    clearInterval(intervalo);
                    setTimeout(() => {
                        this.resultado.innerHTML = `<li>${amigoSorteado}</li>`;
                        this.crearConfetti();
                    }, 500);
                }
            }, 100);
        } catch (error) {
            alert(error.message);
        }
    }
}

/**
 * Inicialización de la aplicación
 * Configura las instancias principales y los event listeners
 */
const gestorAmigos = new GestorAmigos();
const manejadorUI = new ManejadorUI(gestorAmigos);

// Asignación de eventos
document.getElementById("agregarBtn").addEventListener("click", () => manejadorUI.agregarAmigo());
document.getElementById("sortearBtn").addEventListener("click", () => manejadorUI.sortearAmigo());