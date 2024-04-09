const db = require('../../db');

exports.getUnfinishedUserTasks = async (userId, listId) => {
    const { rows: tasks } = await db.query(
        `
        SELECT
            t.app_task_id,
            t.app_list_id,
            t.app_user_id,
            t.label,
            t.description,
            t.due,
            t.finished,
            t.finished_timestamp,
            t.updated,
            t.created
        FROM app_task t
        WHERE
            t.app_user_id = $1
        AND
            t.app_list_id = $2
        AND
            NOT t.finished
        ORDER BY t.order_position;
        `,
        [userId, listId]
    );

    return tasks;
};

exports.getFinishedUserTasks = async (userId, listId) => {
    const { rows: tasks } = await db.query(
        `
        SELECT
            t.app_task_id,
            t.app_list_id,
            t.app_user_id,
            t.label,
            t.description,
            t.due,
            t.finished,
            t.finished_timestamp,
            t.updated,
            t.created
        FROM app_task t
        WHERE
            t.app_user_id = $1
        AND
            t.app_list_id = $2
        AND
            t.finished
        ORDER BY t.finished_timestamp DESC;
        `,
        [userId, listId]
    );

    return tasks;
};

exports.createUserTask = async (
    userId,
    listId,
    label,
    description = null,
    due = null,
    finished = false
) => {
    const {
        rows: [task]
    } = await db.query(
        `
        INSERT INTO app_task (
            "app_user_id",
            "app_list_id",
            "label",
            "description", 
            "due",
            "finished",
            "order_position"
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            (
                SELECT COUNT(at.*) + 1
                FROM app_task at
                WHERE
                    at.app_user_id = $1
                AND
                    at.app_list_id = $2
            )
        )
        RETURNING
            app_task_id,
            app_list_id,
            app_user_id,
            label,
            description,
            due,
            finished,
            finished_timestamp,
            updated,
            created
        `,
        [userId, listId, label, description, due, finished]
    );

    return task;
};

exports.updateUserTask = async (
    userId,
    listId,
    taskId,
    label,
    description = null,
    due = null,
    finished = false
) => {
    const {
        rows: [task]
    } = await db.query(
        `
        UPDATE app_task
        SET
            label = $4,
            description = $5,
            due = $6,
            finished = $7
            ${finished ? ', finished_timestamp = NOW() ' : ''}
        WHERE
            app_user_id = $1
        AND
            app_list_id = $2
        AND
            app_task_id = $3
        RETURNING
            app_task_id,
            app_list_id,
            app_user_id,
            label,
            description,
            due,
            finished,
            finished_timestamp,
            updated,
            created;
        `,
        [userId, listId, taskId, label, description, due, finished]
    );

    return task;
};

exports.deleteUserTask = async (userId, listId, taskId) => {
    const {
        rows: [task]
    } = await db.query(
        `
        DELETE FROM app_task
        WHERE
            app_user_id = $1
        AND
            app_list_id = $2
        AND
            app_task_id = $3
        RETURNING
            app_task_id,
            app_list_id,
            app_user_id,
            label,
            description,
            due,
            finished,
            finished_timestamp,
            updated,
            created;
        `,
        [userId, listId, taskId]
    );

    return task;
};
