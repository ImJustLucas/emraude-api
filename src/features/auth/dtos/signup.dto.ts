import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(1).max(50),
});

export type SignupDto = z.infer<typeof SignupSchema>;
