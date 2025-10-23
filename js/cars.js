// Чекаємо, поки весь HTML-документ буде завантажено та розпарсено
document.addEventListener('DOMContentLoaded', function () {
    // Знаходимо необхідні елементи на сторінці
    const filterForm = document.querySelector('.filters-form');
    const carCards = document.querySelectorAll('.offer-card');
    const yearSelect = document.getElementById('year');

    // Якщо якийсь з елементів не знайдено, припиняємо виконання скрипта
    if (!filterForm || !carCards.length || !yearSelect) return;

    // --- 1. Функція для динамічного заповнення випадаючого списку років ---
    function populateYears() {
        const years = new Set(); // Використовуємо Set, щоб уникнути дублікатів років
        
        // Проходимо по кожній картці автомобіля, щоб зібрати всі унікальні роки
        carCards.forEach(card => {
            // Знаходимо текст з роком випуску
            const yearText = card.querySelector('.offer-details p:first-child').textContent;
            // Витягуємо числове значення року з тексту
            const year = parseInt(yearText.replace('Рік: ', ''));
            // Якщо рік - це число, додаємо його до нашого Set
            if (!isNaN(year)) {
                years.add(year);
            }
        });

        // Перетворюємо Set на масив та сортуємо роки від найновішого до найстарішого
        const sortedYears = Array.from(years).sort((a, b) => b - a);

        // Для кожного року створюємо елемент <option> і додаємо його до випадаючого списку
        sortedYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    }

    // --- 2. Функція для застосування фільтрів до карток автомобілів ---
    function applyFilters() {
        // Отримуємо значення з полів фільтра
        const priceFromValue = parseInt(document.getElementById('price-from').value) || 0;
        const priceToInput = document.getElementById('price-to').value;
        // Якщо поле "ціна до" порожнє, встановлюємо верхню межу як нескінченність
        const priceToValue = priceToInput === '' ? Infinity : parseInt(priceToInput);

        const yearValue = parseInt(document.getElementById('year').value) || 0;

        // Проходимо по кожній картці автомобіля
        carCards.forEach(card => {
            // Отримуємо ціну з картки
            const cardPriceText = card.querySelector('.offer-price strong').textContent;
            const cardPrice = parseInt(cardPriceText.replace('$', ''));
            
            // Отримуємо рік з картки
            const cardYearText = Array.from(card.querySelectorAll('.offer-details p')).find(p => p.textContent.startsWith('Рік:')).textContent;
            const cardYear = parseInt(cardYearText.replace('Рік: ', ''));

            // Перевіряємо, чи відповідає картка встановленим фільтрам
            const priceMatch = cardPrice >= priceFromValue && cardPrice <= priceToValue;
            // Якщо рік не вибрано (yearValue === 0), то вважаємо, що будь-який рік підходить
            const yearMatch = yearValue === 0 || cardYear === yearValue;

            // Показуємо або приховуємо картку залежно від результатів перевірки
            if (priceMatch && yearMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- 3. Ініціалізація та додавання обробників подій ---
    populateYears(); // Викликаємо функцію заповнення років при завантаженні сторінки

    // Додаємо обробник події "submit" для форми фільтрів
    filterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Запобігаємо перезавантаженню сторінки
        applyFilters(); // Викликаємо функцію фільтрації
    });
});