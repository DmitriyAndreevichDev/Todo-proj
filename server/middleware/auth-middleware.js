const ApiError = require("../exceptions/api-errors");
const tokenService = require("../service/token-service")

module.exports = function (res, req, next) {
    try {

        console.log("header: " + req.req.headers.authorization)
        const authorizationHeader = req.req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedErrors())
        }

        const accessToken = authorizationHeader.split(" ")[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedErrors())
        }
            console.log("1")
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            return next(ApiError.UnauthorizedErrors())
        }
        console.log(2)

        req.user = userData
        next()
    } catch (e) {
        console.log(e)
        return next(ApiError.UnauthorizedErrors())
    }
}