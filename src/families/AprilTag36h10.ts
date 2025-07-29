import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { Tag36h10 } from "./binaryCodeLists/Tag36h10";

const LAYOUT = createLayout(
  [
    "wwwwwwwwww",
    "wbbbbbbbbw",
    "wbddddddbw",
    "wbddddddbw",
    "wbddddddbw",
    "wbddddddbw",
    "wbddddddbw",
    "wbddddddbw",
    "wbbbbbbbbw",
    "wwwwwwwwww",
  ],
  Tag36h10
);

export class AprilTag36h10 extends AprilTag {
  /**
   * The name of this AprilTag family, "36h10".
   */
  public readonly familyName = "36h10";
  /**
   * The maximum ID in this family (exclusive). Codes for 36h10 range from 0 to 2320.
   */
  public readonly maxId = 2320;
  public readonly size = 10;

  protected readonly layout = LAYOUT;
}
