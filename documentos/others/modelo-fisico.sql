CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "photo_url" varchar(255)
);

CREATE TABLE "states" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE
);

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(100),
  "description" varchar(255),
  "created_at" datetime NOT NULL,
  "due_date" datetime,
  "category_id" int,
  "state_id" int,
  "supertask_id" int,
  CONSTRAINT "FK_tasks.id" 
    FOREIGN KEY ("id") REFERENCES "tasks"("supertask_id"),
  CONSTRAINT "FK_tasks.state_id"
    FOREIGN KEY ("state_id") REFERENCES "states"("id"),
  CONSTRAINT "FK_tasks.category_id"
    FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);

CREATE TABLE "user_task" (
  "id" SERIAL PRIMARY KEY,
  "task_id" int,
  "user_id" int,
  CONSTRAINT "FK_user_task.user_id"
    FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  CONSTRAINT "FK_user_task.task_id"
    FOREIGN KEY ("task_id") REFERENCES "tasks"("id")
);

