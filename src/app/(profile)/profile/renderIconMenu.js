import {
  HomeProfileIcon,
  ListIcon,
  OrderBagIcon,
  UserIcon,
  BoxIcon
} from "@/common/Icons";

export function renderIconMenu(value) {
  switch (value) {
    case "home":
      return <HomeProfileIcon className="w-5 h-5" />;
      break;

    case "profile":
      return <UserIcon className="w-5 h-5" />;
      break;

    case "orders":
      return <ListIcon className="w-5 h-5" />;
      break;

    case "paidProducts":
      return <BoxIcon className="w-5 h-5" />;
      break;

    default:
      break;
  }
}
