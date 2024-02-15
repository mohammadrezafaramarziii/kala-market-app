import LocalFont from "next/font/local";


const kalamehFont = LocalFont({
    src:[
        {
            path: "../../public/fonts/KalamehEXTRALIGHT.ttf",
            weight: "100",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehLIGHT.ttf",
            weight: "200",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehTHIN.ttf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehREGULAR.ttf",
            weight: "normal",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehMEDIUM.ttf",
            weight: "500",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehSEMIBOLD.ttf",
            weight: "600",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehBOLD.ttf",
            weight: "700",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehEXTRABOLD.ttf",
            weight: "800",
            style: "normal"
        },
        {
            path: "../../public/fonts/KalamehBLACK.ttf",
            weight: "900",
            style: "normal"
        },
    ],
    variable: "--font-kalameh",
    style: "normal",
    display: "block"
}); 

export default kalamehFont;


export const kalamehNumFont = LocalFont({
    src:[
        {
            path: "../../public/fonts/kalamehFaNumBOLD.ttf",
            weight: "700",
            style: "normal"
        },
    ],
    variable: "--font-kalameh-num",
    style: "normal",
    display: "block"
})

