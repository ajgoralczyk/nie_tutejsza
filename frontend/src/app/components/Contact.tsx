"use client";

import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";
import Input from "./Input";

enum InputType {
  Name,
  Email,
  Message,
}

type ContactProps = {
  description: string;
};

export default function Contact({ description }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  async function handleSubmit() {
    // TODO handle errors?

    const res = await fetch(getStrapiURL() + "/api/message-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { name, email, message } }),
    });

    if (!res.ok) {
      setErrorMessage("Email failed to submit.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("Email successfully submitted!");
    setName("");
    setEmail("");
    setMessage("");
  }

  function handleInputChange(inputType: InputType, value: string) {
    console.log("handleInputChange", inputType, value);
    switch (inputType) {
      case InputType.Name:
        setName(value);
        break;
      case InputType.Email:
        setEmail(value);
        break;
      case InputType.Message:
        setMessage(value);
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <h3>Kontakt</h3>
      {description && <div className="pb-4">{description}</div>}
      {successMessage ? (
        <p>{successMessage}</p>
      ) : (
        <form className="flex flex-col gap-2">
          <Input
            label="Imię"
            id="name"
            updateValue={(value) => handleInputChange(InputType.Name, value)}
            isRequired={true}
          />
          <Input
            label="Email"
            id="email"
            pattern={emailRegex}
            updateValue={(value) => handleInputChange(InputType.Email, value)}
            isRequired={true}
          />
          <Input
            label="Wiadomość"
            id="message"
            updateValue={(value) => handleInputChange(InputType.Message, value)}
            isRequired={true}
            textarea={true}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button
            className="bg-black text-background rounded-xl py-2"
            onClick={handleSubmit}
          >
            Wyślij
          </button>
        </form>
      )}
    </>
  );
}
