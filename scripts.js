const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active');
    }, 
    close(){
        // Fechar o modal
        // Remover a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '09/09/2021'
    }, 
    {
        id: 2,
        description: 'Website',
        amount: -500000,
        date: '09/09/2021'
    }, 
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '09/09/2021'
    }
];

const Transaction = {
    income() {
        // somar as entradas
    },
    expenses() {
        // somar as saídas
    },
    total() {
        // entrada - saídas
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction); 

        DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction){

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="expense">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" />
            </td>
            
        `;

        return html;
    }
}

DOM.addTransaction(transactions[0]);
DOM.addTransaction(transactions[1]);
DOM.addTransaction(transactions[2]);