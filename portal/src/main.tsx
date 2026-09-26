import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultMode="light">
      <TooltipProvider delayDuration={300}>
        <App />
        <Toaster position="bottom-right" mobileOffset={{ bottom: 88 }} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
