import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { DownIcon } from "./Icons";

export default function AccordionCustome({ title, children }){
    return(
        <Accordion className="w-full bg-slate-200 !rounded-xl shadow-none">
            <AccordionSummary className="w-full font-bold text-sm text-secondary-800"
                expandIcon={<DownIcon className={'w-6 h-6 text-primary-900'}/>}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails className="w-full">
               {children}
            </AccordionDetails>
        </Accordion>
    )
}