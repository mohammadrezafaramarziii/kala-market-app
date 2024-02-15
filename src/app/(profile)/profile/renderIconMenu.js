import { HomeProfileIcon, UserIcon } from "@/common/Icons";

export function renderIconMenu(value){
    switch (value) {
        case "home":
            return(
                <HomeProfileIcon className="w-5 h-5"/>
            )
            break;
    
        case "profile":
            return(
                <UserIcon className="w-5 h-5"/>
            )
            break;
    
        default:
            break;
    }
}