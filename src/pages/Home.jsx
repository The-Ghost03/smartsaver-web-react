import { useEffect, useState } from "react";

const LINK_ANDROID = "lien_vers_votre_apk_ou_play_store_ici";
const LINK_IOS = "lien_vers_votre_app_store_ici";

const btnPrimary =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-semibold text-[var(--primary)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--accent-hover)] hover:shadow-[0_10px_20px_rgba(247,183,49,0.3)]";

const btnSecondaryHero =
  "inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20";

const btnLarge = "text-xl px-9 py-[18px]";

function getInitialOsData() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return {
      text: "Télécharger pour Android",
      link: LINK_ANDROID,
      isIos: false,
    };
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return {
      text: "Télécharger sur l'App Store",
      link: LINK_IOS,
      isIos: true,
    };
  }
  return {
    text: "Obtenir l'App Gratuitement",
    link: "#download",
    isIos: false,
  };
}

export default function Home() {
  const [osData] = useState(getInitialOsData);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    reveals.forEach((reveal) => observer.observe(reveal));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-between gap-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] px-[5%] pb-24 pt-40 text-white lg:flex-row lg:items-center">
        <div className="reveal fade-bottom max-w-[650px] flex-1">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-none">
            Gérez votre argent, <span className="text-[var(--accent)]">simplement.</span>
          </h1>
          <p className="my-6 text-xl font-normal opacity-90 lg:text-[1.25rem]">
            Rejoignez des tontines sécurisées ou lancez votre plan d'épargne.
            Téléchargez l'application SmartSaver et prenez le contrôle.
          </p>
          <div className="flex flex-wrap gap-4 max-lg:justify-center">
            <a href={osData.link} className={btnPrimary}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>{osData.text}</span>
            </a>
            <a href="#tontine" className={btnSecondaryHero}>
              Découvrir comment ça marche
            </a>
          </div>
        </div>
        <div className="reveal fade-left flex flex-1 justify-center lg:justify-end">
          <div className="animate-ss-float h-[650px] w-80 overflow-hidden rounded-[45px] border-[12px] border-[#111] bg-[var(--bg-light)] shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <img
              src="/src/assets/image_411d1e.jpg"
              alt="Aperçu de l'application"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section
        id="tontine"
        className="flex flex-col items-center gap-12 bg-[var(--bg-white)] px-[5%] py-32 text-center lg:flex-row lg:justify-between lg:gap-16 lg:text-left"
      >
        <div className="reveal fade-right max-w-[550px] flex-1">
          <div className="mb-6 inline-block rounded-full bg-[rgba(26,42,92,0.1)] px-4 py-1.5 text-sm font-bold uppercase text-[var(--primary)]">
            Tontine
          </div>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
            La force du collectif pour vos projets.
          </h2>
          <p className="text-lg text-[color:var(--text-muted)]">
            La tontine réinventée et sécurisée. Le principe est simple : par
            exemple, dans un groupe de 10 personnes sur 50 jours, cotisez 1000
            FCFA par jour.
          </p>
          <ul className="mt-8 space-y-6 text-left text-[1.1rem] text-[color:var(--text-muted)]">
            <li className="relative pl-9">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">
                ✓
              </span>
              <strong>Gains réguliers :</strong> Chaque 5 jours, un participant
              prend la tontine de 50 000 FCFA.
            </li>
            <li className="relative pl-9">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">
                ✓
              </span>
              <strong>Équité totale :</strong> Les 10 participants prennent 50
              000 FCFA à tour de rôle.
            </li>
            <li className="relative pl-9">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">
                ✓
              </span>
              <strong>Transparence :</strong> Vous êtes notifié à chaque
              ramassage.
            </li>
          </ul>
        </div>
        <div className="reveal fade-left flex flex-1 justify-center">
          <div className="w-full max-w-[450px] rounded-3xl bg-white p-12 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <h3 className="mb-6 text-2xl text-[var(--primary)]">
              Exemple Tontine 1000F
            </h3>
            <div className="mb-4 h-3 overflow-hidden rounded-full bg-[#eee]">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex justify-between text-sm font-semibold text-[color:var(--text-muted)]">
              <span>10 Participants</span>
              <span>50 000 FCFA / Ramassage</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="epargne"
        className="flex flex-col-reverse items-center gap-12 bg-[var(--bg-light)] px-[5%] py-32 text-center lg:flex-row lg:justify-between lg:gap-16 lg:text-left"
      >
        <div className="reveal fade-right flex flex-1 justify-center">
          <div className="w-full max-w-[450px] rounded-3xl bg-[var(--primary)] p-12 text-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <h3 className="mb-4 text-2xl text-[var(--accent)]">Mon Épargne</h3>
            <h2 className="my-4 text-5xl font-bold lg:text-[3.5rem]">
              30 000 FCFA
            </h2>
            <p className="text-lg opacity-80">Objectif atteint à 100%</p>
          </div>
        </div>
        <div className="reveal fade-left max-w-[550px] flex-1">
          <div className="mb-6 inline-block rounded-full bg-[rgba(247,183,49,0.2)] px-4 py-1.5 text-sm font-bold uppercase text-[#d49513]">
            Épargne
          </div>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
            Épargnez à votre rythme, sans pression.
          </h2>
          <p className="text-lg text-[color:var(--text-muted)]">
            Planifiez votre avenir financier avec notre portefeuille d'épargne.
            Optez pour un modèle fixe prédéfini ou choisissez la flexibilité
            totale avec notre mode d'épargne libre.
          </p>
          <ul className="mt-8 space-y-6 text-left text-[1.1rem] text-[color:var(--text-muted)]">
            <li className="relative pl-9">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">
                ✓
              </span>
              <strong>Épargne Fixe ou Libre :</strong> Épargnez un montant fixe
              (ex: 1000F/jour) ou déposez le montant de votre choix, quand vous
              le souhaitez.
            </li>
            <li className="relative pl-9">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">
                ✓
              </span>
              <strong>Gestion par Sprints :</strong> Votre épargne est organisée
              par cycles (sprints). À la fin de chaque sprint, vous pouvez
              retirer vos fonds.
            </li>
            <li className="relative pl-9">
              <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--primary)]">
                ✓
              </span>
              <strong>Frais de retrait transparents :</strong> Des frais de
              déblocage clairs s'appliquent lors de vos retraits à la fin de
              chaque période d'épargne.
            </li>
          </ul>
        </div>
      </section>

      <section
        id="temoignages"
        className="bg-[var(--bg-white)] px-[5%] pb-32 pt-24"
      >
        <div className="reveal fade-bottom mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
            Ils nous font confiance
          </h2>
          <p className="mx-auto mb-16 mt-4 max-w-[600px] text-center text-lg text-[color:var(--text-muted)]">
            Découvrez l'expérience de nos premiers utilisateurs avec SmartSaver.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[20px] bg-[var(--bg-light)] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-2.5">
              <div className="mb-4 text-[1.3rem] tracking-widest text-[var(--accent)]">
                ★★★★★
              </div>
              <p className="mb-8 text-base italic leading-relaxed text-[color:var(--text-muted)]">
                "Fini les disputes pour savoir qui a payé la tontine !
                L'application m'envoie une notification à chaque ramassage, tout
                est transparent et sécurisé."
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f7b731] text-xl font-bold text-white">
                  A
                </div>
                <div>
                  <h4 className="mb-0.5 text-lg text-[color:var(--text-main)]">
                    Awa D.
                  </h4>
                  <span className="text-sm font-semibold text-[color:var(--text-muted)]">
                    Commerçante
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] bg-[var(--bg-light)] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-2.5">
              <div className="mb-4 text-[1.3rem] tracking-widest text-[var(--accent)]">
                ★★★★★
              </div>
              <p className="mb-8 text-base italic leading-relaxed text-[color:var(--text-muted)]">
                "L'épargne libre est géniale ! Je dépose ce que je peux quand je
                veux, et je récupère mon argent à la fin de mon sprint pour mes
                projets."
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#1a2a5c] text-xl font-bold text-white">
                  K
                </div>
                <div>
                  <h4 className="mb-0.5 text-lg text-[color:var(--text-main)]">
                    Kouamé Y.
                  </h4>
                  <span className="text-sm font-semibold text-[color:var(--text-muted)]">
                    Étudiant
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] bg-[var(--bg-light)] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-2.5">
              <div className="mb-4 text-[1.3rem] tracking-widest text-[var(--accent)]">
                ★★★★★
              </div>
              <p className="mb-8 text-base italic leading-relaxed text-[color:var(--text-muted)]">
                "Le système d'admin pour valider les versements est très
                rassurant. On a l'impression d'avoir une vraie micro-finance
                dans son téléphone."
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#20bf6b] text-xl font-bold text-white">
                  M
                </div>
                <div>
                  <h4 className="mb-0.5 text-lg text-[color:var(--text-main)]">
                    Marc E.
                  </h4>
                  <span className="text-sm font-semibold text-[color:var(--text-muted)]">
                    Entrepreneur
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="download"
        className="reveal fade-bottom bg-white px-[5%] pb-32 pt-16 text-center"
      >
        <div className="mx-auto max-w-[900px] rounded-[30px] bg-gradient-to-br from-[var(--primary)] to-[#111b3d] px-8 py-20 text-white shadow-[0_30px_60px_rgba(26,42,92,0.2)] sm:px-12">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-[2.8rem]">
            Prêt à changer vos habitudes financières ?
          </h2>
          <p className="mb-12 text-lg opacity-90 sm:text-xl">
            Rejoignez la communauté SmartSaver. L'application est disponible
            pour votre smartphone.
          </p>
          <a
            href={osData.link}
            className={`${btnPrimary} ${btnLarge} mx-auto`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Télécharger l'App SmartSaver</span>
          </a>
          {!osData.isIos && (
            <p className="mb-0 mt-6 text-[0.95rem] opacity-60">
              Si vous téléchargez un fichier APK, autorisez l'installation
              depuis des sources inconnues dans les paramètres de votre
              téléphone.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
