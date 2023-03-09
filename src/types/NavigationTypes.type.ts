export type NavItemTypes = {
  name: string;
  url: string;
  onClick: () => void;
};

export type NavItemLinksTypes = {
  links: NavItemTypes[];
};
