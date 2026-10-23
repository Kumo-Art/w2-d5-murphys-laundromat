// ----- data -----

const machines = [
  { number: 1,  type: "Washer", customer: null,              minutes: 0 },
  { number: 2,  type: "Washer", customer: "Dustin Sheets",   minutes: 12 },
  { number: 3,  type: "Washer", customer: null,              minutes: 0 },
  { number: 4,  type: "Washer", customer: "Hank Chief",      minutes: 3 },
  { number: 5,  type: "Washer", customer: "Ty Dee",          minutes: 27 },
  { number: 6,  type: "Washer", customer: null,              minutes: 0 },
  { number: 7,  type: "Dryer",  customer: "Polly Ester",     minutes: "45" },
  { number: 8,  type: "Dryer",  customer: "Fabrice Oftener", minutes: 30 },
  { number: 9,  type: "Dryer",  customer: null,              minutes: 0 },
  { number: 10, type: "Dryer",  customer: "Sol Vent",        minutes: 12 },
  { number: 11, type: "Dryer",  customer: "Will Shrink",     minutes: 8 },
  { number: 12, type: "Dryer",  customer: null,              minutes: 0 }
];


// ----- elements -----

const board = document.getElementById("board");
const totalButton = document.getElementById("total-button");
const total = document.getElementById("total");


// ----- functions -----

function formatTime(minutes) {
  //debugger;

  if (minutes === 0) {
    return "Available";
  }

  return `${minutes} min left`;
}

function startCycle(machine) {
  machine.minutes = 30;
  drawBoard();
}

function claimMachine(machine) {
  machine.customer = "You";
  startCycle(machine);
}

function totalMinutes() {
  let sum = 0;

  for (let i = 0; i < machines.length; i++) {
    sum = sum + Number(machines[i].minutes);
  }

  return sum;
}

function showTotal() {
  total.textContent = `About ${totalMinutes()} minutes of washing left.`;
}

function drawBoard() {
  board.replaceChildren();

  machines.forEach(function (machine) {
    const tile = document.createElement("div");
    tile.classList.add("machine", "p-3", "rounded", "bg-slate-100");

    if (machine.customer !== null) {
      tile.classList.add("busy");
    }

    const title = document.createElement("h2");
    title.textContent = `${machine.number} - ${machine.type}`;

    const who = document.createElement("p");
    if (machine.customer === null) {
      who.textContent = "Open";
    } else {
      who.textContent = machine.customer;
    }

    const status = document.createElement("p");
    status.textContent = formatTime(machine.minutes);

    tile.appendChild(title);
    tile.appendChild(who);
    tile.appendChild(status);

    tile.addEventListener("click", function () {
      claimMachine(machine);
    });

    board.appendChild(tile);
  });
}


// ----- listeners -----

totalButton.addEventListener("click", function () {
  showTotal();
});


// ----- run at load -----

drawBoard();
