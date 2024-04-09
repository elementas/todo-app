const db = require('../../db');

exports.getUserList = async (userId, listId) => {
    const {
        rows: [list]
    } = await db.query(
        `
        SELECT
            l.app_list_id,
            l.label,
            l.updated,
            l.created
        FROM app_list l
        WHERE
            l.app_list_id = $1
        AND
            l.app_user_id = $2
        `,
        [listId, userId]
    );

    return list;
};

exports.getUserLists = async (userId) => {
    const { rows: lists } = await db.query(
        `
        SELECT
            l.app_list_id,
            l.label,
            l.updated,
            l.created,
            (SELECT COUNT(t.*) FROM app_task t WHERE t.app_list_id = l.app_list_id AND NOT t.finished)::int as task_count,
            (SELECT COUNT(t.*) FROM app_task t WHERE t.app_list_id = l.app_list_id AND t.finished)::int as finished_task_count
        FROM app_list l
        WHERE
            l.app_user_id = $1
        ORDER BY l.created ASC;
        `,
        [userId]
    );

    return lists;
};

exports.createUserList = async (userId, label) => {
    const {
        rows: [list]
    } = await db.query(
        `
        INSERT INTO app_list ("label", "app_user_id")
        VALUES ($1, $2)
        RETURNING
            app_list_id,
            label,
            updated,
            created
        `,
        [label, userId]
    );

    return list;
};

exports.updateUserList = async (userId, listId, label) => {
    const {
        rows: [list]
    } = await db.query(
        `
        UPDATE app_list
        SET label = $3
        WHERE
            app_user_id = $1
        AND
            app_list_id = $2
        RETURNING
            app_list_id,
            label,
            updated,
            created;
        `,
        [userId, listId, label]
    );

    return list;
};

exports.deleteUserList = async (userId, listId) => {
    const {
        rows: [list]
    } = await db.query(
        `
        DELETE FROM app_list
        WHERE
            app_user_id = $1
        AND
            app_list_id = $2
        RETURNING
            app_list_id,
            label,
            updated,
            created;
        `,
        [userId, listId]
    );

    return list;
};
