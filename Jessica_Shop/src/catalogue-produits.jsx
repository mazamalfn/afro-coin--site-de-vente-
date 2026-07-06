import { useSearchParams } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import {
  Heart,
  Star,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  SlidersHorizontal,
  Search,
  X,
} from "lucide-react";
import { supabase } from "./Supabaseclient"; // ⚠️ adapte le chemin si différent

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`;

const cream = "#F4EEE4";
const ink = "#1C1916";
const leather = "#9C6B3E";
const leatherDark = "#6E4A28";
const perfume = "#C9A16A";
const line = "#DCD2C1";

const WHATSAPP_NUMBER = "22800000000"; // à remplacer par ton vrai numéro

function Stitch() {
  return (
    <div
      className="pointer-events-none absolute inset-2 rounded-[10px]"
      style={{ border: `1.5px dashed ${leatherDark}55` }}
    />
  );
}

function PlaceholderPhoto({ icon: Icon = ShoppingBag, tone = "leather" }) {
  const bg =
    tone === "leather"
      ? `linear-gradient(140deg, #C9A57A 0%, #9C6B3E 100%)`
      : `linear-gradient(140deg, #E7D6B8 0%, #C9A16A 100%)`;
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden" style={{ background: bg }}>
      <Icon size={26} color="#fff" strokeWidth={1.3} opacity={0.9} />
    </div>
  );
}

const CATEGORIES = ["Tous", "Sacs", "Parfums", "Sacs à main", "Sacs bandoulière", "Pochettes", "Parfums Femme", "Parfums Homme", "Coffrets"];

// type Supabase -> tone visuel utilisé par les composants
function typeToTone(type) {
  return type === "sac" ? "leather" : "perfume";
}

function ProductCard({ p }) {
  const [fav, setFav] = useState(false);
  const tone = typeToTone(p.type);
  const Icon = tone === "leather" ? ShoppingBag : Sparkles;

  return (
    <div>
      <div className="relative aspect-square rounded-xl overflow-hidden" style={{ background: cream }}>
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.nom}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderPhoto icon={Icon} tone={tone} />
        )}
        {tone === "leather" && <Stitch />}
        {p.nouveau && (
          <span
            className="absolute top-2.5 left-2.5 text-[10px] px-2 py-1 rounded-full uppercase tracking-wide"
            style={{ background: ink, color: "#fff" }}
          >
            Nouveau
          </span>
        )}
        <button
          onClick={() => setFav((f) => !f)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "#fff" }}
          aria-label="Ajouter aux favoris"
        >
          <Heart size={15} color={fav ? "#B5443A" : ink} fill={fav ? "#B5443A" : "none"} />
        </button>
      </div>
      <div className="mt-3">
        <div className="text-xs" style={{ color: leather }}>
          {p.categorie}
        </div>
        <div className="text-[15px] mt-0.5" style={{ color: ink, fontFamily: "Inter", fontWeight: 500 }}>
          {p.nom}
        </div>
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} color={leather} fill={i < Math.round(p.note) ? leather : "none"} />
          ))}
          <span className="text-xs ml-1" style={{ color: "#8a8478" }}>
            ({p.avis})
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span style={{ color: ink, fontFamily: "Inter", fontWeight: 600 }}>{p.prix.toLocaleString("fr-FR")} F</span>

          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je suis intéressé(e) par : " + p.nom)}`}
            className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1"
            style={{ background: ink, color: "#fff" }}
          >
            <MessageCircle size={12} /> Commander
          </a>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl" style={{ background: "#e8e0d0" }} />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-1/3 rounded" style={{ background: "#e8e0d0" }} />
        <div className="h-4 w-2/3 rounded" style={{ background: "#e8e0d0" }} />
        <div className="h-3 w-1/2 rounded" style={{ background: "#e8e0d0" }} />
      </div>
    </div>
  );
} export default function Catalogue({ onNavigate }) {
  const [searchParams] = useSearchParams();
  const [categorie, setCategorie] = useState(searchParams.get("categorie") || "Tous");
  const [tri, setTri] = useState(searchParams.get("tri") || "populaire");
  const [recherche, setRecherche] = useState("");
  const [filtresOuverts, setFiltresOuverts] = useState(false);

  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProduits() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("produits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur Supabase :", error);
        setError("Impossible de charger les produits. Réessaie plus tard.");
      } else {
        setProduits(data);
      }
      setLoading(false);
    }

    fetchProduits();
  }, []);

  const produitsAffiches = useMemo(() => {
    let liste = produits.filter((p) => {
      if (categorie === "Tous") return true;
      if (categorie === "Sacs") return p.type === "sac";
      if (categorie === "Parfums") return p.type === "parfum";
      return p.categorie === categorie;
    });
    if (recherche.trim()) {
      const q = recherche.toLowerCase();
      liste = liste.filter((p) => p.nom.toLowerCase().includes(q));
    }
    if (tri === "prix-asc") liste = [...liste].sort((a, b) => a.prix - b.prix);
    if (tri === "prix-desc") liste = [...liste].sort((a, b) => b.prix - a.prix);
    if (tri === "note") liste = [...liste].sort((a, b) => b.note - a.note);
    if (tri === "nouveau") liste = [...liste].sort((a, b) => (b.nouveau === true) - (a.nouveau === true));
    return liste;
  }, [produits, categorie, tri, recherche]);

  return (
    <div style={{ background: cream, color: ink, fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <style>{FONT_IMPORT}</style>

      <header className="flex items-center justify-between px-6 md:px-12 py-6" style={{ borderBottom: `1px solid ${line}` }}>
        <div
          onClick={() => onNavigate('accueil')}
          className="cursor-pointer hover:opacity-85 transition-opacity"
          style={{ fontFamily: "Cormorant Garamond", fontWeight: 700, fontSize: 22, letterSpacing: "0.04em" }}
        >
          MAISON — <span style={{ color: leather }}>ta marque</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm items-center" style={{ color: "#6b665c" }}>
          <button onClick={() => setCategorie('Sacs')} className={`cursor-pointer transition-colors ${categorie === 'Sacs' ? 'text-black font-semibold' : 'hover:text-black'}`}>Sacs</button>
          <button onClick={() => setCategorie('Parfums')} className={`cursor-pointer transition-colors ${categorie === 'Parfums' ? 'text-black font-semibold' : 'hover:text-black'}`}>Parfums</button>
          <button onClick={() => setTri('nouveau')} className={`cursor-pointer transition-colors ${tri === 'nouveau' ? 'text-black font-semibold' : 'hover:text-black'}`}>Nouveautés</button>
          <button onClick={() => setTri('prix-asc')} className={`cursor-pointer transition-colors ${tri === 'prix-asc' ? 'text-black font-semibold' : 'hover:text-black'}`}>Promo</button>
        </nav>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: ink }}>
          <MessageCircle size={17} color="#fff" />
        </a>
      </header>

      <div className="px-6 md:px-12 pt-10 pb-6">
        <div className="text-xs uppercase tracking-wider mb-2" style={{ color: leather }}>
          {loading ? "Chargement…" : `${produitsAffiches.length} produit${produitsAffiches.length > 1 ? "s" : ""}`}
        </div>
        <h1 style={{ fontFamily: "Cormorant Garamond", fontWeight: 600, fontSize: 38 }}>Le catalogue</h1>
      </div>

      <div className="px-6 md:px-12 flex flex-wrap gap-3 items-center pb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-1 min-w-[200px]" style={{ background: "#fff", border: `1px solid ${line}` }}>
          <Search size={15} color="#8a8478" />
          <input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un sac, un parfum…"
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: ink }}
          />
          {recherche && (
            <button onClick={() => setRecherche("")}>
              <X size={14} color="#8a8478" />
            </button>
          )}
        </div>

        <select
          value={tri}
          onChange={(e) => setTri(e.target.value)}
          className="px-4 py-2.5 rounded-full text-sm outline-none"
          style={{ background: "#fff", border: `1px solid ${line}`, color: ink }}
        >
          <option value="populaire">Les plus populaires</option>
          <option value="nouveau">Nouveautés d'abord</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="note">Mieux notés</option>
        </select>

        <button
          onClick={() => setFiltresOuverts((v) => !v)}
          className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
          style={{ background: ink, color: "#fff" }}
        >
          <SlidersHorizontal size={14} /> Filtrer
        </button>
      </div>

      <div className={`px-6 md:px-12 pb-8 flex-wrap gap-2 ${filtresOuverts ? "flex" : "hidden md:flex"}`}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategorie(c)}
            className="px-4 py-2 rounded-full text-sm flex-shrink-0"
            style={{
              background: categorie === c ? ink : "#fff",
              color: categorie === c ? "#fff" : "#6b665c",
              border: `1px solid ${categorie === c ? ink : line}`,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="px-6 md:px-12 pb-20">
        {error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 22, fontWeight: 600 }}>Oups…</div>
            <p className="text-sm mt-1" style={{ color: "#8a8478" }}>{error}</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : produitsAffiches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Sparkles size={28} color={leather} className="mb-3" />
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 22, fontWeight: 600 }}>Aucun produit trouvé</div>
            <p className="text-sm mt-1" style={{ color: "#8a8478" }}>
              Essaie une autre catégorie ou un autre mot-clé.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {produitsAffiches.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>

      <footer className="px-6 md:px-12 py-8 text-center text-xs" style={{ borderTop: `1px solid ${line}`, color: "#8a8478" }}>
        MAISON — ta marque · Basé à Lomé · Commandes par WhatsApp
      </footer>
    </div>
  );
}