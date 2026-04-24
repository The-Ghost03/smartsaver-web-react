import home from "./ui/home.fr.js";
import layout from "./ui/layout.fr.js";
import cgu from "./legal/cgu.fr.js";
import policy from "./legal/policy.fr.js";
import mentions from "./legal/mentions.fr.js";

export default {
  home,
  ...layout,
  legal: { cgu, policy, mentions },
};
