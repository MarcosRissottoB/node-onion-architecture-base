const { generateToken } = require('../helpers/jwt.helper');
let _userService = null;

class AuthService {
    constructor({UserService}) {
        _userService = UserService;
    }

    async signUp(user) {
        const {username: {username}} = user;
        const userExist = await _userService.getUserByUsername(username);
        if(userExist) {
            const error = new Error();
            error.status = 401;
            error.message = 'El usuario ya exíste';
            throw error;
        }
        return await _userService.create(user);
    }

    async signIn(user) {
        const {username: {username}, password} = user;
        const userExist = await _userService.getUserByUsername(username);
        if(!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = 'El usuario no exíste';
            throw error;
        }
        const isValidPassword = userExist.comparePasswords(password);
        if(!isValidPassword) {
            const error = new Error();
            error.status = 400;
            error.message = 'Password incorrecto';
            throw error;
        }
        const userToEnconde = {
            username: userExist.username,
            id: userExist._id
        }
        const token = generateToken(userToEnconde);
        return { token, user: userExist };
    }   
}

module.exports = AuthService;