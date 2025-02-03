// Define the request body types
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
