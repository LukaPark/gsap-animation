import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import UIEntities from './ui-entities';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*<CardAnimation/>*/}
        <UIEntities />
    </StrictMode>,
);
