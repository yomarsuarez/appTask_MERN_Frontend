// components/AuthGuard.tsx
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/confirm-account",
  "/auth/request-code",
  "/auth/forgot-password",
  "/auth/new-password",
];

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: user, isError, isLoading } = useAuth();
  const location = useLocation();

  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ Si es ruta pública, permitir acceso sin autenticación
  if (isPublicRoute) {
    // Si está autenticado y trata de acceder a login, redirigir a dashboard
    if (user && location.pathname === "/auth/login") {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  // ✅ Si es ruta privada y no está autenticado, redirigir a login
  if (isError || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
