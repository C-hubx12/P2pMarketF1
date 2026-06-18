const fs = require('fs');
const path = '../src/app/pages/MarketplacePage.tsx';
const compPath = '../src/app/pages/MarketplaceComponents.tsx';

let content = fs.readFileSync(path, 'utf8');

// The split point is just before `export default function MarketplacePage()`
const splitIndex = content.indexOf('export default function MarketplacePage()');
if (splitIndex === -1) {
    console.error("Could not find split point");
    process.exit(1);
}

// Top imports and constants
const importsAndConstantsMatch = content.match(/^([\s\S]*?)const ShieldLogo =/);
if (!importsAndConstantsMatch) {
    console.error("Could not find ShieldLogo");
    process.exit(1);
}
const topContent = importsAndConstantsMatch[1];
const componentsContent = content.substring(importsAndConstantsMatch[0].length - 'const ShieldLogo ='.length, splitIndex);
const mainPageContent = content.substring(splitIndex);

// We need to extract the constants to be shared, or just duplicate them
const constantsRegex = /const (BG_1|BG_2|CARD_BG|CYAN|CYAN_SOFT|BLUE|PURPLE|PURPLE_SOFT|GREEN|TEXT|TEXT_DIM|TEXT_MUTE|STROKE) = "[^"]+";/g;
let constantsMatch;
let constantsStr = "";
while ((constantsMatch = constantsRegex.exec(topContent)) !== null) {
    constantsStr += constantsMatch[0] + "\n";
}

// Components file needs imports
const componentsFile = `import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { PaymentIcon, PaymentMethod, PAYMENT_METHODS } from "../p2p/PaymentSelect";
import chxLogo from "../../imports/image.png";

${constantsStr}

${componentsContent}

export {
    ShieldLogo,
    HeroIllustration,
    Pill,
    RoundBtn,
    Card,
    IconTile,
    Field,
    SelectBox,
    AssetSelector,
    Skeleton,
    MiniPremiumIcon,
    PremiumIcon,
    TrustChip,
    PaymentMethodFilter
};
`;

// Now clean up the original file
const exportedComponents = [
    "ShieldLogo", "HeroIllustration", "Pill", "RoundBtn", "Card", "IconTile", 
    "Field", "SelectBox", "AssetSelector", "Skeleton", "MiniPremiumIcon", 
    "PremiumIcon", "TrustChip", "PaymentMethodFilter"
];

const newMainPage = topContent + `import {
    ${exportedComponents.join(",\n    ")}
} from "./MarketplaceComponents";\n\n` + mainPageContent;

fs.writeFileSync(compPath, componentsFile);
fs.writeFileSync(path, newMainPage);

console.log("Refactoring complete.");
