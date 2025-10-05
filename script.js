// логіка проєкту
document.addEventListener("DOMContentLoaded", () => {
    // --- ПОШУК ---
    const searchInput = document.querySelector(".search-bar input");
    const searchBtn = document.querySelector(".serch_btn");
    const recipes = document.querySelectorAll(".recipes button");

    function searchRecipes() {
        const query = searchInput.value.toLowerCase().trim();
        recipes.forEach(recipe => {
            const text = recipe.innerText.toLowerCase();
            const alt = recipe.querySelector("img").alt.toLowerCase();
            if (text.includes(query) || alt.includes(query)) {
                recipe.style.display = "block";
            } else {
                recipe.style.display = "none";
            }
        });
    }

    searchBtn.addEventListener("click", searchRecipes);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchRecipes();
    });

    // --- ЗБЕРЕЖЕНІ ---
    const savedRecipesBtn = document.querySelector(".saved button:first-child");
    const savedTipsBtn = document.querySelector(".saved button:last-child");
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    recipes.forEach(recipe => {
        recipe.addEventListener("click", () => {
            const title = recipe.querySelector("p").innerText;
            if (!savedRecipes.includes(title)) {
                savedRecipes.push(title);
                localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
                alert(`"${title}" додано до збережених!`);
            } else {
                alert(`"${title}" вже є у збережених!`);
            }
        });
    });

    savedRecipesBtn.addEventListener("click", () => {
        if (savedRecipes.length === 0) {
            alert("Немає збережених рецептів 😔");
        } else {
            alert("Збережені рецепти:\n" + savedRecipes.join("\n"));
        }
    });

    savedTipsBtn.addEventListener("click", () => {
        alert("Функціонал збереження порад ще в розробці 😉");
    });

    // --- МЕНЮ ---
    const optionsBtn = document.querySelector(".options_btn");
    const headerNav = document.querySelector("header nav");

    optionsBtn.addEventListener("click", () => {
        headerNav.classList.toggle("active");
    });

    // --- АНІМАЦІЯ КАРТОК ---
    recipes.forEach(recipe => {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.innerText = "Купити";

        recipe.style.position = "relative";
        recipe.appendChild(overlay);

        recipe.addEventListener("mouseenter", () => {
            recipe.classList.add("hovered");
        });
        recipe.addEventListener("mouseleave", () => {
            recipe.classList.remove("hovered");
        });
    });
});
