import {
  BoxIcon,
  CategoryIcon,
  HomeProfileIcon,
  ListIcon,
  UsersIcon,
} from "@/common/Icons";

export function renderIconMenu(value) {
  switch (value) {
    case "home":
      return <HomeProfileIcon className="w-5 h-5" />;
      break;

    case "users":
      return <UsersIcon className="w-5 h-5" />;
      break;

    case "products":
      return <BoxIcon className="w-5 h-5" />;
      break;

    case "categories":
      return <CategoryIcon className="w-5 h-5" />;
      break;

    case "payments":
        return <ListIcon className="w-5 h-5" />;
        break;
        
    default:
      break;
  }
}
