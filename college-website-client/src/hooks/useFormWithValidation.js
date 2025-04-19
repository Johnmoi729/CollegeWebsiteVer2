import { useFormik } from "formik";
import { useState } from "react";

export function useFormWithValidation({
  initialValues,
  validationSchema,
  onSubmit,
  onSuccess,
  onError,
}) {
  const [serverErrors, setServerErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus({
        isSubmitting: true,
        isSuccess: false,
        isError: false,
      });
      setServerErrors({});

      try {
        const result = await onSubmit(values);
        setSubmitStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
        });

        if (onSuccess) {
          onSuccess(result);
        }

        if (resetForm) {
          resetForm();
        }
      } catch (error) {
        setSubmitStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
        });

        if (error.response?.data?.errors) {
          setServerErrors(error.response.data.errors);
        }

        if (onError) {
          onError(error);
        }
      }
    },
  });

  return {
    formik,
    serverErrors,
    submitStatus,
    resetServerErrors: () => setServerErrors({}),
  };
}
