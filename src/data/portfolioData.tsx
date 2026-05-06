import eiffelLogo from "../assets/logos/Logo_universite_gustave_eiffel.png";
import socgenLogo from "../assets/logos/logo-societe-generale.png";
import bnpLogo from "../assets/logos/bnp-paribas-logo.webp";
import type { TimelineStep, SkillGroup, ContactInfo } from "../types";
import { MailIcon, PhoneIcon, LinkedInIcon } from "../components/common/ContactIcons";
import { COLORS } from "../constants/theme";

export const timelineData: TimelineStep[] = [
  {
    title: "Bac Général NSI",
    company: "Lycée Jules Ferry",
    date: "2024",
    description: "Spécialité Mathématiques et Numérique et Sciences Informatiques.",
    color: COLORS.companies.julesFerry,
    planetColor: `radial-gradient(circle at 30% 30%, ${COLORS.companies.julesFerry}, #1d4ed8)`
  },
  {
    title: "BUT MMI (2ème année)",
    company: "Université Gustave Eiffel",
    date: "2024 - Maintenant",
    description: "Métiers du Multimédia et de l'Internet. Spécialisation en développement web et design interactif.",
    color: COLORS.companies.eiffel,
    planetColor: `radial-gradient(circle at 30% 30%, ${COLORS.white}, ${COLORS.white})`,
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
    color: COLORS.companies.socgen,
    planetColor: `radial-gradient(circle at 30% 30%, ${COLORS.companies.socgen}, #4a0000)`,
    logo: socgenLogo
  },
  {
    title: "Stage Développement Web",
    company: "BNP Paribas",
    date: "07/04 AU 01/06 2026",
    description: "Chargé du développement d'assets front-end en environnement de test pour les squads BNPP et Hello Bank, j'ai recréé la structure et le design de la page d'accueil BNP Paribas. Cette intégration sous VS Code a mobilisé HTML, CSS et les frameworks Angular, Tailwind et Bootstrap, confirmant ma polyvalence technique sur les outils de référence du marché.",
    color: COLORS.companies.bnp,
    planetColor: `radial-gradient(circle at 30% 30%, ${COLORS.companies.bnp}, #004a3d)`,
    logo: bnpLogo
  }
];

export const skillGroups: SkillGroup[] = [
  {
    id: "tech",
    name: "Technique",
    color: "#00d8ff", // Cyan électrique
    radius: 240,
    duration: 80,
    skills: ["React", "Angular", "Tailwind CSS", "Bootstrap", "JavaScript", "PHP", "HTML/CSS"],
    planetColor: "radial-gradient(circle at 30% 30%, #4ae5ff, #00d8ff, #003a45)"
  },
  {
    id: "soft",
    name: "Points Forts",
    color: "#ff2d55", // Rose vibrant
    radius: 340,
    duration: 80,
    skills: ["Agilité", "Trello", "Créatif", "Polyvalent", "Curieux", "Dynamique", "Esprit d'équipe"],
    planetColor: "radial-gradient(circle at 30% 30%, #ff6b8b, #ff2d55, #4a0010)"
  },
  {
    id: "lang",
    name: "Langues",
    color: "#7c4dff", // Violet électrique
    radius: 440,
    duration: 80,
    skills: ["Français (Maternel)", "Anglais (B1)", "Espagnol (A2)"],
    planetColor: "radial-gradient(circle at 30% 30%, #b392ff, #7c4dff, #1e004a)"
  }
];

export const getContactInfo = (): ContactInfo[] => [
  { 
    icon: <MailIcon />, 
    label: "Email", 
    value: "maxence.coste.mc@gmail.com", 
    type: 'copy' 
  },
  { 
    icon: <PhoneIcon />, 
    label: "Tel", 
    value: "06 59 61 08 95", 
    type: 'copy' 
  },
  { 
    icon: <LinkedInIcon />, 
    label: "LinkedIn", 
    value: "LinkedIn", 
    href: "https://www.linkedin.com/in/maxence-c-62aaa0264", 
    type: 'link' 
  },
];
