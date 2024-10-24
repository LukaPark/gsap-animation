import './App.css'

import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {useRef, useState} from "react";

export default function GsapReact() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button onClick={() => setShow((prev) => !prev)}>toggle</button>
            {show && <SampleBox/>}
        </div>
    );
}

function SampleBox() {
    const rootScope = useRef<HTMLDivElement>(null);

    const {contextSafe} = useGSAP(() => {
        const tl = gsap.timeline();

        tl.to('.box', {
            x: 100,
            duration: 0.4,
        })

        tl.to('.box', {
            y: -50,
            duration: 0.2,
        })

        tl.to('.box', {
            y: 0,
            duration: 0.2,
        })

        tl.to('.box', {
            x: '+=100',
            duration: 0.2,
        })

        tl.to('.box', {
            scale: 2,
            duration: 0.3,
        })
    }, {
        scope: rootScope,
    });

    const pump = contextSafe(() => {
        const tl = gsap.timeline();
        tl.to('.box', {
            scale: '+=0.5',
            backgroundColor: 'red',
            duration: 0.2,
        });

        tl.to('.box', {
            scale: '-=0.5',
            backgroundColor: '#fff',
            duration: 0.2,
        });
    })

    return (
        <div ref={rootScope}>
            <div className={'target box'} onClick={pump}></div>
        </div>
    );
}