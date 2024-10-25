import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const playerData: PlayerInfo[] = [
    {
        name: 'Stephen Curry',
        team_name: 'Golden State Warriors',
        position: 'G',
        player_number: 30,
        team_color: 'linear-gradient(135deg, #1D428A 0%, #FDB927 100%)',
        player_achievement: ['3x NBA Champion', '2x NBA MVP'],
    },
    {
        name: 'LeBron James',
        team_name: 'Los Angeles Lakers',
        position: 'F',
        player_number: 23,
        team_color: 'linear-gradient(135deg, #552583 0%, #FFC72C 100%)',
        player_achievement: ['4x NBA Champion', '4x NBA MVP'],
    },
    {
        name: 'Kevin Durant',
        team_name: 'Phoenix Suns',
        position: 'F',
        player_number: 35,
        team_color: 'linear-gradient(135deg, #1D1160 0%, #E56020 100%)',
        player_achievement: ['2x NBA Champion', '2x NBA MVP'],
    },
    {
        name: 'Luka Dončić',
        team_name: 'Dallas Mavericks',
        position: 'G',
        player_number: 77,
        team_color: 'linear-gradient(135deg, #00538C 0%, #002B5C 100%)',
        player_achievement: ['Rookie of the Year', '2x NBA All-Star'],
    },
    {
        name: 'Michael Jordan',
        team_name: 'Chicago Bulls',
        position: 'G',
        player_number: 23,
        team_color: 'linear-gradient(135deg, #CE1141 0%, #000000 100%)',
        player_achievement: ['6x NBA Champion', '5x NBA MVP'],
    }
]

const card = {
    w: 300,
    h: 420,
    gap: 20,
}

export default function CardAnimation() {
    const scope = useRef<HTMLDivElement>(null);
    const {contextSafe} = useGSAP(() => {
    }, {scope});

    const openCards = contextSafe(() => {
        const combine = gsap.timeline();
        const w = card.w;
        const gap = card.gap;

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
            <div className={'w-full flex justify-center items-center min-h-[50vh] p-5'} style={{
                gap: `${card.gap}px`,
            }}>
                {
                    playerData.map((player, index) => (
                        <Card key={index} player={player}/>
                    ))
                }
            </div>
            <div className={'flex justify-center w-full gap-5'}>
                <button onClick={openCards} className={'bg-gray-950 text-white'}>확인하기</button>
                <button onClick={refresh} className={'bg-gray-950 text-white'}>새로고침</button>
            </div>
        </div>
    );
}

function Card({player}: { player: PlayerInfo }) {
    return (
        <div
            className={`relative card bg-[#FFFDD0] rounded-[18px] shadow-2xl flex justify-center items-center`} style={{
                width: `${card.w}px`,
                height: `${card.h}px`,
        }}>
            <Cover />
            <CardFront player={player} />
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

type PlayerInfo = {
    name: string;
    team_name: string;
    team_color: string;
    position: string;
    player_number: number;
    player_achievement: string[];
}


const CardFront = ({player}: { player: PlayerInfo }) => {
    return (
        <div className="card-front bg-amber-200 absolute w-full h-full rounded-[15px] overflow-hidden" style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
        }}>
            <div className={'w-full h-3/5'}>
                {/*<img src="https://www.nba.com/assets/logos/teams/primary/web/ATL.svg" alt="ATL"/>*/}
                <div className={'w-full h-full bg-amber-200'}></div>
            </div>
            <div className={'card-content rounded-[15px] p-[15px] text-white text-center h-2/5'} style={{
                background: player.team_color,
            }}>
                <div
                    className={'text-[24px] font-bold my-[10px]'}
                    style={{
                        textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                    }}
                >
                    {player.name}
                </div>
                <div
                    className={'text-[18px]'}
                    style={{
                        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                    }}
                >
                    {player.team_name}
                </div>
                <div
                    className={'text-[16px] opacity-90'}
                >
                    #{player.player_number} | {player.position}
                </div>
                <div
                    className={'flex justify-between text-[14px] my-[10px] opacity-90 p-[5px] rounded-[5px] bg-[rgba(255,255,255,0.1)]'}
                >
                    {player.player_achievement.map((achievement, index) => (
                        <span key={index}>{achievement}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const CardBack = () => {
    return (
        <div className={'card-back w-full h-full'} style={{
            backfaceVisibility: 'hidden',
            // transform: 'rotateY(180deg)',
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${card.w} ${card.h}`} width={card.w} height={card.h}>
                {/* 카드 배경 */}
                <rect width={card.w} height={card.h} rx="15" fill="#333333"/>

                {/* 장식적인 테두리 */}
                <rect x="10" y="10" width={card.w-20} height={card.h - 20} rx="15"
                      fill="none" stroke="#666666" stroke-width="2"/>

                {/* NBA 로고 스타일의 텍스트 */}
                <text x={(card.w / 2)} y={card.h /2 + 24}
                      font-family="Arial" font-weight="bold" font-size="72"
                      fill="#FFFFFF" text-anchor="middle">
                    NBA
                </text>

                {/* 장식적인 선들 */}
                <path d={`M20 ${card.h/4} L${card.w-20} ${card.h/4}`} stroke="#666666" stroke-width="2"/>
                <path d={`M20 ${card.h/4*3} L${card.w-20} ${card.h/4*3}`} stroke="#666666" stroke-width="2"/>
            </svg>
        </div>
    );
}