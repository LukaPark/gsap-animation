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

        // 카드 Shaking
        const shakeRange = 2;

        combine.to('.card', {
            duration: 0.1,
            x: `+=${shakeRange}`,
            y: `+=${shakeRange}`,
            repeat: 8,
            ease: 'linear',
        })

        // 전체화면 Flash
        combine.to('.flash', {
            opacity: 1,
            duration: 0.1,
            ease: 'power4.out',
        });

        combine.to('.flash', {
            opacity: 0,
            duration: 2,
            ease: 'power4.out',
        });

        // 각 카드 위치 초기화
        combine.to('.card', {
            duration: 0.5,
            x: 0,
            ease: 'power4.out',
        }, '<');

        // 카드 180도 뒤집기
        combine.to('.card .card-front', {
            duration: 0.5,
            rotationY: 0,
            ease: 'power4.out',
        }, '<');

        combine.to('.card .card-back', {
            duration: 0.5,
            rotationY: 180,
            ease: 'power4.out',
        }, '<');

        // cover 숨기기
        combine.to('.card .card-cover', {
            opacity: 0,
            duration: 0.1,
            ease: 'power2.in',
        }, '<');
    });

    const refresh = () => {
        window.location.reload();
    };

    return (
        <div ref={scope} className={'bg-gray-950 w-screen h-screen'}>
            <Flash />
            <div className={'w-full flex gap-5 justify-center items-center min-h-[50vh] p-5'}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div className={'flex justify-center w-full gap-5'}>
                <button onClick={openCards} className={'bg-gray-950 text-white'}>확인하기</button>
                <button onClick={refresh} className={'bg-gray-950 text-white'}>새로고침</button>
            </div>
        </div>
    );
}

function Card() {
    return (
        <div
            className={'relative card w-48 h-64 bg-[#FFFDD0] rounded-[18px] shadow-2xl flex justify-center items-center'}>
            <Cover />
            <CardFront />
            <CardBack />
        </div>
    );
}

const Cover = () => {
    return (
        <div className={'card-cover absolute content-[""] inset-0 rounded-[8px] bg-white opacity-0 shadow-neon'}></div>
    );
};

const Flash = () => {
    return (
        <div className={'flash fixed inset-0 bg-white z-10 opacity-0 pointer-events-none'}></div>
    );
};

const CardFront = () => {
    return (
        <div className="card-front absolute w-full h-full" style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
        }}>
            {/* 앞면 내용 */}
            앞면
        </div>
    );
}

const CardBack = () => {
    return (
        <div className={'card-back w-full h-full'} style={{
            backfaceVisibility: 'hidden',
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 256" width={192} height={256}>
                {/* 카드 배경 */}
                <rect width="192" height="256" rx="15" fill="#333333"/>

                {/* 장식적인 테두리 */}
                <rect x="10" y="10" width="172" height="236" rx="10"
                      fill="none" stroke="#666666" stroke-width="2"/>

                {/* NBA 로고 스타일의 텍스트 */}
                <text x="96" y="138"
                      font-family="Arial" font-weight="bold" font-size="36"
                      fill="#FFFFFF" text-anchor="middle">
                    NBA
                </text>

                {/* 장식적인 선들 */}
                <path d="M20 80 L172 80" stroke="#666666" stroke-width="2"/>
                <path d="M20 170 L172 170" stroke="#666666" stroke-width="2"/>
            </svg>
        </div>
    );
}