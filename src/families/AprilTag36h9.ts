import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { Tag36h9 } from "./binaryCodeLists/Tag36h9";

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
  Tag36h9
);

export class AprilTag36h9 extends AprilTag {
  /**
   * The name of this AprilTag family, "36h9".
   */
  public readonly familyName = "36h9";
  /**
   * The maximum ID in this family (exclusive). Codes for 36h9 range from 0 to 5329.
   */
  public readonly maxId = 5329;
  public readonly size = 10;

  protected readonly layout = LAYOUT;
}
