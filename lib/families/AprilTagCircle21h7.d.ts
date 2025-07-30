import { A as AprilTag, L as Layout } from '../AprilTag-O5k2LP1M.js';

declare class AprilTagCircle21h7 extends AprilTag {
    /**
     * The name of this AprilTag family, "Circle21h7".
     */
    readonly familyName = "Circle21h7";
    /**
     * The maximum ID in this family (exclusive). Codes for Circle21h7 range from 0 to 38.
     */
    readonly maxId = 38;
    readonly size = 9;
    protected readonly layout: Layout;
}

export { AprilTagCircle21h7 };
