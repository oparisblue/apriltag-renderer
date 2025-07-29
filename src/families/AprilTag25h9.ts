import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { Tag25h9 } from "./binaryCodeLists/Tag25h9";

const LAYOUT = createLayout(
  [
    "wwwwwwwww",
    "wbbbbbbbw",
    "wbdddddbw",
    "wbdddddbw",
    "wbdddddbw",
    "wbdddddbw",
    "wbdddddbw",
    "wbbbbbbbw",
    "wwwwwwwww",
  ],
  Tag25h9
);

export class AprilTag25h9 extends AprilTag {
    /**
   * The name of this AprilTag family, "25h9".
   */
  public readonly familyName = "25h9";
    /**
   * The maximum ID in this family (exclusive). Codes for 25h9 range from 0 to 35.
   */
  public readonly maxId = 35;
  public readonly size = 9;

  protected readonly layout = LAYOUT;
}
