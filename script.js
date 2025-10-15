// логіка проєкту
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");

    const pages = {
        recipes: `
            <div class="saved"> 
                <button>Збережені рецепти</button>
                <button>Збережені поради</button>
            </div>
            <hr>
            <h2>Рецепти</h2>
            <div class="recipes">
                <button>
                    <img class="kart" src="https://images.unian.net/photos/2024_11/thumb_files/860_470_1730993412-6127.jpg" alt="Випічка">
                    <p>Випічка</p>
                </button>
                <button class="budka">
                    <img class="kart" src="https://ukr.media/static/ba/aimg/3/8/9/389015_1.jpg" alt="Перші страви">
                    <p>Перші страви</p>
                </button>
                <button class="budka">
                    <img class="kart" src="https://papigutto.com.ua/wp-content/uploads/2016/07/Screenshot_405.jpg" alt="М'ясо">
                    <p>М'ясо</p>
                </button>
                <button class="budka">
                    <img class="kart" src="https://smachno.ua/wp-content/uploads/2023/04/06/pexels-figen-kokol-15490120-640x400.jpg" alt="Картопля">
                    <p>Картопля</p>
                </button>
                <button class="budka">
                    <img class="kart" src="https://www.kikkoman.ru/fileadmin/_processed_/3/3/csm_1213_Recipe-Page_Cantonese_Tofu_Stir-FryNoodles_SoySauce_Step1_ea389c55db.webp" alt="Лапша">
                    <p>Лапша</p>
                </button>
                <button class="budka" id="kartBosh">

                    <img class="kart" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyfb9UpUDSBZMMoSuY5iU2Gn1lXTZ7nhNo4g&s" alt="Борщі">
                    <p>Борщі</p>
                </button>
            </div>
        `,
        tips: `
            <h2>Поради</h2>
            <div class="tips">
                <div class="tip">
                    <h3>1️⃣ Як зберігати овочі свіжими</h3>
                    <p>Не мий овочі перед зберіганням. Волога пришвидшує псування.</p>
                </div>
                <div class="tip">
                    <h3>2️⃣ Секрет ідеальної випічки</h3>
                    <p>Дістань яйця і масло з холодильника заздалегідь, щоб вони були кімнатної температури.</p>
                </div>
                <div class="tip">
                    <h3>3️⃣ Щоб не пересолити</h3>
                    <p>Додавай сіль поступово і обов’язково пробуй страву.</p>
                </div>
            </div>
        `,
        contacts: `
            <h2>Контакти</h2>
            <div class="contacts">
                <p><strong>📧 Email:</strong> bestchoice.help@gmail.com</p>
                <p><strong>📞 Телефон:</strong> +380 98 123 45 67</p>
                <p><strong>📍 Адреса:</strong> Підгороднє, вул. Центральна, 30</p>
                <hr>
                <p>Ми відкриті в неділю, 14:00–15:30.</p>
            </div>
        `
    };

    function loadPage(pageName) {
        main.classList.add("fade-out");
        setTimeout(() => {
            main.innerHTML = pages[pageName];
            main.classList.remove("fade-out");
            main.classList.add("fade-in");
            setTimeout(() => main.classList.remove("fade-in"), 300);
            if (pageName === "recipes") initializeRecipeLogic();
        }, 300);
    }

    document.querySelectorAll("header nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const text = e.target.innerText.toLowerCase();
            if (text.includes("рецепти")) loadPage("recipes");
            if (text.includes("поради")) loadPage("tips");
            if (text.includes("контакти")) loadPage("contacts");
        });
    });

    function initializeRecipeLogic() {
        const searchInput = document.querySelector(".search-bar input");
        const searchBtn = document.querySelector(".serch_btn");
        const recipes = document.querySelectorAll(".recipes button");

        function searchRecipes() {
            const query = searchInput.value.toLowerCase().trim();
            recipes.forEach(recipe => {
                const text = recipe.innerText.toLowerCase();
                const alt = recipe.querySelector("img").alt.toLowerCase();
                recipe.style.display = (text.includes(query) || alt.includes(query)) ? "block" : "none";
            });
        }

        searchBtn.onclick = searchRecipes;
        searchInput.onkeypress = (e) => e.key === "Enter" && searchRecipes();

        const savedRecipesBtn = document.querySelector(".saved button:first-child");
        const savedTipsBtn = document.querySelector(".saved button:last-child");
        let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

        recipes.forEach(recipe => {
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            overlay.innerText = "";
            recipe.appendChild(overlay);

            recipe.addEventListener("mouseenter", () => recipe.classList.add("hovered"));
            recipe.addEventListener("mouseleave", () => recipe.classList.remove("hovered"));

            recipe.addEventListener("click", () => {
                const title = recipe.querySelector("p").innerText;

                if (title === "Картопля") {
                    window.location.href = "kartoha.html";
                    return;
                }
                if (title === "М'ясо") {
                    window.location.href = "myaso.html";
                    return;
                }
                if (title === "Перші страви") {
                    window.location.href = "first_havchik.html";
                    return;
                }
                if (title === "Борщі") {
                    window.location.href = "Borchi.html";
                    return;
                }
                if (title === "Лапша") {
                    window.location.href = "lapsha.html";
                    return;
                }

                if (!savedRecipes.includes(title)) {
                    savedRecipes.push(title);
                    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
                    alert(`"${title}" додано до збережених!`);
                } else {
                    alert(`"${title}" вже є у збережених!`);
                }
            });
        });

        savedRecipesBtn.onclick = () => {
            alert(savedRecipes.length
                ? "Збережені рецепти:\n" + savedRecipes.join("\n")
                : "Немає збережених рецептів 😔"
            );
        };

        savedTipsBtn.onclick = () => alert("Функціонал збереження порад ще в розробці 😉");
    }
    
    const optionsBtn = document.querySelector(".options_btn");
    const headerNav = document.querySelector("header nav");
    optionsBtn.addEventListener("click", () => headerNav.classList.toggle("active"));

    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        loadPage("recipes");
    }
});
