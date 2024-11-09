const playGachaButton = document.getElementById("playGacha");
const message = document.getElementById("message");
const itemList = document.getElementById("itemList");

// Daftar item dengan tingkat kelangkaan
const items = [
  { name: "Item biasa", rarity: "common", chance: 50 },
  { name: "Item rare", rarity: "rare", chance: 20 },
  { name: "Item epick", rarity: "epic", chance: 5 },
  { name: "Item legendaris", rarity: "legendary", chance: 0.0001 },
];

let inventory = [];
let balance = 500000;  // Saldo awal

playGachaButton.addEventListener("click", playGacha);

function playGacha() {
  if (balance < 50000) {
    message.textContent = "Saldo tidak cukup untuk bermain!";
    return;
  }

  balance -= 50000;
  let reward = getReward();
  inventory.push(reward);
  updateInventory();
  message.textContent = `Selamat! Kamu mendapat: ${reward.name}`;
}

// Fungsi untuk mendapatkan reward berdasarkan probabilitas
function getReward() {
  let random = Math.random() * 100;
  let sum = 0;
  for (let item of items) {
    sum += item.chance;
    if (random <= sum) {
      return item;
    }
  }
  return items[0];  // Default ke item biasa
}

function updateInventory() {
  itemList.innerHTML = "";
  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.rarity}) - ${item.chance}%`;
    itemList.appendChild(li);
  });
}
