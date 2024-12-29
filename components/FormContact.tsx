"use client";
import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { submitContact } from "@/actions/constactus/submitContact";
import { SendingToserver } from "./Loader";
import { NotifyMsg } from "./NotifyMsg";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import { cn } from "@/lib/utils";

export default function FormContact({
  lang,
  user,
}: {
  lang: string;
  user: any;
}) {
  const t = useTranslations("contactus");
  const [state, formAction, isPending] = useActionState(submitContact, null);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  
  const formSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, t("mobileValidationError")),
    email: z.string().email(t("emailValidationError")),
    message: z.string().min(10, t("msgValidationError")),
  });

  const validateField = (name: string, value: string) => {
    try {
      if (name === 'mobile') formSchema.shape.mobile.parse(value);
      else if (name === 'email') formSchema.shape.email.parse(value);
      else if (name === 'message') formSchema.shape.message.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-4"
      aria-labelledby="contact-form-title"
    >
      <h1 id="contact-form-title" className="sr-only">Contact Form</h1>
      <motion.form
        action={formAction}
        className={cn(
          "backdrop-blur-md",
          "bg-gradient-to-br from-background/10 to-background/5",
          "border border-orangeColor/20",
          "p-8 rounded-2xl shadow-lg",
          "flex flex-col gap-6",
          "hover:shadow-orangeColor/5 transition-all duration-300"
        )}
        aria-label="Contact form"
      >
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          role="group"
          aria-label="Personal information"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <InputContact
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="1234567890"
              className={cn(
                "text-base transition-all duration-200",
                "bg-background/50 hover:bg-background/70",
                "border-orangeColor/20",
                focused === "mobile" ? "ring-2 ring-orangeColor shadow-lg shadow-orangeColor/10" : "",
                !validateField("mobile", mobile) && mobile ? "border-red-500" : "",
                "placeholder:text-muted-foreground/50"
              )}
              labelName={t("mobile")}
              icon={<Icon icon="solar:phone-bold" className="w-5 h-5 text-orangeColor" />}
              onFocus={() => setFocused("mobile")}
              onBlur={() => setFocused(null)}
              required
              aria-required="true"
              aria-invalid={mobile ? !validateField("mobile", mobile) : undefined}
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <InputContact
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.firstName}
              className={cn(
                "text-base transition-all duration-200",
                "bg-background/50 hover:bg-background/70",
                "border-orangeColor/20",
                focused === "name" ? "ring-2 ring-orangeColor shadow-lg shadow-orangeColor/10" : "",
                "placeholder:text-muted-foreground/50"
              )}
              labelName={t("name")}
              icon={<Icon icon="solar:user-bold" className="w-5 h-5 text-orangeColor" />}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              aria-label="Full name"
            />
          </motion.div>

          <motion.div
            className="sm:col-span-2"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <InputContact
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user.email}
              className={cn(
                "text-base transition-all duration-200",
                "bg-background/50 hover:bg-background/70",
                "border-orangeColor/20",
                focused === "email" ? "ring-2 ring-orangeColor shadow-lg shadow-orangeColor/10" : "",
                !validateField("email", email) && email ? "border-red-500" : "",
                "placeholder:text-muted-foreground/50"
              )}
              labelName={t("email")}
              icon={<Icon icon="solar:letter-bold" className="w-5 h-5 text-orangeColor" />}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              required
              aria-required="true"
              aria-invalid={email ? !validateField("email", email) : undefined}
              type="email"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate="visible"
          className="relative"
          role="group"
          aria-labelledby="message-label"
        >
          <label 
            id="message-label"
            className="flex items-center gap-2 text-base text-orangeColor font-cairo mb-2"
          >
            <Icon icon="solar:chat-square-dots-bold" className="w-5 h-5" />
            {t("msg")}
          </label>
          <Textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("msgplaceHolder")}
            className={cn(
              "min-h-[120px] text-base resize-none",
              "transition-all duration-200",
              "bg-background/50 hover:bg-background/70",
              "border-orangeColor/20",
              focused === "message" ? "ring-2 ring-orangeColor shadow-lg shadow-orangeColor/10" : "",
              !validateField("message", message) && message ? "border-red-500" : "",
              "text-foreground",
              "placeholder:text-muted-foreground/50"
            )}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            required
            aria-required="true"
            aria-invalid={message ? !validateField("message", message) : undefined}
          />
          <div className="relative h-1 mt-2">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orangeColor/20 to-orangeColor/40"
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orangeColor to-orangeColor/80"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: message.length / 500 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            className={cn(
              "w-full text-base py-6",
              "bg-gradient-to-r from-orangeColor/90 to-orangeColor",
              "hover:from-orangeColor hover:to-orangeColor/90",
              "transition-all duration-300",
              "shadow-lg hover:shadow-xl hover:shadow-orangeColor/20",
              "rounded-xl",
              "focus:ring-2 focus:ring-orangeColor focus:ring-offset-2",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}
            disabled={isPending}
            aria-label={isPending ? "Sending message..." : "Send message"}
          >
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SendingToserver />
                </motion.div>
              ) : (
                <motion.div
                  key="send"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Icon icon="solar:paper-plane-bold" className="w-5 h-5" />
                  {t("sendBtn")}
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.form>

      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            role="alert"
            aria-live="polite"
          >
            <NotifyMsg
              title={t("Done")}
              msg={t("doneMsg")}
              open={isPending}
              onOpenChange={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

const InputContact = ({
  name,
  value,
  onChange,
  placeholder,
  className,
  labelName,
  icon,
  onFocus,
  onBlur,
  required,
  type = "text",
  ...props
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className: string;
  labelName: string;
  icon?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  type?: string;
  [key: string]: any;
}) => {
  const id = `input-${name}`;
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="flex items-center gap-2 text-base text-orangeColor font-cairo"
      >
        {icon}
        {labelName}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        {...props}
      />
    </div>
  );
};