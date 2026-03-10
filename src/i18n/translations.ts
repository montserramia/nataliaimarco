export const translations = {
  ca: {
    home: {
      title: "Benvinguts al casament de la Natalia i en Marco",
      subtitle: "Gràcies per acompanyar-nos aquest dia tan especial",
      couple_name: "Natàlia i Marco",
      cta_gallery: "Veure fotos",
      cta_upload: "Pujar fotos",
    },
    event: {
      location: "CASTELLDEFELS",
      date: "DISSABTE 9 DE MAIG DEL 2026",
    },
    nav: {
      home: "Inici",
      gallery: "Galeria",
      upload: "Pujar fotos",
    },
    gallery: {
      title: "Galeria de fotos",
      subtitle: "Recull de moments especials del nostre casament",
      loading: "Carregant fotos...",
      empty: "Encara no hi ha fotos",
    },
    upload: {
      title: "Comparteix les teves fotos",
      subtitle: "Puja les teves fotos del casament per compartir-les amb tots",
      dropzone: "Arrossega les fotos aquí o fes clic per seleccionar",
      uploading: "Pujant...",
      success: "Foto pujada correctament!",
      error: "Error en pujar la foto",
      button: "Pujar foto",
    },
    // Cards
    cards: {
      love_title: "AMOR UNIVERSAL",
      love_desc: "L'amor no entén de llengües. Per això aquesta web parla català, italià i castellà.",
      share_title: "COMPARTEIX",
      share_desc: "Puja les teves fotos i fes créixer l'àlbum col·lectiu d'aquest dia tan especial.",
      remember_title: "RECORDA",
      remember_desc: "Guarda aquests moments per sempre. Tots junts construïm el record del casament.",
    },
    language: {
      label: "Idioma",
      ca: "Català",
      es: "Castellà",
      it: "Italià",
    },
    common: {
      loading: "Carregant...",
      error: "Error",
      close: "Tancar",
      save: "Desar",
    },
  },
  es: {
    home: {
      title: "Bienvenidos a la boda de Natalia y Marco",
      subtitle: "Gracias por acompañarnos en este día tan especial",
      couple_name: "Natalia y Marco",
      cta_gallery: "Ver fotos",
      cta_upload: "Subir fotos",
    },
    event: {
      location: "CASTELLDEFELS",
      date: "SÁBADO 9 DE MAYO DEL 2026",
    },
    nav: {
      home: "Inicio",
      gallery: "Galería",
      upload: "Subir fotos",
    },
    gallery: {
      title: "Galería de fotos",
      subtitle: "Recopilación de momentos especiales de nuestra boda",
      loading: "Cargando fotos...",
      empty: "Todavía no hay fotos",
    },
    upload: {
      title: "Comparte tus fotos",
      subtitle: "Sube tus fotos de la boda para compartirlas con todos",
      dropzone: "Arrastra las fotos aquí o haz clic para seleccionar",
      uploading: "Subiendo...",
      success: "¡Foto subida correctamente!",
      error: "Error al subir la foto",
      button: "Subir foto",
    },
    cards: {
      love_title: "AMOR UNIVERSAL",
      love_desc: "El amor no entiende de idiomas. Por eso esta web habla catalán, italiano y castellano.",
      share_title: "COMPARTE",
      share_desc: "Sube tus fotos y haz crecer el álbum colectivo de este día tan especial.",
      remember_title: "RECUERDA",
      remember_desc: "Guarda estos momentos para siempre. Juntos construimos el recuerdo de la boda.",
    },
    language: {
      label: "Idioma",
      ca: "Catalán",
      es: "Castellano",
      it: "Italiano",
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      close: "Cerrar",
      save: "Guardar",
    },
  },
  it: {
    home: {
      title: "Benvenuti al matrimonio di Natalia e Marco",
      subtitle: "Grazie per accompagnarci in questo giorno speciale",
      couple_name: "Natalia e Marco",
      cta_gallery: "Vedi foto",
      cta_upload: "Carica foto",
    },
    event: {
      location: "CASTELLDEFELS",
      date: "SABATO 9 MAGGIO 2026",
    },
    nav: {
      home: "Home",
      gallery: "Galleria",
      upload: "Carica foto",
    },
    gallery: {
      title: "Galleria fotografica",
      subtitle: "Raccolta di momenti speciali del nostro matrimonio",
      loading: "Caricamento foto...",
      empty: "Non ci sono ancora foto",
    },
    upload: {
      title: "Condividi le tue foto",
      subtitle: "Carica le tue foto del matrimonio per condividerle con tutti",
      dropzone: "Trascina le foto qui o clicca per selezionare",
      uploading: "Caricamento...",
      success: "Foto caricata con successo!",
      error: "Errore nel caricamento della foto",
      button: "Carica foto",
    },
    cards: {
      love_title: "AMORE UNIVERSALE",
      love_desc: "L'amore non conosce lingue. Per questo questo sito parla catalano, italiano e spagnolo.",
      share_title: "CONDIVIDI",
      share_desc: "Carica le tue foto per far crescere l'album collettivo di questo giorno speciale.",
      remember_title: "RICORDA",
      remember_desc: "Conserva questi momenti per sempre. Insieme costruiamo il ricordo del matrimonio.",
    },
    language: {
      label: "Lingua",
      ca: "Catalano",
      es: "Spagnolo",
      it: "Italiano",
    },
    common: {
      loading: "Caricamento...",
      error: "Errore",
      close: "Chiudi",
      save: "Salva",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ca;
