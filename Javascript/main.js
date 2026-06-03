console.log("Welcome to the Community Portal");

window.onload = function () {
  alert("Page fully loaded");
};

class Event {
  constructor(name, date, seats, category, location) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
    this.location = location;
  }
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

const eventName = "Music Concert";
const eventDate = "2026-06-20";
let availableSeats = 50;

console.log(`Event: ${eventName}, Date: ${eventDate}, Seats: ${availableSeats}`);

let events = [
  new Event("Music Concert", "2026-06-20", 50, "Music", "Community Hall"),
  new Event("Baking Workshop", "2026-06-25", 20, "Workshop", "Town Center"),
  new Event("Football Match", "2026-07-10", 10, "Sports", "City Ground")
];

function addEvent(event) {
  events.push(event);
}

function registerUser(eventObj) {
  try {
    if (eventObj.seats <= 0) {
      throw new Error("No seats available");
    }

    eventObj.seats--;
    alert(`Registered for ${eventObj.name}`);

    renderEvents(events);

  } catch (error) {
    console.log(error.message);
  }
}

function filterEventsByCategory(category, callback) {

  const filteredEvents = events.filter(event => {
    return category === "all" || event.category === category;
  });

  callback(filteredEvents);
}

function registrationTracker(category) {

  let totalRegistrations = 0;

  return function () {

    totalRegistrations++;

    console.log(`Total registrations for ${category}: ${totalRegistrations}`);
  };
}

const musicRegistration = registrationTracker("Music");

function renderEvents(eventList) {

  const container = document.querySelector("#eventsContainer");

  container.innerHTML = "";

  eventList.forEach(eventObj => {

    const today = new Date();

    const eventDate = new Date(eventObj.date);

    if (eventDate >= today && eventObj.checkAvailability()) {

      const card = document.createElement("div");

      card.style.border = "2px solid black";
      card.style.padding = "15px";
      card.style.margin = "10px";
      card.style.width = "300px";
      card.style.backgroundColor = "#f2f2f2";
      card.style.borderRadius = "10px";

      card.innerHTML = `
        <h3>${eventObj.name}</h3>
        <p><b>Date:</b> ${eventObj.date}</p>
        <p><b>Category:</b> ${eventObj.category}</p>
        <p><b>Location:</b> ${eventObj.location}</p>
        <p><b>Seats:</b> ${eventObj.seats}</p>

        <button onclick="registerUserByName('${eventObj.name}')">
          Register
        </button>

        <button onclick="cancelRegistration('${eventObj.name}')">
          Cancel
        </button>
      `;

      container.appendChild(card);
    }
  });
}

function registerUserByName(name) {

  const selectedEvent = events.find(event => event.name === name);

  registerUser(selectedEvent);

  if (selectedEvent.category === "Music") {
    musicRegistration();
  }
}

function cancelRegistration(name) {

  const selectedEvent = events.find(event => event.name === name);

  selectedEvent.seats++;

  renderEvents(events);
}

document.querySelector("#categoryFilter").onchange = function () {

  filterEventsByCategory(this.value, renderEvents);
};

document.querySelector("#searchBox").addEventListener("keydown", function () {

  const searchText = this.value.toLowerCase();

  const searchedEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchText)
  );

  renderEvents(searchedEvents);
});

events.forEach(event => {
  console.log(Object.entries(event));
});

addEvent(
  new Event(
    "Art Exhibition",
    "2026-08-01",
    15,
    "Workshop",
    "Art Gallery"
  )
);

const musicEvents = events.filter(event => event.category === "Music");

console.log(musicEvents);

const eventCards = events.map(event => `Workshop on ${event.name}`);

console.log(eventCards);

const clonedEvents = [...events];

const formattedEvents = clonedEvents.map(({ name, date, seats }) => {

  return `${name} will be held on ${date}. Seats available: ${seats}`;
});

console.log(formattedEvents);

function showEventDetails(name = "Community Event") {

  console.log(`Event name is ${name}`);
}

showEventDetails();

function fetchEventsUsingThen() {

  fetch("https://jsonplaceholder.typicode.com/posts")

    .then(response => response.json())

    .then(data => console.log("Fetched using then:", data))

    .catch(error => console.log("Fetch error:", error));
}

async function fetchEventsUsingAsync() {

  document.querySelector("#loading").style.display = "block";

  try {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    console.log("Fetched using async/await:", data);

  } catch (error) {

    console.log("Async fetch error:", error);

  } finally {

    document.querySelector("#loading").style.display = "none";
  }
}

fetchEventsUsingThen();

fetchEventsUsingAsync();

document.querySelector("#registrationForm")

  .addEventListener("submit", function (event) {

    event.preventDefault();

    console.log("Form submission started");

    const name = this.elements["name"].value;

    const email = this.elements["email"].value;

    const selectedEvent = this.elements["event"].value;

    document.querySelector("#nameError").innerText = "";

    document.querySelector("#emailError").innerText = "";

    document.querySelector("#eventError").innerText = "";

    let valid = true;

    if (name === "") {

      document.querySelector("#nameError").innerText =
        "Name is required";

      valid = false;
    }

    if (email === "") {

      document.querySelector("#emailError").innerText =
        "Email is required";

      valid = false;
    }

    if (selectedEvent === "") {

      document.querySelector("#eventError").innerText =
        "Please select an event";

      valid = false;
    }

    if (valid) {

      const userData = {

        name: name,

        email: email,

        event: selectedEvent
      };

      console.log("Payload:", userData);

      setTimeout(() => {

        fetch("https://jsonplaceholder.typicode.com/posts", {

          method: "POST",

          body: JSON.stringify(userData),

          headers: {

            "Content-type": "application/json"
          }
        })

          .then(response => response.json())

          .then(data => {

            document.querySelector("#message").innerText =
              "Registration successful";

            console.log("Server response:", data);
          })

          .catch(error => {

            document.querySelector("#message").innerText =
              "Registration failed";

            console.log("POST error:", error);
          });

      }, 2000);
    }
  });

$("#registerBtn").click(function () {

  console.log("Register button clicked using jQuery");
});

$("#eventsContainer").show();

renderEvents(events);

/*
Benefit of React or Vue:
React or Vue makes projects easier to manage
because components and UI updates become reusable and organized.
*/