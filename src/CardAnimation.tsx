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

        // 카드 중앙으로 모으기
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
        });

        // 빛나는 효과
        combine.to(
            '.card .card-cover',
            {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.in',
            },
            '-=0.5', // 선행 애니메이션이 끝나기 0.5 초 전에 시작
        )
    });

    const refresh = () => {
        const combine = gsap.timeline();
        combine.to('.card', {
            duration: 0.5,
            x: 0,
            ease: 'power2.in',
        })

    };

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
            <div className={'flex justify-center w-full gap-5'}>
                <button onClick={openCards}>확인하기</button>
                <button onClick={refresh}>새로고침</button>
            </div>
        </div>
    );
}

function Card() {
    return (
        <div
            className={'relative card w-48 h-64 bg-[#FFFDD0] rounded-[10px] shadow-2xl flex justify-center items-center'}>
            <Cover />
            <div className={'front'}>
                front
            </div>
            <div className={'back'}>
                back
            </div>
        </div>
    );
}

const Cover = () => {
    return (
        <div className={'card-cover absolute content-[""] inset-0 rounded-[8px] bg-white opacity-0 shadow-neon'}></div>
    );
};