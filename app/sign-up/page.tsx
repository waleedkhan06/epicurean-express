"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-obsidian-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-sm text-obsidian-400 hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Home
        </Link>
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          redirectUrl="/"
        />
      </motion.div>
    </div>
  );
}
