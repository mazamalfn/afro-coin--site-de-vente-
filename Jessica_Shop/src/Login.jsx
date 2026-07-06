import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./Supabaseclient";

const cream = "#F4EEE4";
const ink = "#1C1916";
const leather = "#9C6B3E";
const line = "#DCD2C1";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Email ou mot de passe incorrect.");
            setLoading(false);
            return;
        }

        navigate("/admin");
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen px-4"
            style={{ background: cream, fontFamily: "Inter, sans-serif" }}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-8 rounded-xl"
                style={{ background: "#fff", border: `1px solid ${line}` }}
            >
                <h1
                    className="text-2xl mb-6"
                    style={{ fontFamily: "Cormorant Garamond", fontWeight: 600, color: ink }}
                >
                    Connexion admin
                </h1>

                <label className="block text-sm mb-1" style={{ color: ink }}>
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 mb-4 rounded-md outline-none text-sm"
                    style={{ border: `1px solid ${line}` }}
                />

                <label className="block text-sm mb-1" style={{ color: ink }}>
                    Mot de passe
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 mb-4 rounded-md outline-none text-sm"
                    style={{ border: `1px solid ${line}` }}
                />

                {error && (
                    <p className="text-sm mb-4" style={{ color: "#B5443A" }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-full text-sm"
                    style={{ background: ink, color: "#fff" }}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </div>
    );
}