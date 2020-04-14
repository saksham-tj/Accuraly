import { frontendRoutes } from "./utils/constants";

export default {
  items: [
    {
      name: frontendRoutes.dashboard.name,
      url: frontendRoutes.dashboard.path,
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Actions",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    // {
    //   name: "Users",
    //   url: "/users",
    //   icon: "cui-user"
    // },
    {
      name: frontendRoutes.campaigns.name,
      url: frontendRoutes.campaigns.path,
      icon: "cui-user"
    }
  ]
};
