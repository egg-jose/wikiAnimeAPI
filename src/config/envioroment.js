import dotnet from 'dotenv';
dotnet.config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
};

export default env;
