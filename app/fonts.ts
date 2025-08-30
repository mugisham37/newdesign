import localFont from "next/font/local";

// Amiamie font family with all variants
export const amiamie = localFont({
  src: [
    // Light variants
    {
      path: "../public/fonts/amiamie/otf/Amiamie-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/otf/Amiamie-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    // Regular variants
    {
      path: "../public/fonts/amiamie/otf/Amiamie-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/otf/Amiamie-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    // Black variants
    {
      path: "../public/fonts/amiamie/otf/Amiamie-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/otf/Amiamie-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-amiamie",
  display: "swap",
});

// Amiamie-Round font family with all variants
export const amiamieRound = localFont({
  src: [
    // Regular Round variants
    {
      path: "../public/fonts/amiamie/otf/Amiamie-RegularRound.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-RegularRound.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/otf/Amiamie-ItalicRound.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-ItalicRound.ttf",
      weight: "400",
      style: "italic",
    },
    // Black Round variants
    {
      path: "../public/fonts/amiamie/otf/Amiamie-BlackRound.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-BlackRound.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/amiamie/otf/Amiamie-BlackItalicRound.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/amiamie/ttf/Amiamie-BlackItalicRound.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-amiamie-round",
  display: "swap",
});
