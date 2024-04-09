const db = require('../../db');

exports.getUserInformation = async (email) => {
    const {
        rows: [user]
    } = await db.query(
        `
        SELECT
            u.app_user_id,
            u.name,
            u.email,
            u.password,
            u.admin
        FROM app_user u
        WHERE
            u.email = $1
        AND
            u.enabled;
        `,
        [email]
    );

    return user;
};

exports.registerUser = async (name, email, passwordHash) => {
    const {
        rows: [user]
    } = await db.query(
        `
        INSERT INTO app_user ("name", "email", "password")
        VALUES ($1, $2, $3)
        RETURNING
            app_user_id,
            name,
            email;
        `,
        [name, email, passwordHash]
    );

    return user;
};
