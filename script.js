const tg = window.Telegram.WebApp;

// Сообщаем телеграму, что приложение готово
tg.expand();

// Настройка цветов под тему
document.body.style.backgroundColor = tg.backgroundColor;

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;

// Элементы HTML
const avatarEl = document.getElementById('user-avatar');
const nameEl = document.getElementById('user-name');
const idEl = document.getElementById('user-id');
const loginEl = document.getElementById('user-login');
const refInput = document.getElementById('ref-link');

// ВСТАВЬ СЮДА ЮЗЕРНЕЙМ СВОЕГО БОТА (без @)
const BOT_USERNAME = "ИМЯ_ТВОЕГО_БОТА"; 

if (user) {
    // Заполняем профиль
    nameEl.innerText = `${user.first_name} ${user.last_name || ''}`;
    idEl.innerText = user.id;
    loginEl.innerText = user.username ? `@${user.username}` : "Скрыт";

    // Если у пользователя есть фото (работает не всегда из-за приватностей, но часто)
    if (user.photo_url) {
        avatarEl.src = user.photo_url;
    } else {
        avatarEl.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Заглушка
    }

    // Генерируем реферальную ссылку
    // Ссылка вида: https://t.me/BotName?start=12345
    const link = `https://t.me/${BOT_USERNAME}?start=${user.id}`;
    refInput.value = link;
} else {
    nameEl.innerText = "Откройте в Telegram";
}

// Функция копирования
function copyLink() {
    refInput.select();
    document.execCommand("copy");
    tg.showPopup({
        title: "Готово!",
        message: "Ссылка скопирована в буфер обмена.",
        buttons: [{type: "ok"}]
    });
}