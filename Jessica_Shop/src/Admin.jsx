import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./Supabaseclient";

const cream = "#F4EEE4";
const ink = "#1C1916";
const leather = "#9C6B3E";
const line = "#DCD2C1";

export default function Admin() {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [categorie, setCategorie] = useState("");
    const [type, setType] = useState("sac");
    const [prix, setPrix] = useState("");
    const [description, setDescription] = useState("");
    const [nouveau, setNouveau] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let image_url = null;

            // 1. Upload de l'image si présente
            if (imageFile) {
                const fileExt = imageFile.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("produits-images")
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from("produits-images")
                    .getPublicUrl(fileName);

                image_url = publicUrlData.publicUrl;
            }

            // 2. Insertion du produit dans la table
            const { error: insertError } = await supabase.from("produits").insert({
                nom,
                categorie,
                type,
                prix: parseInt(prix, 10),
                description,
                nouveau,
                image_url,
            });

            if (insertError) throw insertError;

            setMessage({ type: "success", text: "Produit ajouté avec succès !" });
            setNom("");
            setCategorie("");
            setPrix("");
            setDescription("");
            setNouveau(false);
            setImageFile(null);
            e.target.reset();
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Erreur lors de l'ajout du produit." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: cream, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
            <header
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: `1px solid ${line}` }}
            >
                <h1 style={{ fontFamily: "Cormorant Garamond", fontWeight: 600, fontSize: 24, color: ink }}>
                    Panel admin
                </h1>
                <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 rounded-full"
                    style={{ background: ink, color: "#fff" }}
                >
                    Déconnexion
                </button>
            </header>

            <div className="max-w-lg mx-auto px-6 py-10">
                <h2 className="text-lg mb-4" style={{ color: ink }}>
                    Ajouter un produit
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1" style={{ color: ink }}>Nom du produit</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-md outline-none text-sm"
                            style={{ border: `1px solid ${line}` }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1" style={{ color: ink }}>Catégorie</label>
                        <input
                            type="text"
                            value={categorie}
                            onChange={(e) => setCategorie(e.target.value)}
                            placeholder="Ex: Sacs à main, Parfums Femme..."
                            required
                            className="w-full px-3 py-2 rounded-md outline-none text-sm"
                            style={{ border: `1px solid ${line}` }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1" style={{ color: ink }}>Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-3 py-2 rounded-md outline-none text-sm"
                            style={{ border: `1px solid ${line}` }}
                        >
                            <option value="sac">Sac</option>
                            <option value="parfum">Parfum</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1" style={{ color: ink }}>Prix (FCFA)</label>
                        <input
                            type="number"
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-md outline-none text-sm"
                            style={{ border: `1px solid ${line}` }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1" style={{ color: ink }}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-md outline-none text-sm"
                            style={{ border: `1px solid ${line}` }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1" style={{ color: ink }}>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="nouveau"
                            checked={nouveau}
                            onChange={(e) => setNouveau(e.target.checked)}
                        />
                        <label htmlFor="nouveau" className="text-sm" style={{ color: ink }}>
                            Marquer comme "Nouveau"
                        </label>
                    </div>

                    {message && (
                        <p
                            className="text-sm"
                            style={{ color: message.type === "success" ? "#3a7d44" : "#B5443A" }}
                        >
                            {message.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-full text-sm"
                        style={{ background: leather, color: "#fff" }}
                    >
                        {loading ? "Ajout en cours..." : "Ajouter le produit"}
                    </button>
                </form>
            </div>
        </div>
    );
}