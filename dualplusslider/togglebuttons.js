document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    const showHideButtons = document.querySelectorAll(".show-hide-button");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (button.textContent === "Remove") {
                button.textContent = "Restore";
                button.style.backgroundColor = '#007bff'; // Change to blue
            } else {
                button.textContent = "Remove";
                button.style.backgroundColor = '#28a745'; // Change to green
            }
        });
    });

    showHideButtons.forEach(button => {
        button.textContent = "Show Category"; // Initial state
        button.style.backgroundColor = '#28a745'; // Initial green color
        button.addEventListener("click", function() {
            if (button.textContent === "Show Category") {
                button.textContent = "Hide Category";
                button.style.backgroundColor = '#007bff'; // Change to blue
            } else {
                button.textContent = "Show Category";
                button.style.backgroundColor = '#28a745'; // Change to green
            }
        });
    });
});
