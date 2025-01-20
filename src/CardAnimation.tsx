import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const playerData: PlayerInfo[] = [
    {
        name: 'Stephen Curry',
        team_name: 'Golden State Warriors',
        position: 'G',
        player_number: 30,
        team_color: 'linear-gradient(135deg, #1D428A 0%, #FDB927 100%)',
        player_achievement: ['3x NBA Champion', '2x NBA MVP'],
        image_url: '/nba_players/stephen_curry.jpeg',
    },
    {
        name: 'LeBron James',
        team_name: 'Los Angeles Lakers',
        position: 'F',
        player_number: 23,
        team_color: 'linear-gradient(135deg, #552583 0%, #FFC72C 100%)',
        player_achievement: ['4x NBA Champion', '4x NBA MVP'],
        image_url: '/nba_players/lebron_james.jpeg',
    },
    {
        name: 'Kevin Durant',
        team_name: 'Phoenix Suns',
        position: 'F',
        player_number: 35,
        team_color: 'linear-gradient(135deg, #1D1160 0%, #E56020 100%)',
        player_achievement: ['2x NBA Champion', '2x NBA MVP'],
        image_url: '/nba_players/kevin_durant.png',
    },
    {
        name: 'Luka Dončić',
        team_name: 'Dallas Mavericks',
        position: 'G',
        player_number: 77,
        team_color: 'linear-gradient(135deg, #00538C 0%, #002B5C 100%)',
        player_achievement: ['Rookie of the Year', '2x NBA All-Star'],
        image_url: '/nba_players/luka_doncic.jpg',
    },
    {
        name: 'Shai Gilgeous-Alexander',
        team_name: 'Oklahoma City Thunder',
        position: 'G',
        player_number: 2,
        team_color: 'linear-gradient(135deg, #007AC1 0%, #EF3B24 100%)',
        player_achievement: ['1x NBA First team', 'NBA All-Rookie Second Team'],
        image_url: '/nba_players/shai.jpg',
    },
];

const card = {
    w: '18vw',
    h: '25.2vw',
    gap: '1.5vw',
};

export default function CardAnimation() {
    const scope = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const { contextSafe } = useGSAP(() => {}, { scope });

    function vwToPX(vw: string) {
        return (window.innerWidth * parseInt(vw.replace('vw', ''))) / 100;
    }

    // 카드 단건 오픈, currentIndex 를 이용해 몇번째 카드인지 확인
    const openCard = () => {
        const tl = gsap.timeline();

        // 카드 광원 효과
        tl.to(
            '.card .card-cover',
            {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.in',
            },
            '-=0.5', // 선행 애니메이션이 끝나기 0.5 초 전에 시작
        );

        // 카드 Shaking
        const shakeRange = 2;
        tl.to('.card', {
            duration: 0.1,
            x: `+=${shakeRange}`,
            y: `+=${shakeRange}`,
            repeat: 8,
            ease: 'linear',
        });

        // 전체화면 Flash
        tl.to('.flash', {
            opacity: 1,
            duration: 0.1,
            ease: 'power4.out',
        });

        tl.to('.flash', {
            opacity: 0,
            duration: 2,
            ease: 'power4.out',
        });

        // 카드 180도 뒤집기
        tl.to(
            '.card .card-front',
            {
                duration: 0.5,
                rotationY: 0,
                ease: 'power4.out',
            },
            '<',
        );

        tl.to(
            '.card .card-back',
            {
                duration: 0.5,
                rotationY: 180,
                ease: 'power4.out',
            },
            '<',
        );

        // cover 숨기기
        tl.to(
            '.card .card-cover',
            {
                opacity: 0,
                duration: 0.1,
                ease: 'power2.in',
            },
            '<',
        );
    };

    const openCards = contextSafe(() => {
        const combine = gsap.timeline();
        let w = vwToPX(card.w);
        let gap = vwToPX(card.gap);

        if (w > 300) w = 300;
        if (gap > 20) gap = 20;

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
        );

        // 카드 Shaking
        const shakeRange = 2;

        combine.to('.card', {
            duration: 0.1,
            x: `+=${shakeRange}`,
            y: `+=${shakeRange}`,
            repeat: 8,
            ease: 'linear',
        });

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
        combine.to(
            '.card',
            {
                duration: 0.5,
                x: 0,
                ease: 'power4.out',
            },
            '<',
        );

        // 카드 180도 뒤집기
        combine.to(
            '.card .card-front',
            {
                duration: 0.5,
                rotationY: 0,
                ease: 'power4.out',
            },
            '<',
        );

        combine.to(
            '.card .card-back',
            {
                duration: 0.5,
                rotationY: 180,
                ease: 'power4.out',
            },
            '<',
        );

        // cover 숨기기
        combine.to(
            '.card .card-cover',
            {
                opacity: 0,
                duration: 0.1,
                ease: 'power2.in',
            },
            '<',
        );
    });

    const onCardOpen = (index: number) => {
        const tl = gsap.timeline();
        // 선택된 카드만 뒤집기
        const target = `.card:nth-child(${index + 1})`;

        // 카드 광원 효과
        tl.to(
            `${target} .card-cover`,
            {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.in',
            },
            '-=0.5', // 선행 애니메이션이 끝나기 0.5 초 전에 시작
        );

        // 카드 Shaking
        const shakeRange = 2;

        tl.to('.card', {
            duration: 0.1,
            x: `+=${shakeRange}`,
            y: `+=${shakeRange}`,
            repeat: 8,
            ease: 'linear',
        });

        // 전체화면 Flash
        tl.to('.flash', {
            opacity: 1,
            duration: 0.1,
            ease: 'power4.out',
        });

        tl.to('.flash', {
            opacity: 0,
            duration: 2,
            ease: 'power4.out',
        });

        tl.to(
            `${target} .card-front`,
            {
                duration: 0.5,
                rotationY: 0,
                ease: 'power4.out',
            },
            '<',
        );

        tl.to(
            `${target} .card-back`,
            {
                duration: 0.5,
                rotationY: 180,
                ease: 'power4.out',
            },
            '<',
        );

        // cover 숨기기
        tl.to(
            `${target} .card-cover`,
            {
                opacity: 0,
                duration: 0.1,
                ease: 'power2.in',
            },
            '<',
        );
    };

    const onCardZoom = (player: PlayerInfo) => {
        console.log(player);
    };

    const onMobileCardClick = () => {
        setCurrentIndex((prev) => {
            if (prev === playerData.length - 1) {
                return 0;
            }
            return prev + 1;
        });
    };

    const refresh = () => {
        window.location.reload();
    };

    return (
        <div ref={scope} className={'bg-gray-950 w-screen h-screen overflow-hidden'}>
            <Flash />
            <div
                className={'md:flex w-full flex-auto justify-center items-center min-h-[50vh] p-5'}
                style={{
                    gap: `1.5vw`,
                }}
            >
                {playerData.map((player, index) => (
                    <Card key={index} player={player} onCardOpen={() => onCardOpen(index)} onCardZoom={() => onCardZoom(player)} />
                ))}
            </div>
            {/*<div className={"md:hidden flex w-full justify-center items-center"}>*/}
            {/*    <Card player={playerData[currentIndex]} onClick={onMobileCardClick} />*/}
            {/*</div>*/}
            <div className={'flex justify-center w-full gap-5'}>
                <button onClick={openCards} className={'bg-gray-950 text-white hidden md:flex'}>
                    확인하기
                </button>
                <button onClick={openCard} className={'bg-gray-950 text-white md:hidden'}>
                    확인하기
                </button>
                <button onClick={refresh} className={'bg-gray-950 text-white'}>
                    새로고침
                </button>
            </div>
        </div>
    );
}

interface CardProps {
    player: PlayerInfo;
    onCardOpen: () => void;
    onCardZoom: () => void;
}

function Card(props: CardProps) {
    const { player, onCardZoom, onCardOpen } = props;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`relative max-w-[300px] max-h-[420px] card bg-[#FFFDD0] rounded-[18px] shadow-2xl flex justify-center items-center cursor-pointer`}
            onClick={() => {
                if (isOpen) {
                    onCardZoom();
                } else {
                    setIsOpen(true);
                    onCardOpen();
                }
            }}
            style={{
                width: card.w,
                height: card.h,
            }}
        >
            <Cover />
            <CardFront player={player} />
            <CardBack />
        </div>
    );
}

const Cover = () => {
    return <div className={'card-cover absolute content-[""] inset-0 rounded-[8px] bg-white opacity-0 shadow-neon'}></div>;
};

const Flash = () => {
    return <div className={'flash fixed inset-0 h-screen bg-white z-10 opacity-0 pointer-events-none'}></div>;
};

type PlayerInfo = {
    name: string;
    team_name: string;
    team_color: string;
    position: string;
    player_number: number;
    player_achievement: string[];
    image_url: string;
};

const CardFront = ({ player }: { player: PlayerInfo }) => {
    return (
        <div
            className="card-front group/card-front cursor-pointer bg-amber-200 absolute w-full h-full rounded-[15px] shadow-card_hard overflow-hidden"
            style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
            }}
        >
            <div className={'w-full h-full'}>
                <div className={'w-full h-full'}>
                    <img src={player.image_url} alt={player.name} className={'w-full h-full object-cover'} />
                </div>
            </div>
            <div
                className={'card-content absolute z-10 bottom-0 left-0 w-full rounded-[15px] p-2 text-white text-center'}
                style={{
                    background: player.team_color,
                }}
            >
                <div
                    className={'text-[14px] font-bold'}
                    style={{
                        textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                    }}
                >
                    {player.name}
                </div>
                <div
                    className={'text-[18px] hidden group-hover/card-front:block'}
                    style={{
                        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                    }}
                >
                    {player.team_name}
                </div>
                <div className={'text-[16px] opacity-90  hidden group-hover/card-front:block'}>
                    #{player.player_number} | {player.position}
                </div>
                <div className={'flex-col justify-between text-[14px] my-[10px] opacity-90 p-[5px] rounded-[5px] bg-[rgba(255,255,255,0.1)]  hidden group-hover/card-front:flex'}>
                    {player.player_achievement.map((achievement, index) => (
                        <span key={index}>{achievement}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CardBack = () => {
    return (
        <div
            className={'card-back w-full h-full'}
            style={{
                backfaceVisibility: 'hidden',
                // transform: 'rotateY(180deg)',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" preserveAspectRatio="xMidYMid meet">
                {/* 카드 배경 */}
                <rect width="300" height="420" rx="15" fill="#333333" />

                {/* 장식적인 테두리 */}
                <rect x="10" y="10" width="280" height="400" rx="15" fill="none" stroke="#666666" strokeWidth="2" />

                {/* NBA 로고 스타일의 텍스트 */}
                <text x="150" y="234" fontFamily="Arial" fontWeight="bold" fontSize="72" fill="#FFFFFF" textAnchor="middle">
                    NBA
                </text>

                {/* 장식적인 선들 */}
                <path d="M20 105 L280 105" stroke="#666666" strokeWidth="2" />
                <path d="M20 315 L280 315" stroke="#666666" strokeWidth="2" />
            </svg>
        </div>
    );
};
