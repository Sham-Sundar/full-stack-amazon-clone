// Here we will send responses using Express not nodejs so thats why we are not extending it as we did in ApiError
class ApiResponse {
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode < 400
    }
}

export { ApiResponse }