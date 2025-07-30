import { A as AprilTag, L as Layout } from '../AprilTag-O5k2LP1M.js';

declare class AprilTag36h11 extends AprilTag {
    /**
     * The name of this AprilTag family, "36h11".
     */
    readonly familyName = "36h11";
    /**
     * The maximum ID in this family (exclusive). Codes for 36h11 range from 0 to 587.
     */
    readonly maxId = 587;
    readonly size = 10;
    protected readonly layout: Layout;
}

export { AprilTag36h11 };
