# Инструкция по настройке Supabase для PemaCleaning

Для того чтобы отзывы и фотографии сохранялись в облаке, вам нужно создать проект в Supabase и получить ключи доступа.

## 1. Получение ключей (URL и API Key)

1.  Зарегистрируйтесь на [Supabase.com](https://supabase.com/) и создайте новый проект.
2.  В панели управления проектом перейдите в раздел **Project Settings** (иконка шестеренки внизу слева) -> **API**.
3.  Скопируйте следующие значения:
    *   **Project URL** (выглядит как `https://xyz.supabase.co`)
    *   **Project API anon key** (длинная строка символов)
4.  Откройте файл `reviews.js` в вашем проекте и вставьте эти значения в самом начале файла:
    ```javascript
    const SUPABASE_URL = 'ВАШ_PROJECT_URL';
    const SUPABASE_ANON_KEY = 'ВАШ_ANON_KEY';
    ```

## 2. Создание таблицы в базе данных

Перейдите в раздел **SQL Editor** в Supabase и выполните следующий запрос, чтобы создать таблицу для отзывов:

```sql
-- Создание таблицы отзывов
create table reviews (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null,
  photo_urls text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Включение защиты RLS
alter table reviews enable row level security;

-- Разрешить всем читать отзывы
create policy "Allow public read access" on reviews
  for select using (true);

-- Разрешить всем добавлять отзывы
create policy "Allow public insert access" on reviews
  for insert with check (true);

-- Разрешить удаление только через админку (для простоты пока разрешим всем, 
-- но в реальном проекте здесь должна быть проверка роли)
create policy "Allow public delete access" on reviews
  for delete using (true);
```

## 3. Настройка хранилища для фото (Storage)

1.  Перейдите в раздел **Storage** в панели Supabase.
2.  Нажмите **New Bucket** и создайте бакет с именем `review-photos`.
3.  Сделайте бакет **Public** (публичным), чтобы фотографии были видны на сайте.
4.  Перейдите в **Policies** для этого бакета и добавьте политики:
    *   **SELECT**: Разрешить всем (Public).
    *   **INSERT**: Разрешить всем (Public).
    *   **DELETE**: Разрешить всем (Public).

---
**Готово!** Теперь ваш сайт будет сохранять все данные в Supabase, и они не пропадут при очистке кэша браузера.
