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
        amount: -10000,
        date: '09/09/2021'
    }, 
    {
        id: 2,
        description: 'Website',
        amount: 100000,
        date: '09/09/2021'
    }, 
    {
        id: 3,
        description: 'Internet',
        amount: -1000,
        date: '09/09/2021'
    },
    {
        id: 4,
        description: 'APP',
        amount: 20000,
        date: '09/09/2021'
    }
];

/**
 * Objeto que contém funções que realizam os cálculos dos incomes e expenses
 * Para mostrar nos cards
 */
const Transaction = {
    income() {

        // Pegar todas as transações
        // Para cada transação, se a transação é maior que zero
        // Somar a uma variável e retornar a variável
        let  income = 0;
        
        transactions.forEach((transaction) => {
            if (transaction.amount > 0){
                income += transaction.amount;
            }
        });
        
        return income;
    },

    expenses() {
        
        // Pegar todas as transações
        // Para cada transação, se a transação é maior que zero
        // Somar a uma variável e retornar a variável

        let expense = 0;

        transactions.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        });

        return expense; 

    },
    total() {
        // Entrada - Saídas
        return Transaction.income() + Transaction.expenses();
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

        // verifica se o valor é maior que 0 recebe o atributo income senão recebe expense
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        // obtém do objeto Utils a formatação da moeda
        const amount = Utils.formatCurrency(transaction.amount);

        // obtém todo o código html da parte de td da tabela
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" />
            </td>
            
        `;

        return html;
    },

    // Atualiza os valores nos cards principais
    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.income());
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    }

}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, ""); 

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;
    }
}

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
});

DOM.updateBalance();