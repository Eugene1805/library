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

function menu(){
    let option;
    do{
        console.log("Elije una opcion:");
        console.log("1.-");
        console.log("2.-");
        console.log("3.-");
        console.log("4.-");
        console.log("5.-");
        console.log("6.-");
        console.log("7.-");
        console.log("8.-");
    }while(option!= 0);
}



/*ISBN: "",
    Title: "",
    Autor: "",
    Editorial: "",
    Year: 0,
    numberOfPages: 0,
    price: 0 */