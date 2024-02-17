import { CartIcon, CategoryIcon, HomeProfileIcon, OrderBagIcon, UserIcon, UsersIcon } from "@/common/Icons";

export function renderIconMenu(value){
    switch (value) {
        case "home":
            return(
                <HomeProfileIcon className="w-6 h-6"/>
            )
            break;
    
        case "users":
            return(
                <UsersIcon className="w-6 h-6"/>
            )
            break;
    
        case "products":
            return(
                <CartIcon className="w-6 h-6"/>
            )
            break;
    
        case "categories":
            return(
                <CategoryIcon className="w-6 h-6"/>
            )
            break;
    
        default:
            break;
    }
}