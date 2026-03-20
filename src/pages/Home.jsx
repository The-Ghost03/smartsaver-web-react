import { useEffect, useState } from "react";

const LINK_ANDROID = "lien_vers_votre_apk_ou_play_store_ici";
const LINK_IOS = "lien_vers_votre_app_store_ici";

export default function Home() {
  const [osData, setOsData] = useState({
    text: "Obtenir l'App Gratuitement",
    link: "#download",
    isIos: false,
  });

  useEffect(() => {
    // 1. Détection de l'OS
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setOsData({
        text: "Télécharger pour Android",
        link: LINK_ANDROID,
        isIos: false,
      });
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setOsData({
        text: "Télécharger sur l'App Store",
        link: LINK_IOS,
        isIos: true,
      });
    }

    // 2. Animations au Scroll
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
      <section className="hero">
        <div className="hero-content reveal fade-bottom">
          <h1>
            Gérez votre argent, <span>simplement.</span>
          </h1>
          <p>
            Rejoignez des tontines sécurisées ou lancez votre plan d'épargne.
            Téléchargez l'application SmartSaver et prenez le contrôle.
          </p>
          <div className="hero-buttons">
            <a href={osData.link} className="btn-primary btn-download-app">
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
              <span className="btn-text">{osData.text}</span>
            </a>
            <a href="#tontine" className="btn-secondary">
              Découvrir comment ça marche
            </a>
          </div>
        </div>
        <div className="hero-image reveal fade-left">
          <div className="phone-mockup floating">
            <img
              src="/src/assets/image_411d1e.jpg"
              alt="Aperçu de l'application"
            />
          </div>
        </div>
      </section>

      {/* Reste de tes sections Tontine, Épargne, Témoignages EXACTEMENT comme avant */}
      {/* N'oublie pas de changer style="width: 100%" en style={{ width: "100%" }} dans la div progress-bar */}

      <section id="tontine" class="feature-section section-light">
        <div class="feature-text reveal fade-right">
          <div class="badge">Tontine</div>
          <h2>La force du collectif pour vos projets.</h2>
          <p>
            La tontine réinventée et sécurisée. Le principe est simple : par
            exemple, dans un groupe de 10 personnes sur 50 jours, cotisez 1000
            FCFA par jour.
          </p>
          <ul class="feature-list">
            <li>
              <strong>Gains réguliers :</strong> Chaque 5 jours, un participant
              prend la tontine de 50 000 FCFA.
            </li>
            <li>
              <strong>Équité totale :</strong> Les 10 participants prennent 50
              000 FCFA à tour de rôle.
            </li>
            <li>
              <strong>Transparence :</strong> Vous êtes notifié à chaque
              ramassage.
            </li>
          </ul>
        </div>
        <div class="feature-visual reveal fade-left">
          <div class="visual-card">
            <h3>Exemple Tontine 1000F</h3>
            <div class="progress-bar">
              <div class="progress" style={{ width: "100%" }}></div>
            </div>
            <div class="stats">
              <span>10 Participants</span>
              <span>50 000 FCFA / Ramassage</span>
            </div>
          </div>
        </div>
      </section>

      <section id="epargne" class="feature-section section-dark">
        <div class="feature-visual reveal fade-right">
          <div class="visual-card dark-card">
            <h3>Mon Épargne</h3>
            <h2>30 000 FCFA</h2>
            <p>Objectif atteint à 100%</p>
          </div>
        </div>
        <div class="feature-text reveal fade-left">
          <div class="badge badge-yellow">Épargne</div>
          <h2>Épargnez à votre rythme, sans pression.</h2>
          <p>
            Planifiez votre avenir financier avec notre portefeuille d'épargne.
            Optez pour un modèle fixe prédéfini ou choisissez la flexibilité
            totale avec notre mode d'épargne libre.
          </p>
          <ul class="feature-list">
            <li>
              <strong>Épargne Fixe ou Libre :</strong> Épargnez un montant fixe
              (ex: 1000F/jour) ou déposez le montant de votre choix, quand vous
              le souhaitez.
            </li>
            <li>
              <strong>Gestion par Sprints :</strong> Votre épargne est organisée
              par cycles (sprints). À la fin de chaque sprint, vous pouvez
              retirer vos fonds.
            </li>
            <li>
              <strong>Frais de retrait transparents :</strong> Des frais de
              déblocage clairs s'appliquent lors de vos retraits à la fin de
              chaque période d'épargne.
            </li>
          </ul>
        </div>
      </section>

      <section id="temoignages" class="testimonials-section section-light">
        <div class="container reveal fade-bottom">
          <h2 class="text-center">Ils nous font confiance</h2>
          <p class="text-center subtitle-text">
            Découvrez l'expérience de nos premiers utilisateurs avec SmartSaver.
          </p>

          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="stars">★★★★★</div>
              <p>
                "Fini les disputes pour savoir qui a payé la tontine !
                L'application m'envoie une notification à chaque ramassage, tout
                est transparent et sécurisé."
              </p>
              <div class="author">
                <div class="avatar avatar-1">A</div>
                <div class="author-info">
                  <h4>Awa D.</h4>
                  <span>Commerçante</span>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="stars">★★★★★</div>
              <p>
                "L'épargne libre est géniale ! Je dépose ce que je peux quand je
                veux, et je récupère mon argent à la fin de mon sprint pour mes
                projets."
              </p>
              <div class="author">
                <div class="avatar avatar-2">K</div>
                <div class="author-info">
                  <h4>Kouamé Y.</h4>
                  <span>Étudiant</span>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="stars">★★★★★</div>
              <p>
                "Le système d'admin pour valider les versements est très
                rassurant. On a l'impression d'avoir une vraie micro-finance
                dans son téléphone."
              </p>
              <div class="author">
                <div class="avatar avatar-3">M</div>
                <div class="author-info">
                  <h4>Marc E.</h4>
                  <span>Entrepreneur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="download-section reveal fade-bottom">
        <div className="download-box">
          <h2>Prêt à changer vos habitudes financières ?</h2>
          <p>
            Rejoignez la communauté SmartSaver. L'application est disponible
            pour votre smartphone.
          </p>
          <a
            href={osData.link}
            className="btn-primary btn-large btn-download-app"
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
            <span className="btn-text">Télécharger l'App SmartSaver</span>
          </a>
          {!osData.isIos && (
            <p className="apk-notice">
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
