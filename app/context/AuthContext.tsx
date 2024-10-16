import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Contextの型
type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Contextの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProviderの実装
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // ページ初回ロード時に認証状態を確認
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8000/api/user/", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // ログイン関数
  const login = async (username: string, password: string) => {
    await axios.post(
      "http://localhost:8000/login/",
      { username, password },
      { withCredentials: true }
    );
    setIsAuthenticated(true);
    router.push("/dashboard"); // ログイン後にダッシュボードへ遷移
  };

  // ログアウト関数
  const logout = async () => {
    await axios.post(
      "http://localhost:8000/logout/",
      {},
      { withCredentials: true }
    );
    setIsAuthenticated(false);
    router.push("/login"); // ログアウト後にログイン画面へ遷移
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Contextを利用するためのフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
