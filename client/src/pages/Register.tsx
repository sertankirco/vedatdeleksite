import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Register() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { refresh } = useAuth({ redirectOnUnauthenticated: false });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: async () => {
      toast.success("Kayıt Başarılı!");
      await refresh();
      setLocation("/");
    },
    onError: error => {
      toast.error(error.message || "Kayıt başarısız oldu");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 blur-2xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-purple-100 dark:bg-purple-900 blur-2xl opacity-50"></div>

        <div className="relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <UserPlus className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Yeni Hesap Oluştur
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Astroloji dünyasına katılın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="name"
                  placeholder="Vedat Delek"
                  className="pl-10"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  className="pl-10"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  placeholder="En az 6 karakter"
                  className="pl-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg transition-transform hover:scale-[1.02]"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Kayıt Olunuyor..." : "Kayıt Ol ✨"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Zaten hesabınız var mı?{" "}
            <Link
              href="/login"
              className="text-purple-600 hover:underline font-semibold text-lg ml-1"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
