import './App.css'

import gsap from 'gsap';
import {useLayoutEffect} from "react";

export default function Gsap() {

    useLayoutEffect(() => {
        const tl = gsap.timeline();

        tl.to('.animation-box', {
            x: 100,
            duration: 0.4,
        });

        tl.to('.animation-box', {
            y: -50,
            duration: 0.2,
        });

        tl.to('.animation-box', {
            y: 0,
            duration: 0.2,
        });

        tl.to('.animation-box', {
            x: '+=100', // 현재 상태 기준으로 100만큼 이동
            duration: 0.2,
        });

        tl.to('.animation-box', {
            scale: 2,
            duration: 0.3,
        });

        return () => {
            tl.kill();
        }
    }, []);

    return (
        <div>
            <div className={'target'}></div>
            <div className={'target animation-box'}></div>
        </div>
    );
}