export const useProgramHook = () => {
  const cerimony: Array<ProgramElement> = [
    { title: "Officiating Minister: Rev. David Roomes", skipTitling: true },
    { title: "MUSICAL PRELUDE" },
    { title: "ENTRANCE OF THE BRIDAL PARTY" },
    { title: "INTRODUCTION & DELARATION OF INTENT", content: "Rev. David Roomes" },
    { title: "PRAISE & WORSHIP" },
    { title: "SCRIPTURE READING", subtitle: "Ecclesiastes 4: 9-12 & 1 Corinthians 13:1-8", content: "Jonathan Hosey" },
    { title: "HOMILY", content: "Evangelist Norman Dyke" },
    { title: "EXCHANGE OF VOWS" },
    { title: "EXCHANGE OF RINGS" },
    { title: "SYMBOLISM OF UNITY" },
    { title: "PRAYER OF BLESSING FOR THE COUPLE" },
    { title: "SIGNING OF THE REGISTER & INTERLUDE OF MUSIC" },
    { title: "PRESENTATION OF COUPLE" },
    { title: "RECESSION OF BRIDAL PARTY" },
  ];
  const reception: Array<ProgramElement> = [
    { title: "BRIDAL PARTY & ENTRANCE" },
    { title: "BRIDE & GROOM ENTRANCE" },
    { title: "FIRST DANCE", content: "Bride & Groom" },
    { title: "M.C. OPENING REMARKS", content: "Overseer Rupert Hull" },
    { title: "BLESSING OF THE MEAL", content: "Rev. David Roomes" },
    { title: "DINNER" },
    { title: "(Live music for first half of dinner, DJ music for second half)", center: true },
    { title: "FATHER & DAUGHTER DANCE", content: "Bride & Father" },
    { title: "MOTHER & SON DANCE", content: "Groom & Mother" },
    { title: "UNVIELING OF CAKE", content: "Mothers of Bride and Groom" },
    { title: "BLESSING OF CAKE", content: "Pastor Kirk Davis" },
    { title: "CUTTING OF CAKE", content: "Bride & Groom" },
    { title: "LIVE MUSIC SELECTION", content: "Gelayne Anderson" },
    { title: "TOAST TO THE BRIDE", content: "Gelayne Anderson" },
    { title: "TOAST TO THE GROOM", content: "Quincy Matthews" },
    { title: "TOAST TO THE BRIDE'S PARENTS TOAST", content: "Stacy Davis" },
    { title: "TO THE GROOM'S PARENTS", content: "Vivette White" },
    { title: "LIVE MUSIC SELECTION", content: "Bride & Groom" },
    { title: "WEDDING SHOE GAME", content: "Bride & Groom" },
    { title: "REMOVAL & TOSSING OF GARTER", content: "Groom" },
    { title: "TOSSING OF BOUQUET", content: "Bride" },
    { title: "VOTE OF THANKS", content: "Bride & Groom" },
    { title: "OPEN DANCE FLOOR" },
  ];
  const bridalParty: Array<ProgramElement> = [
    { title: "BRIDE", content: "Rochelle Annikie Henry" },
    { title: "GROOM", content: "Terrence Junior Matthews" },
    { title: "MAID OF HONOUR", content: "Gelayne Anderson" },
    { title: "BESTMAN", content: "Quincy Matthews" },
    { title: "BRIDESMAID", content: "Keisha Gardner" },
    { title: "RING BEARER", content: "Annastacia Davis" },
    { title: "PAGE BOY", content: "Tierra Matthews" },
    { title: "MINI BRIDE", content: "Stacia-Kae Davis" },
  ];
  const sections: Array<ProgramSection> = [
    { title: "Ceremony", content: cerimony },
    { title: "Reception", content: reception },
    { title: "Bridal Party", content: bridalParty },
  ];
  return { cerimony, reception, sections };
};

class ProgramElement {
  title: string = "";
  center?: boolean = false;
  skipTitling?: boolean = false;
  content?: string;
  subtitle?: string;
}

type ProgramSection = {
  title: string;
  content: Array<ProgramElement>;
};
