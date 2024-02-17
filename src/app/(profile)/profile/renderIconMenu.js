import { HomeProfileIcon, OrderBagIcon, UserIcon } from "@/common/Icons";

export function renderIconMenu(value){
    switch (value) {
        case "home":
            return(
                <HomeProfileIcon className="w-6 h-6"/>
            )
            break;
    
        case "profile":
            return(
                <UserIcon className="w-6 h-6"/>
            )
            break;
    
        case "orders":
            return(
                <OrderBagIcon className="w-6 h-6"/>
            )
            break;
    
        default:
            break;
    }
}