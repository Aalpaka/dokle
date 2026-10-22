import { LeaguePage } from "@/components/Leagues";
import { SkinProvider } from "@/components/skin";
import { skinMetadata, skinOf, type SkinParams } from "../../skin";

type Params = { params: Promise<{ skin: string; code: string }> };

export const generateMetadata = ({ params }: Params) => skinMetadata(params as SkinParams["params"], "Liga");

export default async function SkinLiga({ params }: Params) {
  const skin = await skinOf(params as SkinParams["params"]);
  const { code } = await params;
  return (
    <SkinProvider skin={skin}>
      <LeaguePage code={code.toUpperCase()} />
    </SkinProvider>
  );
}
