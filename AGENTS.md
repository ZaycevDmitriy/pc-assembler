<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PC Assembler

Next.js-приложение для сборки конфигураций ПК: пользователи создают сборки (Build)
из комплектующих (Component), публикуют их и ставят лайки.

## Стек

Next.js 16 (App Router) · React 19 · Prisma 7 (Postgres) · next-auth · Tailwind v4 · shadcn/ui

## Команды

```bash
docker compose up -d            # Поднять Postgres (БД pcbuilder, порт 5432)
npx prisma generate             # ОБЯЗАТЕЛЬНО перед сборкой (клиент в .gitignore)
npx prisma migrate dev          # Применить миграции
npx prisma db seed              # Заполнить тестовыми данными (tsx prisma/seed.ts)
npm run dev                     # Dev-сервер на :3000
npm run build                   # Прод-сборка
npm run lint                    # ESLint (lad-tech + prettier + sonarjs)
npm run format                  # Prettier --write
```

## Архитектура

- `app/` — App Router. Server actions для auth: `signup/actions.ts`, `login/action.ts`.
- `auth.ts` (корень) — конфиг next-auth: Credentials + bcrypt, JWT-стратегия, страница входа `/login`.
- `lib/db.ts` — синглтон Prisma через driver adapter `PrismaPg` + `pg.Pool`.
- `prisma/schema.prisma` — модели: User, Build, Component, BuildComponent, Like.
- `components/ui/` — компоненты shadcn/ui (radix-ui).
- `types/next-auth.d.ts` — расширение типа сессии (`user.id`).

## Gotchas

- Prisma-клиент генерируется в `lib/generated/prisma` и **в .gitignore**.
  Импортировать из `@/lib/generated/prisma/client`, НЕ из `@prisma/client`.
  После `git clone` или смены схемы — обязателен `prisma generate`.
- Генератор — новый `prisma-client` (Prisma 7), конфиг вынесен в `prisma.config.ts`
  (не в блок `datasource`). Подключение к БД — только через driver adapter.
- Тесты не настроены — фреймворка для `npm test` нет.
- Код-стайл: одинарные кавычки, 2 пробела, точка с запятой, комментарии — на русском.
