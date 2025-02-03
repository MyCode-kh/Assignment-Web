import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

type Config = {
  env: string;
  port: number;
  mongodbUrl: string;
  jwt_secret: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  const env = process.env.NODE_ENV || "development";

  // Ensure correct path to environment file
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);

  console.log(`Loading environment from: ${envPath}`);

  // Load .env file based on the environment
  dotenv.config({ path: envPath });

  // Define validation schema using Joi
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "production").required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().uri().required(),
    JWT_SECRET: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
    jwt_secret: envVars.JWT_SECRET,
  };
}

const configs = loadConfig();
export default configs;
