// Fetch item data from PocketBase (you need to adapt this to your PocketBase API structure)
async function fetchItemData() {
  try {
    const response = await fetch('YOUR_POCKETBASE_API_ENDPOINT'); // Replace with your actual API endpoint
    const record = await response.json();

    // Populate data dynamically
    document.getElementById('item-image').src = record.image; // Assuming image is a URL
    document.getElementById('item-name').textContent = record.name;
    document.getElementById('start-price').textContent = record.start_price;
    document.getElementById('bid-inc').textContent = record.bid_inc;

    // Start the countdown for the close time
    const closeTime = new Date(record.close_time);
    startCountdown(closeTime);
  } catch (error) {
    console.error('Error fetching item data:', error);
  }
}

// Countdown Timer Function
function startCountdown(deadline) {
  const timeLeftElement = document.getElementById('time-left');

  function calculateTimeLeft() {
    const now = new Date();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) {
      timeLeftElement.textContent = "Time's Up!";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    timeLeftElement.textContent = `${days}d ${hours}hrs ${minutes}mins ${seconds}s`;
  }

  const timerInterval = setInterval(calculateTimeLeft, 1000);
  calculateTimeLeft();
}

// Fetch the data on page load
fetchItemData();
