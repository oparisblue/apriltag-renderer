import { decodeTagFamily } from "./decodeTagFamily";

export interface Layout {
  /** b=always black, w=always white, x=transparent (also white), d=data */
  pattern: string[];
  bitCount: number;
  codes: bigint[];
  render: "simple" | "rotatedQuadrants";
}

export function createLayout(
  pattern: string[],
  rawFamily: string,
  render: "simple" | "rotatedQuadrants" = "simple"
): Layout {
  return {
    pattern,
    bitCount: pattern.join("").match(/d/g)?.length ?? 0,
    codes: decodeTagFamily(rawFamily),
    render,
  };
}
