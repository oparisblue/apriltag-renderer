import { AprilTag } from "../AprilTag";
import { createLayout } from "../createLayout";
import { TagCircle21h7 } from "./binaryCodeLists/TagCircle21h7";

const LAYOUT = createLayout(
  [
    "xxxdddxxx",
    "xbbbbbbbx",
    "xbwwwwwbx",
    "dbwdddwbd",
    "dbwdddwbd",
    "dbwdddwbd",
    "xbwwwwwbx",
    "xbbbbbbbx",
    "xxxdddxxx",
  ],
  TagCircle21h7,
  "rotatedQuadrants"
);

export class AprilTagCircle21h7 extends AprilTag {
  /**
   * The name of this AprilTag family, "Circle21h7".
   */
  public readonly familyName = "Circle21h7";
  /**
   * The maximum ID in this family (exclusive). Codes for Circle21h7 range from 0 to 38.
   */
  public readonly maxId = 38;
  public readonly size = 9;

  protected readonly layout = LAYOUT;
}
