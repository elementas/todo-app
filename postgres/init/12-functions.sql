CREATE OR REPLACE FUNCTION set_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
--
CREATE OR REPLACE FUNCTION set_order_position_column()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_id IS NULL THEN
        NEW.order_position = (
            SELECT
                COALESCE(MAX(order_position), 0) + 1
            FROM app_task
            WHERE
                app_list_id = NEW.app_list_id
            AND
                parent_id IS NULL
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
