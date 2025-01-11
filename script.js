const API_BASE = 'http://localhost:5000';

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
            .map((item) => `<p>${item.number}! (${item.method}) = ${item.result}</p>`)
            .join('');
    } catch (error) {
        console.error(error);
    }
}

fetchHistory();
