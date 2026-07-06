import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type RouterContextValue = {
  path: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

function normalizePath(path: string) {
  if (!path || path === "") return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const next = normalizePath(to);
    if (options?.replace) {
      window.history.replaceState({}, "", next);
    } else {
      window.history.pushState({}, "", next);
    }
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within Router");
  return ctx;
}

export function useParams(pattern: string): Record<string, string> {
  const { path } = useRouter();
  const patternParts = normalizePath(pattern).split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    if (part.startsWith(":")) {
      params[part.slice(1)] = pathParts[i] ?? "";
    } else if (part !== pathParts[i]) {
      return {};
    }
  }
  return params;
}

export function matchPath(pattern: string, path: string): boolean {
  const patternParts = normalizePath(pattern).split("/").filter(Boolean);
  const pathParts = normalizePath(path).split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return false;
  return patternParts.every((part, i) => part.startsWith(":") || part === pathParts[i]);
}

export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  productDetail: (slug: string) => `/products/${slug}`,
  export: "/export",
  adminLogin: "/admin/login",
  adminDashboard: "/admin/dashboard",
} as const;
