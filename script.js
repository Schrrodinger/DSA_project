let transactionCount = 0;

function addTransactionForm() {
    transactionCount++;
    const container = document.getElementById('transactionContainer');
    const formGroup = document.createElement('div');
    formGroup.className = 'transaction-form';
    formGroup.innerHTML = `
        <input type="text" placeholder="Người cho vay" id="lender${transactionCount}">
        <input type="text" placeholder="Người vay" id="borrower${transactionCount}">
        <input type="number" placeholder="Số tiền" id="amount${transactionCount}">
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
    }

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
    // ... mã khởi tạo của bạn ...
}