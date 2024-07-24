// src/validations/loginValidation.js
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Validates email format
    .min(1, "Email is required") // Ensures email field is not empty
    .min(5, "Email must be at least 5 characters long") // Optional: Ensure minimum length for email
    .max(255, "Email must be less than 255 characters long"), // Optional: Ensure maximum length for email

  password: z
    .string()
    .min(1, "Password is required") // Ensures password field is not empty
    .min(6, "Password must be at least 6 characters long") // Ensures minimum length for password
    .max(50, "Password must be less than 50 characters long"), // Optional: Ensure maximum length for password
});

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .min(1, "Password is required"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(
      /^98\d{8}$/,
      "Phone number must start with 98 and be 10 digits long"
    ),
  dob: z.string(), // Optional field
  gender: z.string().min(1, "Gender is required"),
  address: z.string(), // Optional field
});

export const songSchema = z.object({
  artist_id: z.number().nonnegative({ message: "Artist ID must be a non-negative number" }),
  title: z.string().min(1, { message: "Title is required" }),
  album_name: z.string().min(1, { message: "Album Name is required" }),
  genre: z.string().min(1, { message: "Genre is required" })
});

export const artistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.string().min(1, 'Date of Birth is required'),
  gender: z.enum(['male', 'female', 'other'], 'Gender is required'),
  address: z.string().min(1, 'Address is required'),
  first_release_year: z.string().min(1, 'First Release Year is required').regex(/^\d{4}$/, 'Invalid year format'),
  no_of_albums_released: z.string().min(1, 'Number of Albums Released is required').regex(/^\d+$/, 'Invalid number format'),
});

export const updateUserSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits long').regex(/^98\d+$/, 'Invalid phone number format'),
});

export const updateArtistSchema = z.object({
  no_of_albums_released: z
    .string()
    .nonempty('Number of albums released is required')
    .regex(/^\d+$/, 'Must be a number'),
});