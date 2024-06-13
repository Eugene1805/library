class Node {
    constructor(ISBN, Title, Autor, Editorial, Year, numberOfPages, price) {
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

class LinkedList {
    constructor(head = null, tail = null) {
        this.head = head;
        this.tail = tail;
    }

    append(node) {
        const newNode = new Node(node.ISBN, node.Title, node.Autor, node.Editorial, node.Year, node.numberOfPages, node.price);
        
        if (!this.head || this.head.Year > newNode.Year) {
            newNode.next = this.head;
            this.head = newNode;
            if (!this.tail) this.tail = newNode;
            return;
        }

        let current = this.head;
        while (current.next && current.next.Year <= newNode.Year) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;

        if (!newNode.next) {
            this.tail = newNode;
        }
    }

    find(ISBN) {
        if (!this.head) return null;

        let current = this.head;
        while (current) {
            if (current.ISBN === ISBN) return current;
            current = current.next;
        }

        return null;
    }

    update(ISBN, newData) {
        const node = this.find(ISBN);
        if (node) {
            node.Title = newData.Title !== undefined ? newData.Title : node.Title;
            node.Autor = newData.Autor !== undefined ? newData.Autor : node.Autor;
            node.Editorial = newData.Editorial !== undefined ? newData.Editorial : node.Editorial;
            node.Year = newData.Year !== undefined ? newData.Year : node.Year;
            node.numberOfPages = newData.numberOfPages !== undefined ? newData.numberOfPages : node.numberOfPages;
            node.price = newData.price !== undefined ? newData.price : node.price;
        }
    }

    printList() {
        const values = [];
        let current = this.head;
        while (current) {
            values.push(`(${current.ISBN}, ${current.Title}, ${current.Autor}, ${current.Editorial}, ${current.Year}, ${current.numberOfPages}, ${current.price})`);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

const { resolve } = require('path');
const readline = require('readline');

// Crear una interfaz para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú y obtener la selección del usuario
function mostrarMenu() {
  console.log("\nMenú de opciones:");
  console.log("1. Agregar Libro");
  console.log("2. Buscar Libro");
  console.log("3. Borrar libro");
  console.log("4. Mostrar toda la biblioteca");
  console.log("5. Salir");

  return new Promise((resolve) => {
    rl.question('Por favor, selecciona una opción: ', (respuesta) => {
      resolve(respuesta);
    });
  });
}

async function getBookInfo() {
    const newBook = {};
  
    newBook.ISBN = await new Promise((resolve) => rl.question('Ingrese el ISBN del libro: ', resolve));
    newBook.Title = await new Promise((resolve) => rl.question('Ingrese el nombre del libro: ', resolve));
    newBook.Autor = await new Promise((resolve) => rl.question('Ingrese el autor del libro: ', resolve));
    newBook.Editorial = await new Promise((resolve) => rl.question('Ingrese la editorial del libro: ', resolve));
    newBook.Year = await new Promise((resolve) => rl.question('Ingrese el año de publicación del libro: ', resolve));
    newBook.numberOfPages = await new Promise((resolve) => rl.question('Ingrese el número de páginas del libro: ', resolve));
    newBook.price = await new Promise((resolve) => rl.question('Ingrese el precio del libro: ', resolve));
  
    return new Node(newBook.ISBN, newBook.Title, newBook.Autor, newBook.Editorial, newBook.Year, newBook.numberOfPages, newBook.price);
  }

async function main() {
  let opcion;
  const booksList = new LinkedList();
  do {
    opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        console.log("Ingrese los datos del nuevo libro");
        const newBook = await getBookInfo();
        booksList.append(newBook);
        break;
      case '2':
        const isbnToFind = await new Promise((resolve) => rl.question('Ingrese el ISBN del libro a buscar: ', resolve));
        const foundBook = booksList.find(isbnToFind);
        if (foundBook) {
          console.log(`Libro encontrado: (${foundBook.ISBN}, ${foundBook.Title}, ${foundBook.Autor}, ${foundBook.Editorial}, ${foundBook.Year}, ${foundBook.numberOfPages}, ${foundBook.price})`);
        } else {
          console.log("Libro no encontrado");
        }
        break;
      case '3':
        const isbnToDelete = await new Promise((resolve) => rl.question('Ingrese el ISBN del libro a borrar: ', resolve));
        booksList.delete(isbnToDelete);
        console.log("Libro borrado");
        break;
      case '4':
        console.log("Los libros actuales son: ");
        booksList.printList();
        break;
      case '5' :
        console.log("Saliendo del programa...");
        break;
      default:
        console.log("Opción no válida. Intenta de nuevo.");
    }

  } while (opcion !== '5');

  rl.close();
}

main();