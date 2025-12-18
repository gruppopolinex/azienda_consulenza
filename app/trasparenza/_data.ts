// app/trasparenza/_data.ts

/* ===================== TYPES ===================== */

export type TrasparenzaKpi = {
  id: string;
  label: string;
  value: string;
  helper?: string;
  /**
   * Icone supportate dalla pagina:
   * trendingUp, wallet, landmark, badgeCheck,
   * leaf, zap, hardHat, clipboardList
   */
  icon?: string;
};

export type CompanyField = {
  key: string;
  label: string;
  value: string;
};

export type DownloadableDoc = {
  id: string;
  label: string;
  href: string;
  note?: string;
};

export type CertificationAreaId =
  | "ambiente"
  | "energia"
  | "sicurezza"
  | "audit";

export type CertificationCardData = {
  id: "iso9001" | "iso14001" | "iso50001" | "iso45001";
  /**
   * Serve per allineare KPI (sopra) → card (sotto)
   * KPI.id === areaId
   */
  areaId: CertificationAreaId;
  title: string;
  standardLabel: string;
  description: string;
  bullets: string[];
  logoSrc: string;
  logoAlt: string;
  pdfHref: string;
};

export type TrasparenzaData = {
  hero: {
    logoSrc: string;
    logoAlt: string;
    title: string;
    subtitle: string;
  };

  ui: {
    documentYearPrefix: string;
    downloadCertificateLabel: string;
  };

  cta: {
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
  };

  documents: {
    years: string[];
    byYear: Record<string, DownloadableDoc[]>;
    static: DownloadableDoc[];
  };

  sections: {
    company: {
      title: string;
      description: string;
      kpis: TrasparenzaKpi[];
      cards: {
        companyData: {
          badge: string;
          fields: CompanyField[];
        };
        documents: {
          badge: string;
          description: string;
          yearPickerLabel: string;
          yearPickerHelper: string;
          byYearTitle: string;
          staticTitle: string;
          footerNote?: string;
        };
      };
    };

    certifications: {
      title: string;
      description: string;
      kpis: TrasparenzaKpi[];
      cards: CertificationCardData[];
    };
  };
};

/* ===================== DATA ===================== */

export const trasparenzaData: TrasparenzaData = {
  hero: {
    logoSrc: "/logo.png",
    logoAlt: "Polinex",
    title: "Trasparenza",
    subtitle:
      "In questa sezione trovi i principali dati societari, la documentazione economico-amministrativa scaricabile e le informazioni sui sistemi di gestione e certificazioni adottati da Polinex srl.",
  },

  ui: {
    documentYearPrefix: "Esercizio:",
    downloadCertificateLabel: "Scarica certificazione",
  },

  cta: {
    title: "Hai bisogno di documenti aggiuntivi?",
    description:
      "Per versioni aggiornate di bilanci, visure, attestati di certificazione o altre informazioni di trasparenza, puoi inviarci una richiesta dalla pagina contatti.",
    href: "/contatti",
    buttonLabel: "Contatta il team",
  },

  /* ---------- DOCUMENTI ---------- */

  documents: {
    years: ["2024", "2023", "2022"],

    byYear: {
      "2024": [
        {
          id: "bilancio",
          label: "Bilancio d’esercizio (conto economico e stato patrimoniale)",
          href: "/trasparenza/docs/bilanci/bilancio-2024.pdf",
        },
        {
          id: "nota-integrativa",
          label: "Nota integrativa al bilancio",
          href: "/trasparenza/docs/note-integrative/nota-integrativa-2024.pdf",
        },
        {
          id: "rendiconto-finanziario",
          label: "Rendiconto finanziario",
          href: "/trasparenza/docs/rendiconti-finanziari/rendiconto-finanziario-2024.pdf",
          note: "Documento parte integrante del fascicolo di bilancio.",
        },
      ],
      "2023": [
        {
          id: "bilancio",
          label: "Bilancio d’esercizio (conto economico e stato patrimoniale)",
          href: "/trasparenza/docs/bilanci/bilancio-2023.pdf",
        },
        {
          id: "nota-integrativa",
          label: "Nota integrativa al bilancio",
          href: "/trasparenza/docs/note-integrative/nota-integrativa-2023.pdf",
        },
        {
          id: "rendiconto-finanziario",
          label: "Rendiconto finanziario",
          href: "/trasparenza/docs/rendiconti-finanziari/rendiconto-finanziario-2023.pdf",
          note: "Documento parte integrante del fascicolo di bilancio.",
        },
      ],
      "2022": [
        {
          id: "bilancio",
          label: "Bilancio d’esercizio (conto economico e stato patrimoniale)",
          href: "/trasparenza/docs/bilanci/bilancio-2022.pdf",
        },
        {
          id: "nota-integrativa",
          label: "Nota integrativa al bilancio",
          href: "/trasparenza/docs/note-integrative/nota-integrativa-2022.pdf",
        },
        {
          id: "rendiconto-finanziario",
          label: "Rendiconto finanziario",
          href: "/trasparenza/docs/rendiconti-finanziari/rendiconto-finanziario-2022.pdf",
          note: "Documento parte integrante del fascicolo di bilancio.",
        },
      ],
    },

    static: [
      {
        id: "visura-camerale",
        label: "Visura camerale aggiornata",
        href: "/trasparenza/docs/visura-camerale.pdf",
        note: "Aggiornata periodicamente.",
      },
      {
        id: "atto-statuto",
        label: "Atto costitutivo e Statuto",
        href: "/trasparenza/docs/atto-costitutivo-statuto.pdf",
      },
      {
        id: "organigramma",
        label: "Organigramma e funzioni aziendali",
        href: "/trasparenza/docs/organigramma.pdf",
        note: "Documento interno condiviso in ottica di trasparenza.",
      },
    ],
  },

  /* ---------- SEZIONI ---------- */

  sections: {
    /* ===== AZIENDA ===== */
    company: {
      title: "Dati societari & documentazione economica",
      description:
        "Rendiamo disponibili i principali dati di identificazione societaria e la documentazione economico-finanziaria rilevante, in ottica di chiarezza verso clienti, fornitori, partner e pubbliche amministrazioni.",

      kpis: [
        {
          id: "fatturato",
          label: "Ricavi",
          value: "€ —",
          helper: "Valore per esercizio selezionato",
          icon: "trendingUp",
        },
        {
          id: "ebitda",
          label: "EBITDA",
          value: "€ —",
          helper: "Indicatore gestionale",
          icon: "wallet",
        },
        {
          id: "pf-n",
          label: "PFN",
          value: "€ —",
          helper: "Posizione finanziaria netta",
          icon: "landmark",
        },
        {
          id: "rating",
          label: "Affidabilità",
          value: "—",
          helper: "Rating/score (se disponibile)",
          icon: "badgeCheck",
        },
      ],

      cards: {
        companyData: {
          badge: "Dati societari",
          fields: [
            { key: "ragioneSociale", label: "Ragione sociale", value: "Polinex srl" },
            {
              key: "formaGiuridica",
              label: "Forma giuridica",
              value: "Società a responsabilità limitata",
            },
            {
              key: "sedeLegale",
              label: "Sede legale",
              value: "Via Esempio 123, 35100 Padova (PD), Italia",
            },
            {
              key: "sedeOperativa",
              label: "Sede operativa",
              value: "Via Esempio 123, 35100 Padova (PD), Italia",
            },
            { key: "pivaCf", label: "P.IVA / C.F.", value: "01234567890" },
            {
              key: "cciaa",
              label: "Iscrizione CCIAA",
              value: "CCIAA Padova – REA PD-000000",
            },
            {
              key: "capitaleSociale",
              label: "Capitale sociale",
              value: "€ 10.000,00 i.v.",
            },
            { key: "pec", label: "PEC", value: "polinex@pec.it" },
          ],
        },

        documents: {
          badge: "Documentazione scaricabile",
          description:
            "Di seguito una selezione dei principali documenti economico-amministrativi. Le versioni aggiornate possono essere richieste tramite la sezione contatti.",
          yearPickerLabel: "Seleziona l’anno",
          yearPickerHelper: "Influisce solo sui documenti di bilancio.",
          byYearTitle: "Documenti per esercizio",
          staticTitle: "Documenti generali",
          footerNote:
            "I file indicati sono esempi: sostituisci i percorsi con i PDF effettivamente disponibili.",
        },
      },
    },

    /* ===== CERTIFICAZIONI ===== */
    certifications: {
      title: "Certificazioni & sistemi di gestione",
      description:
        "I sistemi di gestione adottati garantiscono controllo dei processi, conformità normativa e miglioramento continuo, anche in contesti di consulenza e servizi.",

      kpis: [
        { id: "ambiente", label: "Ambiente", value: "—", helper: "Aspetti e impatti", icon: "leaf" },
        { id: "energia", label: "Energia", value: "—", helper: "Prestazioni energetiche", icon: "zap" },
        { id: "sicurezza", label: "Sicurezza", value: "—", helper: "Salute e cantieri", icon: "hardHat" },
        { id: "audit", label: "Audit & qualità", value: "—", helper: "Controlli e riesami", icon: "clipboardList" },
      ],

      cards: [
        {
          id: "iso14001",
          areaId: "ambiente",
          title: "Sistema di Gestione Ambientale",
          standardLabel: "ISO 14001",
          description:
            "Gestione strutturata degli aspetti ambientali e conformità alle normative applicabili.",
          bullets: [
            "Analisi aspetti e impatti ambientali",
            "Conformità legislativa",
            "Miglioramento continuo",
          ],
          logoSrc: "/trasparenza/certificazioni/iso-14001.png",
          logoAlt: "Logo ISO 14001",
          pdfHref: "/trasparenza/docs/certificazioni/iso-14001.pdf",
        },
        {
          id: "iso50001",
          areaId: "energia",
          title: "Sistema di Gestione dell’Energia",
          standardLabel: "ISO 50001",
          description:
            "Monitoraggio e ottimizzazione delle prestazioni energetiche.",
          bullets: [
            "Indicatori di prestazione energetica",
            "Riduzione dei consumi",
            "Audit e riesami energetici",
          ],
          logoSrc: "/trasparenza/certificazioni/iso-50001.png",
          logoAlt: "Logo ISO 50001",
          pdfHref: "/trasparenza/docs/certificazioni/iso-50001.pdf",
        },
        {
          id: "iso45001",
          areaId: "sicurezza",
          title: "Salute e Sicurezza sul Lavoro",
          standardLabel: "ISO 45001",
          description:
            "Gestione dei rischi per la salute e sicurezza delle persone.",
          bullets: [
            "Valutazione e controllo dei rischi",
            "Formazione e consapevolezza",
            "Gestione incidenti",
          ],
          logoSrc: "/trasparenza/certificazioni/iso-45001.png",
          logoAlt: "Logo ISO 45001",
          pdfHref: "/trasparenza/docs/certificazioni/iso-45001.pdf",
        },
        {
          id: "iso9001",
          areaId: "audit",
          title: "Sistema di Gestione Qualità",
          standardLabel: "ISO 9001",
          description:
            "Qualità dei processi e miglioramento continuo dei servizi.",
          bullets: [
            "Controllo dei processi",
            "Audit interni",
            "Gestione non conformità",
          ],
          logoSrc: "/trasparenza/certificazioni/iso-9001.png",
          logoAlt: "Logo ISO 9001",
          pdfHref: "/trasparenza/docs/certificazioni/iso-9001.pdf",
        },
      ],
    },
  },
};
