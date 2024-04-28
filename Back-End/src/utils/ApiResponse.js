// Here we will send responses using Express not nodejs so thats why we are not extending it as we did in ApiError
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}