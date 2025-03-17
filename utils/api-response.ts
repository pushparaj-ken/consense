export class ApiResponse {
  static success(data: any = null, message = "Success") {
    return {
      success: true,
      message,
      data,
    };
  }

  static fail(message = "Failure", data: any = null) {
    return {
      success: false,
      message,
      data,
    };
  }
}
