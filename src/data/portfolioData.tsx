import eiffelLogo from "../assets/logos/Logo_universite_gustave_eiffel.png";
import socgenLogo from "../assets/logos/logo-societe-generale.png";
import bnpLogo from "../assets/logos/bnp-paribas-logo.webp";
import type { TimelineStep, SkillGroup, ContactInfo, Project } from "../types";
import { MailIcon, PhoneIcon, LinkedInIcon } from "../components/common/ContactIcons";
import { COLORS } from "../constants/theme";

// Images Projets
import img20bornes from "../assets/projects/accueil_20bornes.png";
import imgMockup20bornes from "../assets/projects/mockup_pc_mobile.png";
import imgDecathlon from "../assets/projects/decathlon_accueil.png";
import imgDecathlonQuiz from "../assets/projects/decathlon_questionnaire.png";
import imgOishi from "../assets/projects/maquette_oishi.png";
import imgOishiConnexion from "../assets/projects/connexion_oishi.png";
import imgWebdoc from "../assets/projects/webdoc_accueil.png";

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

export const projectsData: Project[] = [
  {
    id: "20-bornes",
    title: "Refonte \"Les 20 Bornes d'Andrésy\"",
    description: "Refonte complète adoptée par la mairie d'Andrésy. Modernisation UX et intégration responsive.",
    image: img20bornes,
    tags: ["HTML/CSS", "Bootstrap", "JS Vanilla"],
    link: "http://20bornes.chez.com/",
    type: "Projet Personnel · Adopté par la Mairie",
    details: {
      problem: "Ce projet est né d'un constat simple : le site actuel de l'événement des \"20 Bornes\" accusait le poids des années. Il n'était pas responsive (illisible sur mobile), souffrait de problèmes de chargement CSS et renvoyait une image vieillissante qui ne correspondait plus au dynamisme de la course.",
      solution: "J'ai intégré des formes organiques (\"blobs\") en arrière-plan pour apporter un côté fun et vivant. L'idée est de refléter l'énergie d'une course à pied populaire, plutôt que de présenter un simple tableau d'inscription. J'ai réorganisé l'information pour qu'elle soit accessible en moins de 3 clics.",
      tech: "J'ai choisi Bootstrap 5.3 pour sa fiabilité et pour accélérer le développement de la grille responsive. Cependant, je ne voulais pas d'un site \"standard\". J'ai donc développé une couche CSS personnalisée conséquente. Focus : La Navbar - j'ai travaillé les effets de survol (hover) et l'espacement pour lui donner un aspect \"mignon\" et accueillant.",
      stats: [
        { label: "SEO", value: "100" },
        { label: "Performance", value: "99" },
        { label: "Accessibilité", value: "91" }
      ],
      images: [
        { url: imgMockup20bornes, caption: "Mockup comparatif Mobile vs Desktop" }
      ]
    }
  },
  {
    id: "decathlon",
    title: "Decathlon Profiler - Nuit de l'Info",
    description: "Conception d'un outil de profilage sportif pour la prévention des blessures lors d'un hackathon.",
    image: imgDecathlon,
    tags: ["HTML/CSS", "Bootstrap", "JS Vanilla"],
    github: "https://github.com/OM2GA/decathlon_nuit_de_l_info.git",
    type: "Hackathon / Nuit de l'Info",
    details: {
      problem: "Le sujet de cette édition nous invitait à connecter l'informatique au sport pour prévenir les blessures. L'objectif était de créer une interface permettant aux utilisateurs d'analyser leur pratique et d'obtenir des conseils posturaux adaptés en moins de 2h.",
      solution: "J'ai intégré les codes graphiques de la marque (le bleu iconique, la typographie Roboto Condensed). Le questionnaire a été conçu comme une \"Single Page Application\" simulée : les questions défilent sans rechargement de page pour garder l'utilisateur engagé.",
      tech: "Architecture 100% statique. Plutôt que d'envoyer les réponses à un serveur, j'ai développé un algorithme en JS Vanilla qui stocke les points (A, B, C, D) en mémoire et calcule le profil dominant à la fin du quiz.",
      stats: [
        { label: "Durée Dev", value: "2h" },
        { label: "Niveaux Validés", value: "4" },
        { label: "Autonomie Tech", value: "100%" }
      ],
      images: [
        { url: imgDecathlonQuiz, caption: "Interface du questionnaire interactif" }
      ]
    }
  },
  {
    id: "oishi",
    title: "Oishi - Sushi Shop",
    description: "Développement d'une plateforme e-commerce complète pour un restaurant.",
    image: imgOishi,
    tags: ["Angular", "PHP", "MySQL"],
    type: "Projet SAE / Universitaire",
    details: {
      problem: "Oishi est une application web destinée à la commande en ligne de sushis. L'objectif était de simuler un environnement professionnel réel où le client peut naviguer dans un catalogue, gérer son panier et passer commande.",
      solution: "Les modules d'inscription et de connexion sont totalement fonctionnels. Nous avons sécurisé les formulaires et géré la persistance de la session côté client.",
      tech: "Architecture API RESTful créée sur mesure en PHP. Utilisation d'Angular (Composants, Services, Routing). Coordination des tâches via Trello et versioning avec Git.",
      stats: [
        { label: "Projet Tuteuré", value: "SAE" },
        { label: "Framework", value: "Angular" },
        { label: "API Custom", value: "100%" }
      ],
      images: [
        { url: imgOishiConnexion, caption: "Page de connexion Oishi" }
      ]
    }
  },
  {
    id: "webdoc",
    title: "Les Coulisses de la Gym",
    description: "Web-documentaire immersif plongeant dans le quotidien d'un club de gymnastique.",
    image: imgWebdoc,
    tags: ["HTML/CSS", "JS Vanilla", "Multimédia"],
    link: "https://webdoc-gymnastique.alwaysdata.net/",
    type: "SAE / Web-documentaire",
    details: {
      problem: "L'objectif était de créer un web-documentaire immersif présentant le club de Courtry. Il fallait harmoniser des contenus hétérogènes : vidéos, galeries photos, podcasts et articles de fond.",
      solution: "Développement intégral de l'interface et des interactions sans framework externe. Carrousel \"Cover Flow\" custom pour la galerie photo. Lecteur Audio Thématique avec animation de vinyle tournant.",
      tech: "Vanilla JavaScript pour tous les composants custom : Carrousel, Lecteur Audio, Système de Modales. Optimisation des performances pour garantir un chargement rapide malgré le poids des ressources visuelles.",
      stats: [
        { label: "Pages Web", value: "5" },
        { label: "Vanilla JS", value: "100%" },
        { label: "Galerie Photo", value: "12" }
      ]
    }
  }
];
