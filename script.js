let data = []; 

fetchDataWithThen();

function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(responseData => {
      data = responseData;
      renderTable(data);
    })
    .catch(error => console.error('Error:', error));
}

async function fetchDataWithAsync() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const responseData = await response.json();
    data = responseData;
    renderTable(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function renderTable(data) {
  const cryptoTableBody = document.getElementById('cryptoTableBody');
  cryptoTableBody.innerHTML = '';

  data.forEach(coin => {
    const row = document.createElement('tr');
    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = coin.image;
    image.alt = coin.name;
    image.style.width = '25px';
    image.style.height = '25px';
    imageCell.appendChild(image);

    const nameCell = document.createElement('td');
    nameCell.textContent = coin.name;

    const symbolCell = document.createElement('td');
    symbolCell.textContent = coin.symbol;

    const priceCell = document.createElement('td');
    priceCell.textContent = coin.current_price;

    const volumeCell = document.createElement('td');
    volumeCell.textContent = coin.total_volume;

    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(symbolCell);
    row.appendChild(priceCell);
    row.appendChild(volumeCell);

    cryptoTableBody.appendChild(row);
  });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = data.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm) ||
    coin.symbol.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredData);
});

// Sort by Market Cap
const sortMarketCapButton = document.getElementById('sortMarketCapButton');
sortMarketCapButton.addEventListener('click', () => {
  const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});

// Sort by Percentage Change
const sortPercentageChangeButton = document.getElementById('sortPercentageChangeButton');
sortPercentageChangeButton.addEventListener('click', () => {
  const sortedData = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
});