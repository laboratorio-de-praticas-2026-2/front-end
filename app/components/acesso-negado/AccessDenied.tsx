"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./AccessDenied.module.css";

export type AccessDeniedReason =
  | "unauthenticated"
  | "unauthorized"
  | "session_expired";

export interface AccessDeniedProps {
  reason?: AccessDeniedReason;
  loginPath?: string;
  resourceName?: string;
}

const CONTENT: Record<
  AccessDeniedReason,
  { title: string; description: string }
> = {
  unauthenticated: {
    title: "Você precisa entrar na sua conta",
    description:
      "Essa área é restrita a usuários autenticados. Faça login para continuar.",
  },
  unauthorized: {
    title: "Você não tem permissão para acessar essa área",
    description:
      "Sua conta está autenticada, mas não tem o nível de acesso necessário para essa página. Se você acredita que isso é um erro, entre em contato com o administrador da sua conta.",
  },
  session_expired: {
    title: "Sua sessão expirou",
    description:
      "Por segurança, sua sessão foi encerrada por inatividade. Faça login novamente para continuar de onde parou.",
  },
};

export function AccessDenied({
  reason = "unauthenticated",
  loginPath = "/login",
  resourceName,
}: AccessDeniedProps) {
  const router = useRouter();
  const { title, description } = CONTENT[reason];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleLogin = () => {
    router.push(loginPath);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap} aria-hidden="true">
          <LockIcon />
        </div>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>
          {description}
          {resourceName ? (
            <>
              {" "}
              <span className={styles.resource}>({resourceName})</span>
            </>
          ) : null}
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleLogin}
          >
            Fazer login
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleGoBack}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}