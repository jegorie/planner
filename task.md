Добавь управления лейблами по аналогии с тасками.
Мне нужно получать список лейблов привязанных к проекту и сохранять эту информацию в атомах.
Мне нужно реализовать возможность синхронизировать изменения на беке при создании/изменении/удалении лейбла.
Отправка на бэк происходит только один раз при нажатии на кнопку сохранения, поэтому не делай автосохранение, а просто добавь функцию для отправки данных на бэк.

Базовый URL

  Все операции с лейблами выполняются в контексте проекта:
  /projects/{projectId}/labels

  Аутентификация

  Все запросы требуют JWT токен в заголовке Authorization: Bearer <token>

  Методы

  1. Получить все лейблы проекта

  GET /projects/{projectId}/labels

  Пример:
  const response = await fetch(`/projects/${projectId}/labels`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const labels = await response.json();

  2. Получить лейбл по ID

  GET /projects/{projectId}/labels/{labelId}

  Пример:
  const response = await fetch(`/projects/${projectId}/labels/${labelId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const label = await response.json();

  3. Создать новый лейбл

  POST /projects/{projectId}/labels
  Content-Type: application/json

  Тело запроса:
  {
    "title": "Important",
    "color": "orange"  // optional, по умолчанию "none"
  }

  Пример:
  const response = await fetch(`/projects/${projectId}/labels`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Important',
      color: 'orange'
    })
  });
  const newLabel = await response.json();

  4. Обновить лейбл

  PATCH /projects/{projectId}/labels/{labelId}
  Content-Type: application/json

  Тело запроса: (все поля опциональны)
  {
    "title": "Very Important",
    "color": "none"
  }

  Пример:
  const response = await fetch(`/projects/${projectId}/labels/${labelId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Updated Title'
    })
  });
  const updatedLabel = await response.json();

  5. Удалить лейбл

  DELETE /projects/{projectId}/labels/{labelId}

  Пример:
  const response = await fetch(`/projects/${projectId}/labels/${labelId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  // response.status === 204 если успешно

  Доступные цвета

  - "orange"
  - "none"

  Ошибки

  - 401 - Не авторизован
  - 404 - Лейбл не найден или не принадлежит проекту
  - 400 - Неверные данные запроса
