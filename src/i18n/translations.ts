export const translations = {
  ca: {
    // Home
    home: {
      title: "Benvinguts al casament de la Natàlia i en Marco",
      subtitle: "Estem molt contents de compartir aquest dia tan especial amb vosaltres",
      cta_gallery: "Veure fotos",
      cta_upload: "Pujar fotos",
    },
    // Navigation
    nav: {
      home: "Inici",
      gallery: "Galeria",
      upload: "Pujar fotos",
    },
    // Gallery
    gallery: {
      title: "Galeria de fotos",
      subtitle: "Recull de moments especials del nostre casament",
      loading: "Carregant fotos...",
      empty: "Encara no hi ha fotos",
    },
    // Upload
    upload: {
      title: "Comparteix les teves fotos",
      subtitle: "Puja les teves fotos del casament per compartir-les amb tots",
      dropzone: "Arrossega les fotos aquí o fes clic per seleccionar",
      uploading: "Pujant...",
      success: "Foto pujada correctament!",
      error: "Error en pujar la foto",
      button: "Pujar foto",
    },
    // Language
    language: {
      label: "Idioma",
      ca: "Català",
      es: "Castellà",
      it: "Italià",
    },
    // Common
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
      subtitle: "Estamos muy contentos de compartir este día tan especial con vosotros",
      cta_gallery: "Ver fotos",
      cta_upload: "Subir fotos",
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
      subtitle: "Siamo molto felici di condividere questo giorno speciale con voi",
      cta_gallery: "Vedi foto",
      cta_upload: "Carica foto",
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
