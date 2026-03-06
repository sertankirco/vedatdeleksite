import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { Lock, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Login() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { refresh } = useAuth({ redirectOnUnauthenticated: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async () => {
      toast.success(t("nav.login") + " Başarılı!");
      await refresh();
      setLocation("/admin");
    },
    onError: error => {
      toast.error(error.message || "Giriş başarısız oldu");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t("nav.login")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Hesabınıza giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı Adı</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                id="username"
                type="text"
                placeholder="Kullanıcı Adı"
                className="pl-10"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full btn-astro-primary py-6 text-lg"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Giriş Yapılıyor..." : t("nav.login")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
