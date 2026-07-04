import { useState } from "react";
import {
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Instagram({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Facebook({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');`;

const cream = "#F4EEE4";
const ink = "#1C1916";
const leather = "#9C6B3E";
const leatherDark = "#6E4A28";
const perfume = "#C9A16A";
const line = "#DCD2C1";

function Stitch({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-2 rounded-[10px] ${className}`}
      style={{ border: `1.5px dashed ${leatherDark}55` }}
    />
  );
}

function PlaceholderPhoto({ icon: Icon = ShoppingBag, label, tone = "leather" }) {
  const bg =
    tone === "leather"
      ? `linear-gradient(140deg, #C9A57A 0%, #9C6B3E 100%)`
      : `linear-gradient(140deg, #E7D6B8 0%, #C9A16A 100%)`;
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center rounded-xl overflow-hidden"
      style={{ background: bg }}
    >
      <Icon size={28} color="#fff" strokeWidth={1.3} opacity={0.9} />
      {label && (
        <span className="mt-2 text-[10px] tracking-wide" style={{ color: "#fff", opacity: 0.85, fontFamily: "Inter" }}>
          {label}
        </span>
      )}
    </div>
  );
}

const categories = [
  { nom: "Sacs à main", icon: ShoppingBag, tone: "leather" },
  { nom: "Sacs bandoulière", icon: ShoppingBag, tone: "leather" },
  { nom: "Pochettes", icon: ShoppingBag, tone: "leather" },
  { nom: "Parfums Femme", icon: Sparkles, tone: "perfume" },
  { nom: "Parfums Homme", icon: Sparkles, tone: "perfume" },
  { nom: "Coffrets", icon: Sparkles, tone: "perfume" },
];

const styles = [
  { nom: "Sacs à main", desc: "Portés main ou à l'épaule", tone: "leather" },
  { nom: "Sacs de voyage", desc: "Grand format, weekend & vol", tone: "leather" },
  { nom: "Parfums Femme", desc: "Florales, gourmandes, boisées", tone: "perfume" },
  { nom: "Parfums Homme", desc: "Boisées, ambrées, fraîches", tone: "perfume" },
];

const produits = [
  { nom: "Sac Ambre — cuir grainé", prix: 42000, note: 4.8, avis: 24, tone: "leather" },
  { nom: "Sac Terracotta bandoulière", prix: 38000, note: 4.6, avis: 17, tone: "leather" },
  { nom: "Pochette Soir Noir", prix: 22000, note: 4.9, avis: 31, tone: "leather" },
  { nom: "Parfum Nuit Bleue — 50ml", prix: 25000, note: 4.7, avis: 42, tone: "perfume" },
  { nom: "Parfum Santal Doré — 100ml", prix: 32000, note: 4.9, avis: 28, tone: "perfume" },
  { nom: "Coffret Duo Découverte", prix: 45000, note: 5.0, avis: 12, tone: "perfume" },
];

const WHATSAPP_NUMBER = "22800000000"; // à remplacer par ton vrai numéro

function ProductCard({ p }) {
  const [fav, setFav] = useState(false);
  const Icon = p.tone === "leather" ? ShoppingBag : Sparkles;
  return (
    <div className="group">
      <div className="relative aspect-square rounded-xl overflow-hidden" style={{ background: cream }}>
        <PlaceholderPhoto icon={Icon} tone={p.tone} />
        {p.tone === "leather" && <Stitch />}
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
        <div className="text-[15px]" style={{ color: ink, fontFamily: "Inter", fontWeight: 500 }}>
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
          <span style={{ color: ink, fontFamily: "Inter", fontWeight: 600 }}>
            {p.prix.toLocaleString("fr-FR")} F
          </span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je suis intéressé(e) par : " + p.nom)}`}
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

export default function Accueil({ onNavigate }) {
  return (
    <div style={{ background: cream, color: ink, fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6" style={{ borderBottom: `1px solid ${line}` }}>
        <div 
          onClick={() => onNavigate('accueil')}
          className="cursor-pointer hover:opacity-85 transition-opacity"
          style={{ fontFamily: "Cormorant Garamond", fontWeight: 700, fontSize: 22, letterSpacing: "0.04em" }}
        >
          MAISON — <span style={{ color: leather }}>ta marque</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm items-center" style={{ color: "#6b665c" }}>
          <button onClick={() => onNavigate('catalogue', { category: 'Sacs' })} className="hover:text-black cursor-pointer transition-colors">Sacs</button>
          <button onClick={() => onNavigate('catalogue', { category: 'Parfums' })} className="hover:text-black cursor-pointer transition-colors">Parfums</button>
          <button onClick={() => onNavigate('catalogue', { tri: 'nouveau' })} className="hover:text-black cursor-pointer transition-colors">Nouveautés</button>
          <button onClick={() => onNavigate('catalogue', { tri: 'prix-asc' })} className="hover:text-black cursor-pointer transition-colors">Promo</button>
        </nav>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: ink }}
        >
          <MessageCircle size={17} color="#fff" />
        </a>
      </header>

      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 px-6 md:px-12 pt-10 md:pt-16 pb-10 items-center">
        <div>
          <div className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: leather }}>
            Nouvelle collection
          </div>
          <h1
            style={{ fontFamily: "Cormorant Garamond", fontWeight: 600, lineHeight: 1.05 }}
            className="text-5xl md:text-6xl"
          >
            Un sac. Un parfum.
            <br />
            Une allure.
          </h1>
          <p className="mt-5 max-w-md text-sm" style={{ color: "#6b665c", lineHeight: 1.7 }}>
            Des pièces en cuir sélectionnées et des parfums choisis pour durer, pensés pour ton quotidien à Lomé et au-delà.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <button 
              onClick={() => onNavigate('catalogue', { category: 'Sacs' })}
              className="px-6 py-3 rounded-full text-sm flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity" 
              style={{ background: ink, color: "#fff" }}
            >
              Voir les sacs <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => onNavigate('catalogue', { category: 'Parfums' })}
              className="px-6 py-3 rounded-full text-sm cursor-pointer hover:bg-black/5 transition-colors" 
              style={{ border: `1px solid ${ink}` }}
            >
              Voir les parfums
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
            {[
              { Icon: Truck, label: "Livraison rapide" },
              { Icon: RotateCcw, label: "Retours faciles" },
              { Icon: ShieldCheck, label: "Paiement sécurisé" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-1.5">
                <Icon size={16} color={leather} />
                <span className="text-xs" style={{ color: "#6b665c" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-72 md:h-[420px]">
          <div className="absolute top-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden">
            <PlaceholderPhoto icon={ShoppingBag} tone="leather" label="Photo sac" />
            <Stitch />
          </div>
          <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden">
            <PlaceholderPhoto icon={Sparkles} tone="perfume" label="Photo parfum" />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="px-6 md:px-12 py-8 flex gap-6 overflow-x-auto" style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
        {categories.map((c) => (
          <div key={c.nom} className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 76 }}>
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <PlaceholderPhoto icon={c.icon} tone={c.tone} />
            </div>
            <span className="text-xs text-center" style={{ color: "#6b665c" }}>
              {c.nom}
            </span>
          </div>
        ))}
      </section>

      {/* Style grid */}
      <section className="px-6 md:px-12 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 style={{ fontFamily: "Cormorant Garamond", fontWeight: 600, fontSize: 30 }}>Trouve ton style</h2>
          <button 
            onClick={() => onNavigate('catalogue', { category: 'Tous' })}
            className="text-sm flex items-center gap-1 cursor-pointer hover:underline" 
            style={{ color: leather }}
          >
            Tout voir <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styles.map((s) => (
            <div 
              key={s.nom} 
              onClick={() => {
                const cat = s.nom === "Sacs de voyage" ? "Sacs" : s.nom;
                onNavigate('catalogue', { category: cat });
              }}
              className="relative rounded-xl overflow-hidden h-56 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
            >
              <PlaceholderPhoto icon={s.tone === "leather" ? ShoppingBag : Sparkles} tone={s.tone} />
              {s.tone === "leather" && <Stitch />}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.55))" }}
              >
                <div style={{ color: "#fff", fontFamily: "Cormorant Garamond", fontSize: 18, fontWeight: 600 }}>{s.nom}</div>
                <div className="text-xs" style={{ color: "#f0e9dc" }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo banners */}
      <section className="px-6 md:px-12 pb-14 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl p-8 flex items-center justify-between" style={{ background: "#EDE3D2" }}>
          <div>
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: leather }}>
              Offre limitée
            </div>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 26, fontWeight: 600 }}>-20% sur les sacs</div>
            <button 
              onClick={() => onNavigate('catalogue', { category: 'Sacs' })}
              className="inline-block mt-4 px-5 py-2.5 rounded-full text-sm cursor-pointer hover:opacity-90 transition-opacity" 
              style={{ background: ink, color: "#fff" }}
            >
              En profiter
            </button>
          </div>
          <ShoppingBag size={54} color={leather} strokeWidth={1} />
        </div>
        <div className="rounded-xl p-8 flex items-center justify-between" style={{ background: "#F0E6D2" }}>
          <div>
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: perfume }}>
              Nouveauté
            </div>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 26, fontWeight: 600 }}>Parfums fraîchement arrivés</div>
            <button 
              onClick={() => onNavigate('catalogue', { category: 'Parfums' })}
              className="inline-block mt-4 px-5 py-2.5 rounded-full text-sm cursor-pointer hover:opacity-90 transition-opacity" 
              style={{ background: ink, color: "#fff" }}
            >
              Découvrir
            </button>
          </div>
          <Sparkles size={54} color={perfume} strokeWidth={1} />
        </div>
      </section>

      {/* Best sellers */}
      <section className="px-6 md:px-12 pb-16">
        <div className="flex items-end justify-between mb-6">
          <h2 style={{ fontFamily: "Cormorant Garamond", fontWeight: 600, fontSize: 30 }}>Nos coups de cœur</h2>
          <button 
            onClick={() => onNavigate('catalogue', { category: 'Tous' })}
            className="text-sm flex items-center gap-1 cursor-pointer hover:underline" 
            style={{ color: leather }}
          >
            Tout voir <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {produits.map((p) => (
            <ProductCard key={p.nom} p={p} />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ borderTop: `1px solid ${line}` }}>
        {[
          { Icon: Truck, t: "Livraison rapide", d: "Sur toutes les commandes" },
          { Icon: RotateCcw, t: "Retours faciles", d: "Sous 7 jours" },
          { Icon: ShieldCheck, t: "Paiement sécurisé", d: "À la livraison ou Mobile Money" },
          { Icon: MessageCircle, t: "Support WhatsApp", d: "Réponse rapide" },
        ].map(({ Icon, t, d }) => (
          <div key={t} className="flex items-start gap-3">
            <Icon size={20} color={leather} />
            <div>
              <div className="text-sm" style={{ fontWeight: 500 }}>
                {t}
              </div>
              <div className="text-xs" style={{ color: "#8a8478" }}>
                {d}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* WhatsApp CTA band */}
      <section className="px-6 md:px-12 py-14" style={{ background: "#EDE3D2" }}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: leather }}>
              Rejoins la liste
            </div>
            <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: 28, fontWeight: 600 }}>
              Reçois nos nouveautés en avant-première sur WhatsApp
            </h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je veux rejoindre la liste des nouveautés")}`}
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full text-sm"
              style={{ background: ink, color: "#fff" }}
            >
              <MessageCircle size={15} /> Rejoindre sur WhatsApp
            </a>
          </div>
          <div className="h-40 rounded-xl overflow-hidden">
            <PlaceholderPhoto icon={ShoppingBag} tone="leather" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12" style={{ background: ink, color: "#cfc8bb" }}>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div style={{ fontFamily: "Cormorant Garamond", fontSize: 20, color: "#fff", fontWeight: 700 }}>
              MAISON — ta marque
            </div>
            <p className="text-xs mt-3 max-w-[220px]" style={{ lineHeight: 1.7 }}>
              Sacs en cuir et parfums, sélectionnés pour durer. Basé à Lomé.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a8478" }}>
              Boutique
            </div>
            <ul className="text-sm flex flex-col gap-2">
              <li onClick={() => onNavigate('catalogue', { category: 'Tous' })} className="cursor-pointer hover:text-white transition-colors">Tous les produits</li>
              <li onClick={() => onNavigate('catalogue', { category: 'Sacs' })} className="cursor-pointer hover:text-white transition-colors">Sacs</li>
              <li onClick={() => onNavigate('catalogue', { category: 'Parfums' })} className="cursor-pointer hover:text-white transition-colors">Parfums</li>
              <li onClick={() => onNavigate('catalogue', { tri: 'nouveau' })} className="cursor-pointer hover:text-white transition-colors">Nouveautés</li>
              <li onClick={() => onNavigate('catalogue', { tri: 'prix-asc' })} className="cursor-pointer hover:text-white transition-colors">Promo</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a8478" }}>
              Aide
            </div>
            <ul className="text-sm flex flex-col gap-2">
              <li>Contact WhatsApp</li>
              <li>Livraison &amp; retours</li>
              <li>Questions fréquentes</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: "#8a8478" }}>
              Suis-nous
            </div>
            <div className="flex gap-3">
              <Instagram size={16} />
              <Facebook size={16} />
              <MessageCircle size={16} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
