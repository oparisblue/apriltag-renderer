import { A as AprilTag, L as Layout } from '../AprilTag-O5k2LP1M.js';

declare class AprilTagCustom48h12 extends AprilTag {
    /**
     * The name of this AprilTag family, "Custom48h12".
     */
    readonly familyName = "Custom48h12";
    /**
     * The maximum ID in this family (exclusive). Codes for Custom48h12 range from 0 to 42211.
     */
    readonly maxId = 42211;
    readonly size = 10;
    protected readonly layout: Layout;
}

export { AprilTagCustom48h12 };
