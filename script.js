const tg = window.Telegram.WebApp;
tg.expand(); // Растягиваем на весь экран

// --- НАСТРОЙКИ ---
const BOT_USERNAME = "QibysShopBot"; // Без @, например: MyCoolBot
// -----------------

const user = tg.initDataUnsafe.user;

// Элементы
const avatar = document.getElementById('user-avatar');
const nameEl = document.getElementById('user-name');
const loginEl = document.getElementById('user-login');
const idEl = document.getElementById('user-id');
const linkInput = document.getElementById('ref-link');
const balanceEl = document.getElementById('balance');

// Инициализация данных
if (user) {
    nameEl.innerText = `${user.first_name} ${user.last_name || ''}`;
    loginEl.innerText = user.username ? `@${user.username}` : "Скрыт";
    idEl.innerText = user.id;

    if (user.photo_url) {
        avatar.src = user.photo_url;
    }

    // Формируем ссылку
    const refLink = `https://t.me/${BOT_USERNAME}?start=${user.id}`;
    linkInput.value = refLink;

    // Имитация загрузки баланса (анимация цифр)
    animateValue(balanceEl, 0, 500, 1500);
}

// Функция копирования с вибрацией
function copyLink() {
    linkInput.select();
    document.execCommand("copy");
    
    // Вибрация (Haptic Feedback) - работает на телефоне
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }

    tg.showPopup({
        title: "Скопировано",
        message: "Ссылка готова к отправке!",
        buttons: [{type: "ok"}]
    });
}

// Функция "Поделиться" через нативное меню Телеграма
function shareToFriends() {
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
    const link = linkInput.value;
    const text = "Зацени этот бот! Тут дают бонусы 💎";
    
    // Открывает выбор чата в Telegram для отправки
    const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
    tg.openTelegramLink(url);
}

// Анимация чисел для красоты
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + " 💎";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
