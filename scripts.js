const Modal = {
    open() {
        // Abrir modal
        // Adicionar a class active ao modal
        document.querySelector(".modal-overlay").classList.add("active");
    },
    close() {
        // Fechar o modal
        // Remover a class active do modal
        document.querySelector(".modal-overlay").classList.remove("active");
    },
};

/**
 * Objeto que contém funções que realizam os cálculos dos incomes e expenses
 * Para mostrar nos cards
 */
const Transaction = {
    all: [{
            description: "Luz",
            amount: -10000,
            date: "09/09/2021",
        },
        {
            description: "Website",
            amount: 100000,
            date: "09/09/2021",
        },
        {
            description: "Internet",
            amount: -1000,
            date: "09/09/2021",
        },
        {
            description: "APP",
            amount: 20000,
            date: "09/09/2021",
        },
    ],

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);

        App.reload();
    },

    income() {
        // Pegar todas as transações
        // Para cada transação, se a transação é maior que zero
        // Somar a uma variável e retornar a variável
        let income = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount > 0) {
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

        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });

        return expense;
    },
    total() {
        // Entrada - Saídas
        let total = Transaction.income() + Transaction.expenses();
        return total;
    },
};

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
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
    updateBalance() {
        document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
            Transaction.income()
        );
        document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
            Transaction.expenses()
        );
        document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
            Transaction.total()
        );
    },

    /**
     * Função que limpa os campos html para fazer o reload() sem ocorrer algum bug de preencher
     * Novamente os dados na tela
     */
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
};

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        return signal + value;
    },
};

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    formatData() {

    },

    validateFields() {
        const {
            description,
            amount,
            date
        } = Form.getValues();
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos!");
        }
    },

    submit(event) {
        event.preventDefault();

        try {

            Form.validateFields();

            // Verificar se todas as informações foram preenchidas => validateFields();
            // Formatar os dados para salvar => formateData();
            // Salvar
            // Apagar os dados do formulário
            // Modal Fecha 
            // Atualizar a aplicação

            

        } catch (error) {
            alert(error.message);
        }


    }
}

const App = {
    init() {

        // Adiciona as transações para aparecer em tela
        Transaction.all.forEach((transaction) => {
            DOM.addTransaction(transaction);
        });

        // Função que atualiza os cards no HTML
        DOM.updateBalance();
    },

    reload() {
        DOM.clearTransactions();
        App.init();
    },
};

App.init();