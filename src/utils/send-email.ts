import { FormValusContactForm } from "./types";

export const sendEmail = async (data: FormValusContactForm) => {
  const apiEndpoint = "/api/email";

  await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      // toast.success(response.message);
    })
    .catch((err) => {
      // toast.error(err);
    });
};
