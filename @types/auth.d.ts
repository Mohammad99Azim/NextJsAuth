interface SignupRequest {
  email: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

interface CheckUserResponse {
  email: string
}

