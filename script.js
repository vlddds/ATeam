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
                <button>
                    <img class="kart" src="https://ukr.media/static/ba/aimg/3/8/9/389015_1.jpg" alt="Перші страви">
                    <p>Перші страви</p>
                </button>
                <button>
                    <img class="kart" src="https://papigutto.com.ua/wp-content/uploads/2016/07/Screenshot_405.jpg" alt="М'ясо">
                    <p>М'ясо</p>
                </button>
                <button>
                    <img class="kart" src="https://smachno.ua/wp-content/uploads/2023/04/06/pexels-figen-kokol-15490120-640x400.jpg" alt="Картопля">
                    <p>Картопля</p>
                </button>
                <button>
                    <img class="kart" src="https://www.kikkoman.ru/fileadmin/_processed_/3/3/csm_1213_Recipe-Page_Cantonese_Tofu_Stir-FryNoodles_SoySauce_Step1_ea389c55db.webp" alt="Лапша">
                    <p>Лапша</p>
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
        const recipes = document.querySelectorAll(".recipes button");
        const savedRecipesBtn = document.querySelector(".saved button:first-child");
        const savedTipsBtn = document.querySelector(".saved button:last-child");

        let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

        recipes.forEach(recipe => {
            const title = recipe.querySelector("p").innerText.trim();

            recipe.addEventListener("click", () => {
                if (title === "Картопля") return (window.location.href = "kartoha.html");
                if (title === "М'ясо") return (window.location.href = "myaso.html");
                if (title === "Перші страви") return (window.location.href = "first_havchik.html");
                if (title === "Борщі") return (window.location.href = "Borchi.html");
                if (title === "Лапша") return (window.location.href = "lapsha.html");

                if (!savedRecipes.includes(title)) {
                    savedRecipes.push(title);
                    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
                    alert(`"${title}" додано до збережених ✅`);
                } else {
                    alert(`"${title}" вже є у збережених 😉`);
                }
            });
        });

        savedRecipesBtn.addEventListener("click", () => {
            alert(savedRecipes.length
                ? "📋 Збережені рецепти:\n" + savedRecipes.join("\n")
                : "Немає збережених рецептів 😔"
            );
        });

        savedTipsBtn.addEventListener("click", () =>
            alert("Функціонал збереження порад ще в розробці 😉")
        );
    }

    const optionsBtn = document.querySelector(".options_btn");
    const headerNav = document.querySelector("header nav");
    if (optionsBtn && headerNav) {
        optionsBtn.addEventListener("click", () => headerNav.classList.toggle("active"));
    }

    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        loadPage("recipes");
    }
});
