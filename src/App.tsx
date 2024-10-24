import './App.css'
import {useEffect} from "react";

function App() {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.target')?.classList.add('transition-box')
        }, 100)

        const box = document.querySelector('.animation-box') as HTMLElement;

        box.addEventListener('animationend', () => {
            box.style.animation = 'scale-up 1s forwards';
        });
    }, []);

    return (
        <div>
            <div className={'target'}></div>
            <div className={'target animation-box'}></div>
        </div>
    )
}

export default App
