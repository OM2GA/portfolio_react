import eiffelLogo from "../assets/Logo_universite_gustave_eiffel.png";
import socgenLogo from "../assets/logo-societe-generale.png";
import bnpLogo from "../assets/bnp-paribas-logo.webp";
import type { TimelineStep, SkillGroup, ContactInfo } from "../types";

export const timelineData: TimelineStep[] = [
  {
    title: "Bac Général NSI",
    company: "Lycée Jules Ferry",
    date: "2024",
    description: "Spécialité Mathématiques et Numérique et Sciences Informatiques.",
    color: "#3b82f6", // Bleu
    planetColor: "radial-gradient(circle at 30% 30%, #3b82f6, #1d4ed8)"
  },
  {
    title: "BUT MMI (2ème année)",
    company: "Université Gustave Eiffel",
    date: "2024 - Maintenant",
    description: "Métiers du Multimédia et de l'Internet. Spécialisation en développement web et design interactif.",
    color: "#d0bcff",
    planetColor: "radial-gradient(circle at 30% 30%, #ffffff, #ffffff)",
    logo: eiffelLogo
  },
  {
    title: "Stage Assistant UX Designer",
    company: "Société Générale",
    date: "04/07 AU 01/08 2025",
    description: (
      <div className="space-y-2">
        <p>Rattaché à l'équipe UX/UI du centre de solutions Trésorerie & Risques Structurels, j'ai contribué à la conception d'un film explicatif pour présenter une fonctionnalité d'une application interne. Mes missions incluaient :</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>L'analyse des besoins utilisateurs et l'appropriation du fonctionnement de l'application.</li>
          <li>L'adaptation du script et des maquettes Figma pour le film.</li>
          <li>Le montage vidéo et la finalisation du produit, en collaboration avec des équipes pluridisciplinaires (UX/UI, informatique, métiers financiers).</li>
          <li>Le respect des bonnes pratiques de production et de confidentialité en milieu professionnel.</li>
        </ul>
        <p className="pt-2 italic text-sm opacity-80">Environnement : Figma, outils de montage vidéo, méthodologies UX/UI, travail en équipe pluridisciplinaire.</p>
      </div>
    ),
    color: "#ff0000", // Rouge SocGen
    planetColor: "radial-gradient(circle at 30% 30%, #ff0000, #4a0000)",
    logo: socgenLogo
  },
  {
    title: "Stage Développement Web",
    company: "BNP Paribas",
    date: "07/04 AU 01/06 2026",
    description: "Chargé du développement d'assets front-end en environnement de test pour les squads BNPP et Hello Bank, j'ai recréé la structure et le design de la page d'accueil BNP Paribas. Cette intégration sous VS Code a mobilisé HTML, CSS et les frameworks Angular, Tailwind et Bootstrap, confirmant ma polyvalence technique sur les outils de référence du marché.",
    color: "#00a082", // Vert BNP
    planetColor: "radial-gradient(circle at 30% 30%, #00a082, #004a3d)",
    logo: bnpLogo
  }
];

export const skillGroups: SkillGroup[] = [
  {
    id: "tech",
    name: "Technique",
    color: "#61dafb",
    radius: 260,
    duration: 60,
    skills: ["React", "Angular", "Tailwind CSS", "Bootstrap", "JavaScript", "PHP", "HTML/CSS"]
  },
  {
    id: "soft",
    name: "Points Forts",
    color: "#e91e63",
    radius: 360,
    duration: 60,
    skills: ["Agilité", "Trello", "Créatif", "Polyvalent", "Curieux", "Dynamique", "Esprit d'équipe"]
  },
  {
    id: "lang",
    name: "Langues",
    color: "#4b8bbe",
    radius: 420,
    duration: 60,
    skills: ["Français (Maternel)", "Anglais (B1)", "Espagnol (A2)"]
  }
];

export const getContactInfo = (): ContactInfo[] => [
  { 
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ), 
    label: "Email", 
    value: "maxence.coste.mc@gmail.com", 
    type: 'copy' 
  },
  { 
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ), 
    label: "Tel", 
    value: "06 59 61 08 95", 
    type: 'copy' 
  },
  { 
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ), 
    label: "LinkedIn", 
    value: "LinkedIn", 
    href: "https://www.linkedin.com/in/maxence-c-62aaa0264", 
    type: 'link' 
  },
];
