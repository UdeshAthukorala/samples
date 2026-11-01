import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThunderIDProvider } from '@thunderid/react'
import App from './App.jsx'
import ConfigNotice from './components/ConfigNotice.jsx'
import './index.css'

// With VITE_THUNDERID_BFF=true, sign-in runs on a Backend for Frontend (see ../express-bff). The BFF
// holds the tokens behind an HttpOnly cookie, so the app needs no client ID and holds no token.
const useBff = import.meta.env.VITE_THUNDERID_BFF === 'true'

const REQUIRED_ENV_VARS = useBff ? [] : ['VITE_THUNDERID_CLIENT_ID', 'VITE_THUNDERID_BASE_URL']
const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {missingEnvVars.length > 0 ? (
      <ConfigNotice missing={missingEnvVars} />
    ) : useBff ? (
      <ThunderIDProvider
        // The BFF is on this origin under /api/auth, the default for every backend endpoint.
        endpoints={{ backend: {} }}
        // Ask the BFF every 30 seconds whether the session still exists, so a back-channel logout
        // signs this app out while it is open.
        session={{ checkInterval: 30 }}
      >
        <App />
      </ThunderIDProvider>
    ) : (
      <ThunderIDProvider
        clientId={import.meta.env.VITE_THUNDERID_CLIENT_ID}
        baseUrl={import.meta.env.VITE_THUNDERID_BASE_URL}
      >
        <App />
      </ThunderIDProvider>
    )}
  </StrictMode>
)
