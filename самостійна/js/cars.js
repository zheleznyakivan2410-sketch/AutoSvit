document.addEventListener('DOMContentLoaded', function () {
    const filterForm = document.querySelector('.filters-form');
    const carCards = document.querySelectorAll('.offer-card');
    const yearSelect = document.getElementById('year');

    if (!filterForm || !carCards.length || !yearSelect) return;

    // --- 1. Динамічне заповнення років ---
    function populateYears() {
        const years = new Set(); // Використовуємо Set для унікальних значень
        carCards.forEach(card => {
            const yearText = card.querySelector('.offer-details p:first-child').textContent;
            const year = parseInt(yearText.replace('Рік: ', ''));
            if (!isNaN(year)) {
                years.add(year);
            }
        });

        // Сортуємо роки від найновішого до найстарішого
        const sortedYears = Array.from(years).sort((a, b) => b - a);

        // Створюємо та додаємо опції в select
        sortedYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
    }

    // --- 2. Логіка фільтрації ---
    function applyFilters() {
        const priceFromValue = parseInt(document.getElementById('price-from').value) || 0;
        // Виправляємо логіку: якщо поле "до" порожнє, вважаємо верхню межу нескінченною
        const priceToInput = document.getElementById('price-to').value;
        const priceToValue = priceToInput === '' ? Infinity : parseInt(priceToInput);

        const yearValue = parseInt(document.getElementById('year').value) || 0;

        carCards.forEach(card => {
            // Отримуємо дані з кожної картки
            const cardPriceText = card.querySelector('.offer-price strong').textContent;
            const cardPrice = parseInt(cardPriceText.replace('$', ''));
            
            const cardYearText = Array.from(card.querySelectorAll('.offer-details p')).find(p => p.textContent.startsWith('Рік:')).textContent;
            const cardYear = parseInt(cardYearText.replace('Рік: ', ''));

            // Перевіряємо відповідність фільтрам
            const priceMatch = cardPrice >= priceFromValue && cardPrice <= priceToValue;
            const yearMatch = yearValue === 0 || cardYear === yearValue; // Змінено >= на === для точного збігу

            // Показуємо або приховуємо картку
            if (priceMatch && yearMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- 3. Ініціалізація ---
    populateYears(); // Заповнюємо роки при завантаженні
    filterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Запобігаємо перезавантаженню сторінки
        applyFilters();
    });
});