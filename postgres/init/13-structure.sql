CREATE TABLE IF NOT EXISTS app_user (
    "app_user_id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL CHECK (char_length("name") >= 1 AND char_length("name") <= 32),
    "email" TEXT NOT NULL CHECK (char_length("email") >= 3 AND char_length("email") <= 320),
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "superuser" BOOLEAN NOT NULL DEFAULT FALSE,
    "enabled" BOOLEAN NOT NULL DEFAULT TRUE,
    "updated" TIMESTAMPTZ NULL DEFAULT NULL,
    "created" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--
CREATE TABLE IF NOT EXISTS app_list (
    "app_list_id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "label" TEXT NOT NULL CHECK (char_length("label") >= 1 AND char_length("label") <= 255),
    "app_user_id" UUID NOT NULL REFERENCES app_user("app_user_id") ON DELETE CASCADE,
    "updated" TIMESTAMPTZ NULL DEFAULT NULL,
    "created" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--
CREATE TABLE IF NOT EXISTS app_task (
    "app_task_id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "app_list_id" UUID NOT NULL REFERENCES app_list("app_list_id") ON DELETE CASCADE,
    "parent_id" UUID NULL REFERENCES app_task("app_task_id") ON DELETE CASCADE,
    "app_user_id" UUID NULL REFERENCES app_user("app_user_id") ON DELETE CASCADE,
    "label" TEXT NOT NULL CHECK (char_length("label") >= 1 AND char_length("label") <= 255),
    "description" TEXT NULL DEFAULT NULL CHECK (char_length("description") <= 32000),
    "due" TIMESTAMPTZ NULL DEFAULT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT FALSE,
    "finished_timestamp" TIMESTAMPTZ NULL DEFAULT NULL,
    "order_position" INTEGER NULL DEFAULT NULL,
    "updated" TIMESTAMPTZ NULL DEFAULT NULL,
    "created" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);