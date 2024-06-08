class node {
    constructor(ISBN, Title, Autor, Editorial, Year, numberOfPages, price){
        this.ISBN = ISBN;
        this.Title = Title;
        this.Autor = Autor;
        this.Editorial = Editorial;
        this.Year = Year;
        this.numberOfPages = numberOfPages;
        this.price = price;
        this.next = null;
    }
}

class linkedList{
    constructor(head = null, tail = null){
        this.head = head;
        this.tail = tail;
    }
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    find(value) {
        if (!this.head) return null;

        let current = this.head;  
        while (current) {
            if (current.value === value) return current;
            current = current.next;  
        }

        return null;
    }
    update(value){
        const aux = this.find(value)
        
    }
    printList() {
        const values = [];
        let current = this.head;
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

const readline = require('readline');

// Crear una interfaz para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú y obtener la selección del usuario
function mostrarMenu() {
  console.log("\nMenú de opciones:");
  console.log("1. Opción 1");
  console.log("2. Opción 2");
  console.log("3. Opción 3");
  console.log("4. Salir");

  return new Promise((resolve) => {
    rl.question('Por favor, selecciona una opción: ', (respuesta) => {
      resolve(respuesta);
    });
  });
}

async function main() {
  let opcion;
  
  do {
    opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        console.log("Has seleccionado la Opción 1");
        break;
      case '2':
        console.log("Has seleccionado la Opción 2");
        break;
      case '3':
        console.log("Has seleccionado la Opción 3");
        break;
      case '4':
        console.log("Saliendo del programa...");
        break;
      default:
        console.log("Opción no válida. Intenta de nuevo.");
    }

  } while (opcion !== '4');

  rl.close();
}

main();

