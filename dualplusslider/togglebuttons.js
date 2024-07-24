document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    const showHideButtons = document.querySelectorAll(".show-hide-button");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (button.textContent === "Remove") {
                button.textContent = "Restore";
            } else {
                button.textContent = "Remove";
            }
        });
    });

    showHideButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (button.textContent === "Hide Category") {
                button.textContent = "Show Category";
            } else {
                button.textContent = "Hide Category";
            }
        });
    });
});
