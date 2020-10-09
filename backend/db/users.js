module.exports = {
    getAllUsers: () => ({
        text: `SELECT user_id, username, first_name, last_name 
                FROM users`,
    }),
    getUser: (userId) => ({
        text: `SELECT username, first_name, last_name 
                FROM users 
                WHERE user_id = $1`,
        values: [userId]
    }), 
    deleteUser: (userId, userPassword) => ({
        text: `DELETE FROM users 
                WHERE user_id = $1 
                AND user_password = crypt($2, user_password)`,
        values: [userId, userPassword]
    }),
    createUser: (username, userPassword, firstName=null, lastName=null) => {
        if (!username || !userPassword) {
            throw 'Please provide username and password';
        }

        return {
            text: `INSERT INTO users(username, user_password, first_name, last_name)
                    VALUES ($1, crypt($2, gen_salt('bf')), $3, $4)`,
            values: [username, userPassword, firstName, lastName]
        }
    },
    updateUser: (userId, {username=null, userPassword=null, firstName=null, lastName=null}) => {
        // check user password
        return {
            text: `UPDATE users 
                    SET username = COALESCE($1, username),
                        user_password = COALESCE(crypt($2, gen_salt('bf')), user_password),
                        first_name = COALESCE($3, first_name),
                        last_name = COALESCE($4, last_name)
                    WHERE user_id=$5`,
            values: [username, userPassword, firstName, lastName, userId]
        }
    }
}