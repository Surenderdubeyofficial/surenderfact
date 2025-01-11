const API_BASE = 'https://factorial-calculator.onrender.com';

document.getElementById('calculate').addEventListener('click', async () => {
    const number = parseInt(document.getElementById('number').value);
    const method = document.querySelector('input[name="method"]:checked').value;

    if (isNaN(number) || number < 0) {
        document.getElementById('result').textContent = 'Enter a valid positive number.';
        return;
    }

    showLoader();

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
        alert('Failed to calculate factorial. Please try again later.');
    } finally {
        hideLoader();
    }
});

document.getElementById('clear-history').addEventListener('click', async () => {
    if (confirm('Are you sure you want to delete all history?')) {
        try {
            const response = await fetch(`${API_BASE}/api/history`, { method: 'DELETE' });
            const data = await response.json();
            alert(data.message);
            fetchHistory();
        } catch (error) {
            console.error('Error deleting history:', error);
        }
    }
});

async function fetchHistory() {
    try {
        const response = await fetch(`${API_BASE}/api/history`);
        const history = await response.json();
        document.getElementById('history').innerHTML = history
            .map((item) => `<p>${item.number}! (${item.method}) = ${item.result}</p>`)
            .join('');
    } catch (error) {
        console.error('Error fetching history:', error);
    }
}

function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
}

// Fetch history on page load
fetchHistory();
