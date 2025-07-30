"use client";

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
      ready: (cb: () => void) => void;
    };
  }
}

import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters long")
    .max(1000, "Message can't exceed 1000 characters"),
});

const ContactForm = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    if (!recaptchaLoaded) {
      toast.info("reCAPTCHA is still loading. Please wait and try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Get reCAPTCHA v3 token
      const recaptchaToken = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
        {
          action: "contact_form",
        }
      );

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error(`Error ${result.status}`, {
          description: result?.error?.message || "Error sending message",
        });
      }
    } catch (error) {
      toast.error(`Error ${error}`, {
        description: (error as string) || "Error sending message",
      });
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onLoad={onRecaptchaLoad}
        strategy="lazyOnload"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 w-full ml-auto max-w-4xl"
        >
          <div className="grid md:grid-cols-[1fr_1fr]  gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px]">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Let’s start with your name!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your best email goes here!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[20px]">Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="border-black border-2 h-40 rounded-2xl"
                    placeholder="Type your message like you mean it!"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center self-end">
            {isSubmitting ? <Loader2 className="animate-spin mr-1" /> : null}
            <Button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-black ml-6 px-6 text-2xl py-6 font-secondary-bold cursor-pointer shadow-[3px_3px_0_0_rgba(0,0,0,0.15)] hover:bg-black hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] transition-all  duration-400 ease-in-out rounded-2xl  active:translate-y-[3px] active:translate-x-[3px] active:shadow-none hover:scale-105"
            >
              Submit
              <Image
                aria-hidden
                src={
                  !isHovered
                    ? "/icons/rocket-colored-no-fire.png"
                    : "/icons/rocket-colored.png"
                }
                alt={!isHovered ? "Rocket with no fire" : "Rocket"}
                width={25}
                height={25}
              />
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default ContactForm;
