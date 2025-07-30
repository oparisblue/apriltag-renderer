import { A as AprilTag, L as Layout } from '../AprilTag-O5k2LP1M.js';

declare class AprilTag25h9 extends AprilTag {
    /**
   * The name of this AprilTag family, "25h9".
   */
    readonly familyName = "25h9";
    /**
   * The maximum ID in this family (exclusive). Codes for 25h9 range from 0 to 35.
   */
    readonly maxId = 35;
    readonly size = 9;
    protected readonly layout: Layout;
}

export { AprilTag25h9 };
