# Angular Skill Challenge

Тестовое задание на знание ангуляра


## Installation
```
  npm install;
  bower install;

  node server/server.js;
```


## Задача

Нужно сделать TODO список, нужно чтобы приложение имело следующий функционал:
- отображение списка задач c тегами,
- создание новой задачи в модальном окне
- удаление задачи из списка, перед удалением должно появляться модальное окно с подтверждением действий (не window.confirm, а полноценное кастомное модальное окно )
- модальное окно должно быть реализовано как компонент, который может иметь кастомный контент


## Дано

Есть следующие апишки

- GET: /api/v0/todos/tags - возвращает список тегов

пример ответа:
```
{
    "items": {
        "1": "#низкий приоритет",
        "2": "#средний приоритет",
        "3": "#высокий приоритет",
        "4": "#АЛЯРМ!!!"
    }
}
```

- GET: /api/v0/todos/items - возвращает список задач, выполняется в несолько запросов,
если поле finish === false, значит нужно выполнить еще один запрос чтобы получить слудующая пачку задач, при всех последующих запросах после первого нужно указывать в get параметре хеш, пример
/api/v0/todos/items?hash=1

пример ответа:
```
{
    "hash": "1",
    "finish": false,
    "items": [
        {
            "id": 1,
            "tag": 2,
            "content": "challenge#1"
        },
        {
            "id": 2,
            "tag": 5,
            "content": "challenge#2"
        }
    ]
}
```

- POST: /api/v0/todo/item - сохраняет новую айтем в список
форма для отправки
```
{
  item: {
    tag: 2,
    content: 'new TODO item'
  }
}
```
если с фомрой все ОК в ответе будет 200 и созданный айтем


- DELETE: /api/v0/todo/item/1 - удаляет айтем из списка,

пример успещного ответа
```
{
    "status": "Ok"
}
```
