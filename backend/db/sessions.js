module.exports = {
    userAndPassInDB: (username, password) => ({
        text: `SELECT user_id FROM users
                WHERE username = $1
                AND user_password = crypt($2, user_password)`,
        values: [username, password]
    }),
    userInDB: (username) => ({
        text: `SELECT user_id FROM users
                WHERE username = $1`,
        values: [username]
    })
}