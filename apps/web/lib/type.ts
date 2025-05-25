import { z } from "zod";

export type FormState =
  | {
      error?: {
        name: string;
        email: string;
        password: string[];
      };
      message?: string;
    }
  | undefined;

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const TrainFormSchema = z.object({
  number: z.string().min(1, { message: "Train number is required" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
  departureStation: z
    .string()
    .min(2, { message: "Departure station is required" }),
  arrivalStation: z.string().min(2, { message: "Arrival station is required" }),
  departureTime: z.string().min(1, { message: "Departure time is required" }),
  arrivalTime: z.string().min(1, { message: "Arrival time is required" }),
});
export type TrainFormValues = z.infer<typeof TrainFormSchema>;
export type TrainFormState =
  | {
      error?: Partial<Record<keyof TrainFormValues, string>>;
      message?: string;
    }
  | undefined;
