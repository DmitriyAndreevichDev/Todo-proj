const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt")
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDTO = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-errors")

const salt = 2347025

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findOne({email})

        if(candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const activationLink = uuid.v4()
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        // todo доделать рассылку по почте и функцию активации
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const userDto = new UserDTO(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
    async login(email, password) {
        const user = await UserModel.findOne({email})

        if(!user) {
            throw ApiError.BadRequest(`Пользователя ${email} не существует`)
        }
        const isEqualPasswords = await bcrypt.compare(password, user.password)
        if(!isEqualPasswords) {
            throw ApiError.BadRequest("Некорректный пароль")
        }
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedErrors()
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        // console.log(userData)
        // console.log(tokenFromDb)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedErrors()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
}

module.exports = new UserService();
