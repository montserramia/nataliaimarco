# Àlbum de Records - Casament de la Natàlia i el Marco

Aquest projecte té el propòsit de crear un àlbum de records pel casament de la Natàlia i el Marco, similar a la aplicació [Celebrate.app](https://celebrate.app). La Natàlia és germana meva i ells viuen a Itàlia, es casen a Castelldefels i els convidats parlen majoritàriament italià, alguns català i altres castellà.

## Descripció

L'aplicació permet als convidats del casament pujar fotos i vídeos (fins a 30 segons) per crear un àlbum col·laboratiu de records d'aquest dia tan especial. L'aplicació està disponible en tres idiomes: català, italià i castellà.

Les fotos i vídeos es guarden directament a Cloudflare R2 i es mostren automàticament a la galeria, que s'actualitza cada 10 segons per mostrar els continguts nous.

## Característiques

- 📷 Pujada de fotos (JPG, PNG, HEIC) fins a 10MB
- 🎥 Pujada de vídeos (MP4, MOV) fins a 30 segons
- 🌍 Disponible en 3 idiomes: català, italià i castellà
- 🔄 Galeria que s'actualitza automàticament
- ☁️ Emmagatzematge a Cloudflare R2
- 🌐 Desplegada a Vercel

## Tecnologies utilitzades

- [Next.js](https://nextjs.org) - Framework React
- [TypeScript](https://www.typescriptlang.org) - Superset tipat de JavaScript
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS utility-first
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Emmagatzematge d'objectes
- [PostgreSQL](https://www.postgresql.org) - Base de dades relacional
- [Vercel](https://vercel.com) - Plataforma de desplegament

## Configuració local

1. Clona el repositori:
   ```bash
   git clone https://github.com/montserramia/nataliaimarco
   cd nataliaimarco
   ```

2. Instal·la les dependències:
   ```bash
   npm install
   ```

3. Configura les variables d'entorn:
   Crea un fitxer `.env.local` a l'arrel del projecte amb les següents variables:
   ```
   DATABASE_URL="postgresql://usuari:contrasenya@host:port/nom_base_dades?sslmode=prefer"
   R2_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
   R2_ACCESS_KEY_ID="<access_key_id>"
   R2_SECRET_ACCESS_KEY="<secret_access_key>"
   R2_BUCKET_NAME="nom_del_bucker"
   R2_PUBLIC_URL="https://<public_endpoint>/" # Exemple: https://<account_id>.r2.dev
   ```

4. Inicia el servidor de desenvolupament:
   ```bash
   npm run dev
   ```

5. Obre [http://localhost:3000](http://localhost:3000) al teu navegador.

## Estructura del projecte

```
wedding-pwa/
├── public/                 # Arxius públics
├── src/
│   ├── app/               # Pàgines de l'aplicació (basat en App Router)
│   │   ├── api/           # Rutes API
│   │   │   ├── photos/    # API per gestionar fotos
│   │   │   └── presigned-url/ # API per generar URLs pre-autoritzats
│   │   ├── gallery/       # Pàgina de galeria
│   │   ├── upload/        # Pàgina de pujada
│   │   └── ...            # Altres rutes
│   ├── components/        # Components reutilitzables
│   ├── i18n/              # Configuració d'internacionalització
│   └── lib/               # Funcions auxiliars i configuracions
├── README.md
└── ...
```

## Internals

### Gestió de contingut multimèdia

L'aplicació distingeix entre dos tipus de contingut:

- **Fotos**: Formats suportats: JPEG, PNG, HEIC. Màxim 10MB per arxiu.
- **Vídeos**: Formats suportats: MP4, MOV. Màxim 30 segons de duració i 50MB per arxiu.

Els arxius es pugen mitjançant URLs pre-autoritzats generats per l'API `/api/presigned-url`, que es comunica amb Cloudflare R2.

### Internacionalització

L'aplicació suporta tres idiomes: català (per defecte), italià i castellà. El sistema detecta automàticament l'idioma del navegador i permet canviar-lo manualment mitjançant el selector d'idioma.

## Contribucions

Les contribucions són benvingudes! Si vols contribuir a aquest projecte, si us plau, fes un fork del repositori i envia un pull request.

## Llicència

Aquest projecte és de caràcter personal i creativament lliure. Pots fer servir aquest codi com a inspiració per al teu propi projecte.

## Contacte

Per qualsevol dubte o suggeriment sobre el projecte, pots contactar mitjançant GitHub.