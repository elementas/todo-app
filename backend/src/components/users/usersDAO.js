const db = require('../../db');

exports.getUser = async (userId) => {
    const {
        rows: [user]
    } = await db.query(
        `
        SELECT
            u.app_user_id,
            u.name,
            u.email,
            u.admin,
            u.enabled,
            u.updated,
            u.created
        FROM app_user u
        WHERE
            u.app_user_id = $1
        AND
            NOT u.superuser;
        `,
        [userId]
    );

    return user;
};

exports.getUsers = async () => {
    const { rows: users } = await db.query(
        `
        SELECT
            u.app_user_id,
            u.name,
            u.email,
            u.admin,
            u.enabled,
            u.updated,
            u.created
        FROM app_user u
        WHERE
            NOT u.superuser
        ORDER BY u.email ASC;
        `,
        []
    );

    return users;
};

exports.createUser = async (name, email, enabled, passwordHash) => {
    const {
        rows: [user]
    } = await db.query(
        `
        INSERT INTO app_user ("name", "email", "password", "enabled")
        VALUES ($1, $2, $3, $4)
        RETURNING
            app_user_id,
            name,
            email,
            admin,
            enabled,
            updated,
            created;
        `,
        [name, email, passwordHash, enabled]
    );

    return user;
};

exports.updateUser = async (userId, name, enabled, passwordHash = null) => {
    // const args = [userId, name, enabled];
    // if (passwordHash) {
    //     args.push(passwordHash);
    // }
    // const {
    //     rows: [user]
    // } = await db.query(
    //     `
    //     UPDATE app_user
    //     SET
    //         name = $2,
    //         enabled = $3
    //         ${passwordHash ? ', password = $4 ' : ''}
    //     WHERE
    //         app_user_id = $1;
    //     `,
    //     args
    // );
    // return user;
};

exports.deleteUser = async (userId) => {
    const {
        rows: [user]
    } = await db.query(
        `
        DELETE FROM app_user
        WHERE
            app_user_id = $1
        AND
            NOT superuser
        RETURNING
            app_user_id,
            name,
            email,
            admin,
            enabled,
            updated,
            created;
        `,
        [userId]
    );

    return user;
};
