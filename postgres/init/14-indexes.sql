CREATE UNIQUE INDEX app_user_email_idx ON app_user("email");
CREATE INDEX app_user_created_idx ON app_user("created");
--
CREATE UNIQUE INDEX app_list_label_app_user_id ON app_list("label", "app_user_id");
CREATE INDEX app_list_created_idx ON app_list("created");
--
CREATE INDEX app_task_due_idx ON app_task("due");
CREATE INDEX app_task_order_position_idx ON app_task("order_position");
CREATE INDEX app_task_created_idx ON app_task("created");
