const SESSION_KEY = "liaqat_admin_session";

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "authenticated";
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(SESSION_KEY, "authenticated");
}

export function clearAdminAuthenticated(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
