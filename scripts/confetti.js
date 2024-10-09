const popConfetti = () => {
    confetti({
        zIndex: 999,
        spread: 360,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        startVelocity: 30,
        particleCount: 100,
        scalar: 3,
        shapes: ["image"],
        shapeOptions: {
            image: [
                {
                    src: "assets/lottery/confetti/DECO_SNOKT.png"
                },
                {
                    src: "assets/lottery/confetti/DECO_SNSQD.png"
                },
                {
                    src: "assets/lottery/confetti/DECO2_OKT.png"
                },
                {
                    src: "assets/lottery/confetti/DECO2_SQD.png"
                },
                {
                    src: "assets/lottery/confetti/snowflake_1.png"
                },
                {
                    src: "assets/lottery/confetti/snowflake_2.png"
                },
                {
                    src: "assets/lottery/confetti/snowflake_3.png"
                },
                {
                    src: "assets/lottery/confetti/snowflake_4.png"
                },
                {
                    src: "assets/lottery/confetti/snowflake_5.png"
                },
                {
                    src: "assets/lottery/confetti/star.png"
                },
                {
                    src: "assets/lottery/confetti/3SM.png"
                },
                {
                    src: "assets/lottery/confetti/ZF.png"
                },
                {
                    src: "assets/lottery/confetti/GGTNA.png"
                },
                {
                    src: "assets/lottery/confetti/LGX4.png"
                },
                {
                    src: "assets/lottery/confetti/NTG.png"
                },
                {
                    src: "assets/lottery/confetti/wooper.png"
                },
                {
                    src: "assets/lottery/confetti/amongus.png"
                }
            ]
        }
    });
};