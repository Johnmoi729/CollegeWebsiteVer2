import * as Yup from "yup";

// Common validation schemas
export const nameSchema = Yup.string()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be 50 characters or less");

export const emailSchema = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

export const phoneSchema = Yup.string()
  .matches(/^\d{10}$/, "Phone number must be 10 digits")
  .required("Phone number is required");

export const passwordSchema = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

export const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm password is required");

// Form-specific validation schemas
export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: passwordSchema,
});

export const registrationValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less")
    .required("Username is required"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export const profileValidationSchema = Yup.object({
  email: emailSchema,
  phoneNumber: phoneSchema,
  residentialAddress: Yup.string().required("Residential address is required"),
  permanentAddress: Yup.string().required("Permanent address is required"),
});

export const feedbackValidationSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 characters or less"),
});

export const educationDetailSchema = Yup.object({
  university: Yup.string().required("University/Board name is required"),
  enrollmentNumber: Yup.string().required("Enrollment number is required"),
  center: Yup.string().required("Center/School name is required"),
  stream: Yup.string().required("Stream is required"),
  field: Yup.string().required("Field of study is required"),
  marksSecured: Yup.number()
    .required("Marks secured is required")
    .min(0, "Marks cannot be negative"),
  outOf: Yup.number()
    .required("Maximum marks is required")
    .min(1, "Maximum marks must be at least 1"),
  classObtained: Yup.string().required("Class/Division obtained is required"),
});

export const courseValidationSchema = Yup.object({
  name: nameSchema,
  code: Yup.string().required("Course code is required"),
  description: Yup.string().required("Description is required"),
  departmentId: Yup.string().required("Department is required"),
  credits: Yup.number()
    .required("Credits are required")
    .min(1, "Credits must be at least 1"),
  duration: Yup.string().required("Duration is required"),
});

export const departmentValidationSchema = Yup.object({
  name: nameSchema,
  description: Yup.string().required("Description is required"),
});

export const facultyValidationSchema = Yup.object({
  name: nameSchema,
  designation: Yup.string().required("Designation is required"),
  qualification: Yup.string().required("Qualification is required"),
  email: emailSchema,
  phoneNumber: phoneSchema,
  departmentId: Yup.string().required("Department is required"),
  bio: Yup.string().max(500, "Bio must be 500 characters or less"),
  joinDate: Yup.date().required("Join date is required"),
});
