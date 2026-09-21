"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ===== Mock 用户类型 =====
export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "collector";
  avatar?: string;
}

// ===== Mock 用户数据库 =====
const mockUsers: (MockUser & { password: string })[] = [
  {
    id: "u1",
    name: "管理员",
    email: "admin@mindray.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "u2",
    name: "信息收集员",
    email: "collector@mindray.com",
    password: "collector123",
    role: "collector",
  },
];

const STORAGE_KEY = "mindray_auth_user";

// ===== Auth Context =====
interface AuthContextValue {
  user: MockUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化：从 localStorage 恢复登录状态
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 500));

    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      return { success: false, error: "邮箱或密码不正确" };
    }

    const { password: _, ...userWithoutPwd } = found;
    setUser(userWithoutPwd);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPwd));
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 500));

    // 检查邮箱是否已注册
    if (mockUsers.some((u) => u.email === email)) {
      return { success: false, error: "该邮箱已被注册" };
    }

    // Mock 注册：直接创建新用户（不会持久到 mockUsers，仅模拟流程）
    const newUser: MockUser = {
      id: `u${Date.now()}`,
      name,
      email,
      role: "collector",
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth 必须在 AuthProvider 内使用");
  }
  return ctx;
}
