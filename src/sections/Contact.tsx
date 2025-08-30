"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import type {
  FormData,
  EmailJSParams,
  ChangeHandler,
  SubmitHandler,
} from "../types/global";
import type { AlertProps } from "../types/components";

// Contact form component props interface
interface ContactProps {
  className?: string;
}

// Alert type for internal state management
type AlertType = AlertProps["type"];

const Contact: React.FC<ContactProps> = ({ className }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>("success");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleChange: ChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showAlertMessage = (type: AlertType, message: string): void => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit: SubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted:", formData);

      const emailParams: EmailJSParams = {
        from_name: formData.name,
        to_name: "Ali",
        from_email: formData.email,
        to_email: "AliSanatiDev@gmail.com",
        message: formData.message,
      };

      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        emailParams,
        "pn-Bw_mS1_QQdofuV"
      );

      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      console.error("Email send error:", error);
      showAlertMessage("danger", "Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section
      className={`relative flex items-center c-space section-spacing ${
        className || ""
      }`}
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let&apos;s Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you&apos;re looking to build a new website, improve your
            existing platform, or bring a unique project to life, I&apos;m here
            to help.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
