import { A as AprilTag, L as Layout } from '../AprilTag-O5k2LP1M.js';

declare class AprilTagStandard41h12 extends AprilTag {
    /**
     * The name of this AprilTag family, "Standard41h12".
     */
    readonly familyName = "Standard41h12";
    /**
     * The maximum ID in this family (exclusive). Codes for Standard41h12 range from 0 to 2115.
     */
    readonly maxId = 2115;
    readonly size = 9;
    protected readonly layout: Layout;
}

export { AprilTagStandard41h12 };
