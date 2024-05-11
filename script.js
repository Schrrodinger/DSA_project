let transactionCount = 0;

function addTransactionForm() {
    transactionCount++;
    const container = document.getElementById('transactionContainer');
    const formGroup = document.createElement('div');
    formGroup.className = 'transaction-form';
    formGroup.innerHTML = `
        <input type="text" placeholder="Lender (người cho vay)" id="lender${transactionCount}">
        <input type="text" placeholder="Borrower (người vay)" id="borrower${transactionCount}">
        <input type="number" placeholder="Amount (số tiền)" id="amount${transactionCount}">
    `;
    container.appendChild(formGroup);
}

function removeTransactionForm() {
    if (transactionCount > 0) {
        const container = document.getElementById('transactionContainer');
        container.removeChild(container.lastElementChild);
        transactionCount--;
    }
}

function processTransactions() {
    let transactions = [];
    for (let i = 1; i <= transactionCount; i++) {
        let lender = document.getElementById(`lender${i}`).value.trim();
        let borrower = document.getElementById(`borrower${i}`).value.trim();
        let amount = parseFloat(document.getElementById(`amount${i}`).value);
        if (lender && borrower && !isNaN(amount)) {
            transactions.push({ lender, borrower, amount });
        }
    }console.log('Processing transactions: ', transactions); // check
    minimizeTransaction(transactions);

}

function minimizeTransaction(transactions) {
    let balances = {};

    // Tính toán số dư cho mỗi người
    transactions.forEach(({ lender, borrower, amount }) => {
        if (!balances[lender]) balances[lender] = 0;
        if (!balances[borrower]) balances[borrower] = 0;

        balances[lender] += amount;
        balances[borrower] -= amount;
    });

    let creditors = [];
    let debtors = [];

    // Phân loại người cho vay và người vay
    for (let person in balances) {
        if (balances[person] > 0) {
            creditors.push({ name: person, amount: balances[person] });
        } else if (balances[person] < 0) {
            debtors.push({ name: person, amount: -balances[person] });
        }
    }

    let result = [];
    let creditorIndex = 0;
    let debtorIndex = 0;

    // Xử lý giao dịch để tối giản số lượng
    while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
        let debtor = debtors[debtorIndex];
        let creditor = creditors[creditorIndex];
        let amount = Math.min(debtor.amount, creditor.amount);

        result.push(`${debtor.name} owes (nợ) ${creditor.name} $${amount.toFixed(2)}`);

        debtor.amount -= amount;
        creditor.amount -= amount;

        if (debtor.amount === 0) debtorIndex++;
        if (creditor.amount === 0) creditorIndex++;
    }

    // Hiển thị kết quả
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = 'Kết quả giao dịch:<br>' + result.join('<br>');
}



// Khởi tạo với 1 biểu mẫu giao dịch
addTransactionForm();

document.addEventListener('DOMContentLoaded', (event) => {
    // Đặt event listener cho nút "Minimize Transactions"
    document.getElementById('minimizeButton').addEventListener('click', processTransactions);

    // Đặt event listener cho các nút khác nếu bạn muốn
    document.getElementById('addButton').addEventListener('click', addTransactionForm);
    document.getElementById('removeButton').addEventListener('click', removeTransactionForm);

    // Khởi tạo bất kỳ hàm nào khác cần chạy ngay khi trang được tải
    initialize();
});
function initialize() {
    console.log('Application initialized.'); //confirmed
}