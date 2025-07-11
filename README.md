# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Punti chiave dell'architettura:
🏗️ Struttura Modulare

Organizzazione logica in directory tematiche
Separazione netta tra UI, logica business e gestione dati
Sistema di componenti riutilizzabili

📦 Gestione Stato

Redux Toolkit per stato globale
LocalStorage managers per persistenza
Cache system per API calls

🔐 Sistema Permessi

Route protette per utenti/admin
Validazioni ruolo integrate
Prevenzione operazioni non autorizzate

🎨 Design System

CSS custom properties per consistenza
Componenti UI standardizzati
Responsive design mobile-first

⚡ Performance

Cache API con TTL automatico
Memoizzazione componenti
Ottimizzazioni rendering