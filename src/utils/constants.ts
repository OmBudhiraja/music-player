// export const tabs = ['for you', 'top tracks'] as const;
// export type Tab = (typeof tabs)[number];

export enum Tabs {
  ForYou = 'for you',
  TopTracks = 'top tracks',
}

export type Tab = Tabs.ForYou | Tabs.TopTracks;

export const baseUrl = 'https://cms.samespace.com';
