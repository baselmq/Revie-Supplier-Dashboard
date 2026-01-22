import z from "zod";

export const companySchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  licenseNumber: z.string().min(2, "License number is required"),
  address: z.string().min(2, "Address is required"),
  city: z.string().min(2, "City is required"),
});

export const servicesSchema = z.object({
  serviceCategories: z
    .array(z.string())
    .min(1, "Select at least one service category"),
});

export const contactSchema = z.object({
  id: z.string(),
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = companySchema
  .and(servicesSchema)
  .and(contactSchema);

export type SignUpInput = z.infer<typeof signUpSchema>;
