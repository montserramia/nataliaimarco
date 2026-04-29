# AGENTS.md

## Objectiu

Aquest fitxer proporciona instruccions i context per a agents d’IA que col·laboren en el desenvolupament del projecte "Àlbum de Records - Casament de la Natàlia i el Marco" (wedding-pwa).

## Comandes habituals

- Instal·lació de dependències: `npm install`
- Inici en desenvolupament: `npm run dev`
- Build de producció: `npm run build`
- Lint: `npm run lint`

## Arquitectura i convencions

- **Framework:** Next.js (App Router, TypeScript)
- **Estil:** Tailwind CSS
- **Emmagatzematge:** Cloudflare R2 per fotos i vídeos
- **Base de dades:** PostgreSQL
- **Internacionalització:** Català (per defecte), italià i castellà. Veure `src/i18n/`.
- **Components:** A `src/components/` trobaràs components reutilitzables, agrupats per funcionalitat.
- **API:** Les rutes API estan a `src/app/api/`.
- **Galeria:** La galeria es refresca automàticament cada 10 segons.

## Fitxers i directoris clau

- [README.md](README.md): Documentació general i instruccions d’instal·lació.
- `src/app/`: Pàgines i rutes de l’aplicació.
- `src/components/`: Components UI i lògica compartida.
- `src/i18n/`: Traduccions i context d’idioma.
- `src/lib/`: Utilitats per accés a base de dades i Cloudflare R2.

## Bones pràctiques

- Mantén la compatibilitat multilingüe a totes les UI.
- No deixis secrets ni credencials a codi font ni repositori.
- Utilitza components i utilitats existents abans de crear-ne de nous.
- Consulta i actualitza aquest fitxer si canvies convencions o arquitectura.

## Enllaços útils

- [Documentació Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)

---

Si el projecte creix, considera dividir instruccions per àrees (frontend, backend, tests) en fitxers separats.
