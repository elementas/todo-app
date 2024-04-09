CREATE TRIGGER tr_app_user_bu BEFORE UPDATE ON app_user FOR EACH ROW EXECUTE PROCEDURE set_updated_column();
--
CREATE TRIGGER tr_app_list_bu BEFORE UPDATE ON app_list FOR EACH ROW EXECUTE PROCEDURE set_updated_column();
--
CREATE TRIGGER tr_app_task_bu BEFORE UPDATE ON app_task FOR EACH ROW EXECUTE PROCEDURE set_updated_column();
--
CREATE TRIGGER tr_app_task_bi BEFORE INSERT ON app_task FOR EACH ROW EXECUTE PROCEDURE set_order_position_column();
--
