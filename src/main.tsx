import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CardAnimation from './CardAnimation.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CardAnimation />
        {/*<UIEntities />*/}
    </StrictMode>,
);
