const API_BASE = 'https://factorial-calculator.onrender.com';

document.getElementById('calculate').addEventListener('click', async () => {
    const number = parseInt(document.getElementById('number').value);
    const method = document.querySelector('input[name="method"]:checked').value;

    if (isNaN(number) || number < 0) {
        document.getElementById('result').textContent = 'Enter a valid positive number.';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/factorial`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number, method }),
        });
        const data = await response.json();
        document.getElementById('result').textContent = `Result: ${data.result}`;
        fetchHistory();
    } catch (error) {
        console.error(error);
    }
});

async function fetchHistory() {
    try {
        const response = await fetch(`${API_BASE}/api/history`);
        const history = await response.json();
        document.getElementById('history').innerHTML = history
            .map((item) => `
                <p>
                    ${item.number}! (${item.method}) = ${item.result} 
                    <button onclick="deleteHistory(${item.id})">Delete</button>
                </p>`)
            .join('');
    } catch (error) {
        console.error(error);
    }
}

async function deleteHistory(id) {
    try {
        await fetch(`${API_BASE}/api/history/${id}`, {
            method: 'DELETE',
        });
        fetchHistory();  // Refresh the history list after deletion
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('clear-all-history').addEventListener('click', async () => {
    try {
        await fetch(`${API_BASE}/api/history`, {
            method: 'DELETE',
        });
        fetchHistory();  // Refresh the history list after clearing all
    } catch (error) {
        console.error(error);
    }
});

fetchHistory();  // Load history on page load
