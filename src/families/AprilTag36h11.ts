import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { Tag36h11 } from "./binaryCodeLists/Tag36h11";

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
  Tag36h11
);

export class AprilTag36h11 extends AprilTag {
  /**
   * The name of this AprilTag family, "36h11".
   */
  public readonly familyName = "36h11";
  /**
   * The maximum ID in this family (exclusive). Codes for 36h11 range from 0 to 587.
   */
  public readonly maxId = 587;
  public readonly size = 10;

  protected readonly layout = LAYOUT;
}
