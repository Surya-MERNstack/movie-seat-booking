document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const seats = document.querySelectorAll(".seat");
  const count = document.getElementById("count");
  const total = document.getElementById("total");
  const seatType = document.getElementById("seatType");

  // Function to update count and total
  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = calculateTotal(selectedSeats);
  }

  // Calculate total based on seat selection
  function calculateTotal(selectedSeats) {
    let totalPrice = 0;
    selectedSeats.forEach((seat) => {
      if (seat.classList.contains("selected")) {
        if (seat.classList.contains("double")) {
          totalPrice += seat.closest(".total-deck_1") ? 1500 : 2500;
        } else {
          totalPrice += seat.closest(".total-deck_1") ? 500 : 1000;
        }
      }
    });
    return totalPrice;
  }

  // Seat click event
  container.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("sold")
    ) {
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  });

  // Seat type change event
  seatType.addEventListener("change", function (e) {
    const selectedOption = e.target.value;

    const totalDeck1 = document.querySelector(".total-deck_1");
    const totalDeck2 = document.querySelector(".total-deck_2");

    if (selectedOption === "LL" || selectedOption === "LR") {
      totalDeck1.style.pointerEvents = "auto"; // Enable Total-deck_1
      totalDeck2.style.pointerEvents = "none"; // Disable Total-deck_2
    } else if (selectedOption === "UL" || selectedOption === "UR") {
      totalDeck1.style.pointerEvents = "none"; // Disable Total-deck_1
      totalDeck2.style.pointerEvents = "auto"; // Enable Total-deck_2
    }
  });

  // Reset button click event
  document.querySelector(".reset").addEventListener("click", function () {
    document.querySelectorAll(".selected").forEach((seat) => {
      seat.classList.remove("selected");
    });
    updateSelectedCount();
  });
  

  // Initial count and total set
  updateSelectedCount();
});
