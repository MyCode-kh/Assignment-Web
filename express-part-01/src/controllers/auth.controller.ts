import { Controller, Post, Body, SuccessResponse, Route, Tags } from "tsoa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "../config";
import User from "@/database/models/user.models";
import { SignInRequest, SignUpRequest } from "./types/user-request.type";
import { SignInResponse, SignUpResponse } from "./types/user-response.type";

const JWT_SECRET = configs.jwt_secret;

@Route("api/v1.0/auth")
@Tags("Auth")
export class AuthController extends Controller {
  /**
   * User Registration
   * @param body The request body containing the name, email, and password
   * @returns Success response with JWT token
   */
  @Post("signup")
  @SuccessResponse("201", "User created successfully")
  public async signUp(@Body() body: SignUpRequest): Promise<SignUpResponse> {
    const { name, email, password } = body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { message: "User created successfully", token };
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          throw new Error(error.message || "Something went wrong");
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("Something went wrong");
      }
    }
  }

  /**
   * User Login
   * @param body The request body containing email and password
   * @returns Success response with JWT token
   */
  @Post("signin")
  @SuccessResponse("200", "Login successful")
  public async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    const { email, password } = body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      // Compare the password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { message: "Login successful", token };
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong");
    }
  }
}
