// p1.js - Full frontend (working with your provided server.js)
// API
const API_URL = "http://localhost:3000";

// --- DATA ---
// Expanded food database with macros (your original list)
const foodDatabase = [
  { name: "Roti/Chapati", calories: 80, protein: 3, carbs: 15, fat: 1, unit: "piece" },
  { name: "Rice (Cooked)", calories: 205, protein: 4, carbs: 45, fat: 0, unit: "bowl (1 cup)" },
  { name: "Dal (Lentil Curry)", calories: 150, protein: 9, carbs: 20, fat: 3, unit: "bowl (1 cup)" },
  { name: "Mixed Vegetable Sabzi", calories: 120, protein: 3, carbs: 15, fat: 6, unit: "bowl (1 cup)" },
  { name: "Paneer Butter Masala", calories: 350, protein: 15, carbs: 10, fat: 28, unit: "bowl (1 cup)" },
  { name: "Chicken Curry", calories: 300, protein: 25, carbs: 8, fat: 18, unit: "bowl (1 cup)" },
  { name: "Fish Curry", calories: 250, protein: 22, carbs: 6, fat: 14, unit: "bowl (1 cup)" },
  { name: "Idli", calories: 60, protein: 2, carbs: 13, fat: 0, unit: "piece" },
  { name: "Dosa (Plain)", calories: 130, protein: 3, carbs: 25, fat: 2, unit: "piece" },
  { name: "Sambar", calories: 110, protein: 5, carbs: 15, fat: 3, unit: "bowl (1 cup)" },
  { name: "Samosa", calories: 260, protein: 5, carbs: 32, fat: 14, unit: "piece" },
  { name: "Curd/Yogurt", calories: 100, protein: 9, carbs: 12, fat: 2, unit: "bowl (1 cup)" },
  { name: "Salad (Mixed Greens)", calories: 50, protein: 2, carbs: 10, fat: 0, unit: "bowl" },
  { name: "Apple", calories: 95, protein: 0, carbs: 25, fat: 0, unit: "medium" },
  { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, unit: "medium" },
  { name: "Orange", calories: 62, protein: 1, carbs: 15, fat: 0, unit: "medium" },
  { name: "Grapes", calories: 69, protein: 1, carbs: 18, fat: 0, unit: "cup" },
  { name: "Bread (White)", calories: 79, protein: 3, carbs: 14, fat: 1, unit: "slice" },
  { name: "Bread (Whole Wheat)", calories: 81, protein: 4, carbs: 14, fat: 1, unit: "slice" },
  { name: "Egg (Boiled)", calories: 78, protein: 6, carbs: 0, fat: 5, unit: "large" },
  { name: "Egg (Fried)", calories: 90, protein: 6, carbs: 0, fat: 7, unit: "large" },
  { name: "Omelette (2 eggs)", calories: 180, protein: 12, carbs: 2, fat: 14, unit: "serving" },
  { name: "Milk (Full Fat)", calories: 150, protein: 8, carbs: 12, fat: 8, unit: "glass (250ml)" },
  { name: "Milk (Skim)", calories: 90, protein: 9, carbs: 13, fat: 0, unit: "glass (250ml)" },
  { name: "Almonds", calories: 7, protein: 0.3, carbs: 0.2, fat: 0.6, unit: "almond" },
  { name: "Almonds (Handful)", calories: 160, protein: 6, carbs: 6, fat: 14, unit: "approx 23" },
  { name: "Walnuts (Handful)", calories: 185, protein: 4, carbs: 4, fat: 18, unit: "approx 7" },
  { name: "Peanut Butter", calories: 94, protein: 4, carbs: 3, fat: 8, unit: "tablespoon" },
  { name: "Oats (Cooked)", calories: 150, protein: 5, carbs: 27, fat: 3, unit: "bowl (1 cup)" },
  { name: "Poha", calories: 250, protein: 5, carbs: 40, fat: 8, unit: "plate" },
  { name: "Upma", calories: 280, protein: 6, carbs: 45, fat: 10, unit: "plate" },
  { name: "Potato (Boiled)", calories: 160, protein: 4, carbs: 37, fat: 0, unit: "medium" },
  { name: "Tomato", calories: 22, protein: 1, carbs: 5, fat: 0, unit: "medium" },
  { name: "Cucumber", calories: 16, protein: 1, carbs: 4, fat: 0, unit: "medium" },
  { name: "Carrot", calories: 25, protein: 1, carbs: 6, fat: 0, unit: "medium" },
  { name: "Spinach (Cooked)", calories: 41, protein: 5, carbs: 7, fat: 0, unit: "cup" },
  { name: "Broccoli (Cooked)", calories: 55, protein: 5, carbs: 11, fat: 1, unit: "cup" },
  { name: "Chicken Breast (Cooked)", calories: 165, protein: 31, carbs: 0, fat: 3, unit: "100g" },
  { name: "Salmon (Cooked)", calories: 206, protein: 22, carbs: 0, fat: 13, unit: "100g" },
  { name: "Tofu", calories: 94, protein: 10, carbs: 2, fat: 6, unit: "100g" },
  { name: "Paneer (Cottage Cheese)", calories: 265, protein: 18, carbs: 6, fat: 20, unit: "100g" },
  { name: "Cheese (Cheddar)", calories: 113, protein: 7, carbs: 1, fat: 9, unit: "slice (1oz)" },
  { name: "Coffee (Black)", calories: 2, protein: 0, carbs: 0, fat: 0, unit: "cup" },
  { name: "Tea (Black)", calories: 2, protein: 0, carbs: 0, fat: 0, unit: "cup" },
  { name: "Sugar", calories: 16, protein: 0, carbs: 4, fat: 0, unit: "teaspoon" },
  { name: "Olive Oil", calories: 119, protein: 0, carbs: 0, fat: 14, unit: "tablespoon" },
  { name: "Gulab Jamun", calories: 175, protein: 3, carbs: 30, fat: 6, unit: "piece" },
  { name: "Jalebi", calories: 150, protein: 2, carbs: 35, fat: 3, unit:"piece" },
  { name: "Rasgulla", calories: 100, protein: 4, carbs: 20, fat: 2, unit: "piece" },
  { name: "Protein Shake (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1, unit: "serving" },
  { name: "Pizza (Margherita)", calories: 280, protein: 12, carbs: 33, fat: 10, unit: "slice" },
  { name: "Burger (Chicken)", calories: 450, protein: 25, carbs: 40, fat: 20, unit: "piece" },
  { name: "French Fries", calories: 312, protein: 4, carbs: 41, fat: 15, unit: "medium" }
];

// --- GLOBAL STATE & CHART INSTANCES ---
let currentMealItems = [];
let userData = {}; // Holds settings/water log + meals filled from DB
let calorieChartInstance = null;
let weeklyChartInstance = null;

// --- DOM SELECTORS ---
const landingPage = document.getElementById('landing-page');
const appPage = document.getElementById('app-page');
const welcomeMessage = document.getElementById('welcome-message');
const navLoginBtn = document.getElementById('nav-login-btn');
const navGetStartedBtn = document.getElementById('nav-get-started-btn');
const navLogoutBtn = document.getElementById('nav-logout-btn');
const heroGetStartedBtn = document.getElementById('hero-get-started-btn');
const signupModal = document.getElementById('signup-modal');
const loginModal = document.getElementById('login-modal');
const settingsModal = document.getElementById('settings-modal');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const settingsForm = document.getElementById('settings-form');
const signupError = document.getElementById('signup-error');
const loginError = document.getElementById('login-error');
const signupModalCloseBtn = document.getElementById('signup-modal-close-btn');
const loginModalCloseBtn = document.getElementById('login-modal-close-btn');
const settingsModalCloseBtn = document.getElementById('settings-modal-close-btn');
const settingsBtn = document.getElementById('settings-btn');
const showLoginLink = document.getElementById('show-login-link');
const showSignupLink = document.getElementById('show-signup-link');
const mealNameInput = document.getElementById('meal-name');
const foodSearchInput = document.getElementById('food-search');
const foodSearchResults = document.getElementById('food-search-results');
const foodItemNameInput = document.getElementById('food-item-name');
const foodQuantityInput = document.getElementById('food-quantity');
const addFoodItemBtn = document.getElementById('add-food-item-btn');
const currentMealList = document.getElementById('current-meal-list');
const currentMealTotalEl = document.getElementById('current-meal-total');
const saveMealBtn = document.getElementById('save-meal-btn');
const savedMealsContainer = document.getElementById('saved-meals-container');
const calorieChartEl = document.getElementById('calorie-chart');
const weeklyChartEl = document.getElementById('weekly-chart');
const chartConsumedEl = document.getElementById('chart-consumed');
const chartRemainingEl = document.getElementById('chart-remaining');
const chartGoalEl = document.getElementById('chart-goal');
const waterIntakeEl = document.getElementById('water-intake');
const waterGoalEl = document.getElementById('water-goal');
const waterProgressEl = document.getElementById('water-progress');
const addWaterBtn = document.getElementById('add-water-btn');
const removeWaterBtn = document.getElementById('remove-water-btn');

// --- HELPERS ---
// Returns today's local date key, e.g. "2025-11-01"
function getTodaysDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Converts a backend UTC timestamp to the *local* YYYY-MM-DD format consistently
function normalizeDateKey(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);

  // Convert the UTC date to a local date key
  const localYear = d.getFullYear();
  const localMonth = String(d.getMonth() + 1).padStart(2, '0');
  const localDay = String(d.getDate()).padStart(2, '0');

  return `${localYear}-${localMonth}-${localDay}`;
}

async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('health-token');
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(url, options);
    if (response.status === 401 || response.status === 403) {
        console.error("Authentication failed. Logging out.");
        handleLogout();
        throw new Error("Unauthorized or Forbidden");
    }
    return response;
}

// --- AUTH / ROUTING ---
function checkLoginState() {
    const token = localStorage.getItem('health-token');
    const user = JSON.parse(localStorage.getItem('user-data'));

    if (token && user) {
        landingPage.classList.add('hidden');
        appPage.classList.remove('hidden');
        navLoginBtn.classList.add('hidden');
        navGetStartedBtn.classList.add('hidden');
        settingsBtn.classList.remove('hidden');
        navLogoutBtn.classList.remove('hidden');

        welcomeMessage.textContent = `Welcome, ${user.username}!`;
        initializeApp(user);
    } else {
        landingPage.classList.remove('hidden');
        appPage.classList.add('hidden');
        navLoginBtn.classList.remove('hidden');
        navGetStartedBtn.classList.remove('hidden');
        settingsBtn.classList.add('hidden');
        navLogoutBtn.classList.add('hidden');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    signupError.classList.add('hidden');
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!username || !email || !password) {
        signupError.textContent = 'All fields are required.';
        signupError.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message + " Please log in.");
            hideModals();
            showLoginModal();
        } else {
            signupError.textContent = data.error || 'Registration failed.';
            signupError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Signup fetch error:', error);
        signupError.textContent = 'Network error. Please try again.';
        signupError.classList.remove('hidden');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    loginError.classList.add('hidden');
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('health-token', data.token);
            localStorage.setItem('user-data', JSON.stringify(data.user));
            hideModals();
            checkLoginState();
        } else {
            loginError.textContent = data.error || 'Invalid email or password.';
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Login fetch error:', error);
        loginError.textContent = 'Network error. Please try again.';
        loginError.classList.remove('hidden');
    }
}

function handleLogout() {
    localStorage.removeItem('health-token');
    localStorage.removeItem('user-data');
    window.location.reload();
}

// --- MODALS ---
function showSignupModal() { signupModal.classList.remove('hidden'); }
function showLoginModal() { loginModal.classList.remove('hidden'); }
function showSettingsModal() {
    document.getElementById('calorie-goal').value = userData.settings.calorieGoal;
    document.getElementById('water-goal').value = userData.settings.waterGoal;
    settingsModal.classList.remove('hidden');
}
function hideModals() {
    [signupModal, loginModal, settingsModal].forEach(modal => modal.classList.add('hidden'));
    [signupError, loginError].forEach(errorEl => errorEl.classList.add('hidden'));
}

// --- LOCAL DATA MANAGEMENT (settings + water only) ---
function loadUserData(user) {
    let localSettings = { calorieGoal: 2000, waterGoal: 2500 };
    let localWaterLog = {};

    const localData = localStorage.getItem(`health-data-${user.email}`);
    if (localData) {
        try {
            const parsedData = JSON.parse(localData);
            if (parsedData.settings) localSettings = parsedData.settings;
            if (parsedData.log) {
                for (const dateKey in parsedData.log) {
                    if (parsedData.log[dateKey] && parsedData.log[dateKey].water > 0) {
                        localWaterLog[dateKey] = parsedData.log[dateKey].water;
                    }
                }
            }
        } catch (e) {
            console.error("Error parsing local data, using defaults:", e);
        }
    }

    userData = { settings: localSettings, log: {} };

    for (const dateKey in localWaterLog) {
        userData.log[dateKey] = { meals: [], water: localWaterLog[dateKey] };
    }

    const todayKey = getTodaysDateKey();
    if (!userData.log[todayKey]) {
        userData.log[todayKey] = { meals: [], water: 0 };
    }
}

function saveUserData() {
    const user = JSON.parse(localStorage.getItem('user-data'));
    if (!user) return;

    const localDataToSave = { settings: userData.settings, log: {} };

    for (const dateKey in userData.log) {
        if (userData.log[dateKey].water > 0) {
            localDataToSave.log[dateKey] = { water: userData.log[dateKey].water };
        }
    }

    localStorage.setItem(`health-data-${user.email}`, JSON.stringify(localDataToSave));
}

// --- APPLICATION LOGIC ---
function handleSettingsSave(e) {
    e.preventDefault();
    userData.settings.calorieGoal = parseInt(document.getElementById('calorie-goal').value, 10);
    userData.settings.waterGoal = parseInt(document.getElementById('water-goal').value, 10);
    saveUserData();
    hideModals();
    updateAllUI();
}

function handleFoodSearch() {
    const query = foodSearchInput.value.toLowerCase();
    foodSearchResults.innerHTML = '';
    if (query.length < 2) {
        foodSearchResults.classList.add('hidden');
        return;
    }
    const results = foodDatabase.filter(food => food.name.toLowerCase().includes(query));
    if (results.length > 0) {
        results.forEach(food => {
            const li = document.createElement('li');
            li.className = 'p-3 hover:bg-gray-700 cursor-pointer food-search-result';
            li.textContent = `${food.name} (${food.calories} kcal)`;
            li.addEventListener('click', () => selectFoodItem(food));
            foodSearchResults.appendChild(li);
        });
        foodSearchResults.classList.remove('hidden');
    } else {
        foodSearchResults.classList.add('hidden');
    }
}

function selectFoodItem(food) {
    foodItemNameInput.value = food.name;
    foodQuantityInput.value = 1;
    foodSearchInput.value = '';
    foodSearchResults.classList.add('hidden');
    foodItemNameInput.dataset.food = JSON.stringify(food);
}

function addFoodItemToMeal() {
    if (!foodItemNameInput.dataset.food) {
        alert("Please search and select a food item first.");
        return;
    }
    const food = JSON.parse(foodItemNameInput.dataset.food);
    const quantity = parseFloat(foodQuantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    currentMealItems.push({
        ...food,
        quantity: quantity,
        totalCalories: Math.round(food.calories * quantity)
    });

    renderCurrentMeal();
    foodItemNameInput.value = '';
    foodItemNameInput.dataset.food = '';
    foodQuantityInput.value = 1;
}

function renderCurrentMeal() {
    currentMealList.innerHTML = '';
    if (currentMealItems.length === 0) {
        currentMealList.innerHTML = '<li class="text-gray-500 italic">No items added yet.</li>';
        currentMealTotalEl.textContent = 0;
        return;
    }

    let totalCalories = 0;
    currentMealItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-800 p-2 rounded';
        li.innerHTML = `
            <span>
                <span class="font-semibold text-white">${item.name}</span>
                <span class="text-sm text-gray-400">(${item.quantity} ${item.unit})</span>
            </span>
            <span>
                <span class="font-medium text-custom-green">${item.totalCalories} Cal</span>
                <button class="ml-3 text-gray-500 hover:text-red-500" data-index="${index}">&times;</button>
            </span>
        `;
        li.querySelector('button').addEventListener('click', () => removeCurrentMealItem(index));
        currentMealList.appendChild(li);
        totalCalories += item.totalCalories;
    });
    currentMealTotalEl.textContent = totalCalories;
}

function removeCurrentMealItem(index) {
    currentMealItems.splice(index, 1);
    renderCurrentMeal();
}

async function saveCurrentMeal() {
    if (currentMealItems.length === 0) {
        alert('Cannot save an empty meal.');
        return;
    }

    const mealName = mealNameInput.value.trim() || 'Unnamed Meal';
    const totalCalories = currentMealItems.reduce((total, item) => total + item.totalCalories, 0);

    const mealDetails = {
        name: mealName,
        items: [...currentMealItems],
        totalCalories: totalCalories
    };

    const apiPayload = {
        meal_date: getTodaysDateKey(),
        details: JSON.stringify(mealDetails)
    };

    try {
        const response = await authenticatedFetch(`${API_URL}/meals`, {
            method: 'POST',
            body: JSON.stringify(apiPayload)
        });

        if (response.ok) {
            currentMealItems = [];
            mealNameInput.value = '';
            renderCurrentMeal();
            await fetchAndRenderMeals(); // get latest from DB
            updateAllUI(); // force pie chart + saved meals refresh
        } else {
            const data = await response.json();
            alert(`Error saving meal: ${data.error}`);
        }
    } catch (error) {
        console.error('Save meal fetch error:', error);
        alert('A network error occurred. Please try again.');
    }
}

// Robust fetch + parse; fills userData.log with meals (and preserves water)
async function fetchAndRenderMeals() {
    try {
        const response = await authenticatedFetch(`${API_URL}/meals`);
        if (!response.ok) {
             console.error("API response was NOT OK. Status:", response.status);
             updateAllUI();
             return;
        }

        const mealsFromDB = await response.json();

        // Clear existing meal arrays (we keep water)
        for (const dateKey in userData.log) {
            if (userData.log[dateKey].meals) {
                 userData.log[dateKey].meals = [];
            }
        }

        for (const dbMeal of mealsFromDB) {
            // Convert full datetime -> YYYY-MM-DD
            const dateKey = dbMeal.meal_date ? normalizeDateKey(dbMeal.meal_date): getTodaysDateKey();

            if (!userData.log[dateKey]) {
                userData.log[dateKey] = { meals: [], water: 0 };
            }

            // details may be stringified or object
            let details;
            try {
                details = typeof dbMeal.details === 'string' ? JSON.parse(dbMeal.details) : dbMeal.details;
            } catch (e) {
                console.error("Failed to parse meal details:", e, dbMeal.details);
                continue; // skip broken entry
            }

            userData.log[dateKey].meals.push({
                id: dbMeal.id,
                date: dbMeal.created_at || new Date().toISOString(),
                name: details.name || 'Meal',
                items: details.items || [],
                totalCalories: details.totalCalories || 0
            });
        }

        // ensure today exists
        const todayKey = getTodaysDateKey();
        if (!userData.log[todayKey]) userData.log[todayKey] = { meals: [], water: 0 };

        updateAllUI();
    } catch (error) {
        console.error('Failed to fetch or process meals:', error);
        alert("A frontend error occurred while processing meals. Check console (F12).");
    }
}

function renderSavedMeals() {
    savedMealsContainer.innerHTML = '';
    const todaysMeals = userData.log[getTodaysDateKey()]?.meals || [];

    if (todaysMeals.length === 0) {
        savedMealsContainer.innerHTML = '<p class="text-gray-400 italic">No meals saved yet for today.</p>';
        return;
    }

    todaysMeals.sort((a, b) => new Date(b.date) - new Date(a.date));

    todaysMeals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.className = 'saved-meal-item bg-gray-900 p-4 rounded-lg border border-gray-700';
        let itemsHtml = meal.items.map(item => `<li class="text-sm text-gray-400">${item.name} (${item.quantity} ${item.unit}) - ${item.totalCalories} Cal</li>`).join('');

        mealCard.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div>
                    <h5 class="text-lg font-semibold text-white">${meal.name}</h5>
                    <p class="text-sm text-gray-500">${new Date(meal.date).toLocaleTimeString()}</p>
                </div>
                <div class="text-right">
                    <p class="text-xl font-bold text-custom-green">${meal.totalCalories} Cal</p>
                    <button class="text-xs text-gray-500 hover:text-red-500" data-id="${meal.id}">Delete</button>
                </div>
            </div>
            <ul class="list-disc list-inside ml-2 space-y-1">${itemsHtml}</ul>
        `;
        mealCard.querySelector('button').addEventListener('click', () => deleteSavedMeal(meal.id));
        savedMealsContainer.appendChild(mealCard);
    });
}

async function deleteSavedMeal(mealId) {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    try {
        const response = await authenticatedFetch(`${API_URL}/meals/${mealId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await fetchAndRenderMeals();
        } else {
            const data = await response.json();
            alert(`Error deleting meal: ${data.error}`);
        }
    } catch (error) {
        console.error('Delete meal fetch error:', error);
        alert('A network error occurred. Please try again.');
    }
}

function addWater() {
    const todayKey = getTodaysDateKey();
    if (!userData.log[todayKey]) userData.log[todayKey] = { meals: [], water: 0 };
    userData.log[todayKey].water += 250;
    saveUserData();
    updateAllUI();
}

function removeWater() {
    const todayKey = getTodaysDateKey();
    if (userData.log[todayKey]) {
        userData.log[todayKey].water = Math.max(0, userData.log[todayKey].water - 250);
        saveUserData();
        updateAllUI();
    }
}

function renderWaterTracker() {
    const intake = userData.log[getTodaysDateKey()]?.water || 0;
    const goal = userData.settings.calorieGoal ? userData.settings.waterGoal : 2500;
    waterIntakeEl.textContent = intake;
    waterGoalEl.textContent = goal;
    const progress = Math.min((intake / goal) * 100, 100);
    waterProgressEl.style.width = `${progress}%`;
}

// --- Charts ---
function renderCalorieChart() {
    const todaysMeals = userData.log[getTodaysDateKey()]?.meals || [];
    const consumed = todaysMeals.reduce((sum, meal) => sum + (meal.totalCalories || 0), 0);
    const goal = userData.settings.calorieGoal || 2000;
    const remaining = Math.max(0, goal - consumed);

    chartConsumedEl.textContent = consumed;
    chartRemainingEl.textContent = remaining;
    chartGoalEl.textContent = goal;

    const ctx = calorieChartEl.getContext('2d');
    if (calorieChartInstance) calorieChartInstance.destroy();
    calorieChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Consumed', 'Remaining'],
            datasets: [{
                data: [consumed, remaining > 0 ? remaining : 0.1],
                backgroundColor: ['#34D399', '#4B5563'],
                borderColor: '#1f2937',
                borderWidth: 5,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            animation: { animateScale: true, animateRotate: true },
            plugins: {
                legend: { display: true, position: 'bottom', labels: { color: '#9CA3AF', font: { size: 14 } } },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed} kcal`
                    }
                }
            }
        }
    });
}

function renderWeeklyChart() {
    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateKey = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

        labels.push(dayName);
        const dayLog = userData.log[dateKey];
        const totalCalories = dayLog ? dayLog.meals.reduce((sum, meal) => sum + (meal.totalCalories || 0), 0) : 0;
        data.push(totalCalories);
    }

    const ctx = weeklyChartEl.getContext('2d');
    if (weeklyChartInstance) weeklyChartInstance.destroy();

    weeklyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calories',
                data: data,
                backgroundColor: '#34D399',
                borderColor: '#10B981',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#374151' }, ticks: { color: '#9CA3AF' } },
                x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
            }
        }
    });
}

function updateAllUI() {
    renderSavedMeals();
    renderWaterTracker();
    renderCalorieChart();
    renderWeeklyChart();
}

// --- Initialize ---
function initializeApp(user) {
    loadUserData(user);

    settingsBtn.addEventListener('click', showSettingsModal);
    settingsForm.addEventListener('submit', handleSettingsSave);
    foodSearchInput.addEventListener('keyup', handleFoodSearch);
    addFoodItemBtn.addEventListener('click', addFoodItemToMeal);
    saveMealBtn.addEventListener('click', saveCurrentMeal);
    addWaterBtn.addEventListener('click', addWater);
    removeWaterBtn.addEventListener('click', removeWater);

    renderCurrentMeal();
    fetchAndRenderMeals();
}

// --- Global event listeners ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginState();

    signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);
    navLogoutBtn.addEventListener('click', handleLogout);

    navGetStartedBtn.addEventListener('click', showSignupModal);
    heroGetStartedBtn.addEventListener('click', showSignupModal);
    navLoginBtn.addEventListener('click', showLoginModal);
    signupModalCloseBtn.addEventListener('click', hideModals);
    loginModalCloseBtn.addEventListener('click', hideModals);
    settingsModalCloseBtn.addEventListener('click', hideModals);
    showLoginLink.addEventListener('click', (e) => { e.preventDefault(); hideModals(); showLoginModal(); });
    showSignupLink.addEventListener('click', (e) => { e.preventDefault(); hideModals(); showSignupModal(); });
});