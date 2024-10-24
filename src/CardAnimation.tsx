import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export default function CardAnimation() {
    const scope = useRef<HTMLDivElement>(null);
    const {contextSafe} = useGSAP(() => {
    }, {scope});

    const openCards = contextSafe(() => {
        const combine = gsap.timeline();
        const w = 48 * 4;
        const gap = 5 * 4;

        combine.to('.card', {
            duration: 0.5,
            x: (i) => {
                if (i === 0) return `${(w + gap) * 2}px`;
                if (i === 1) return `${w + gap}px`;
                if (i === 2) return '0px';
                if (i === 3) return `-${w + gap}px`;
                if (i === 4) return `-${(w + gap) * 2}px`;
                return '0';
            },
            ease: 'power2.in',
        })
    });

    return (
        <div ref={scope}>
            <div className={'flash'}></div>
            <div className={'w-full flex gap-5 justify-center p-5'}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div>
                <button onClick={openCards}>확인하기</button>
            </div>
        </div>
    );
}

function Card() {
    return (
        <div
            className={'card w-48 h-64 bg-[#FFFDD0] rounded-[10px] shadow-2xl flex justify-center items-center'}>
            <div className={'cover'}>
                Cover
            </div>
            <div className={'front'}>
                front
            </div>
            <div className={'back'}>
                back
            </div>
        </div>
    );
}