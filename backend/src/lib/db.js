import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGUSER, PGPASSWORD, PGDATABASE} = process.env;

// Create a SQL Connection
export const sql=neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
);

// this sql function is used to 
