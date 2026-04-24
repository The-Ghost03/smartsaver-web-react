import home from "./ui/home.en.js";
import layout from "./ui/layout.en.js";
import cgu from "./legal/cgu.en.js";
import policy from "./legal/policy.en.js";
import mentions from "./legal/mentions.en.js";

export default {
  home,
  ...layout,
  legal: { cgu, policy, mentions },
};
