import { Layout } from "./createLayout";

type Bit = "b" | "w" | "x";
interface RenderOptions {
  blackColor?: string;
  whiteColor?: string;
}

interface PathRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export abstract class AprilTag {
  public abstract readonly familyName: string;
  public abstract readonly maxId: number;

  /**
   * All AprilTags are square, so this is both the width and height of the tag in cells.
   */
  public abstract readonly size: number;

  protected abstract readonly layout: Layout;

  /**
   * @returns `true` if the given ID has a valid code in this AprilTag family.
   */
  public isIdInRange(id: number): boolean {
    return id >= 0 && id < this.maxId;
  }

  protected assertIdInRange(id: number): void {
    if (!this.isIdInRange(id)) {
      throw new Error(
        `Invalid ID: ${id}. IDs in AprilTag family ${this.familyName} range from 0 (inclusive) to ${this.maxId} (exclusive).`
      );
    }
  }

  /**
   * Gets a bitmap representation of the AprilTag for the given ID in this family.
   *
   * This is useful if you want to build your own renderer, rather than using one of the ones provided.
   *
   * The bitmap is represented as a square 2d array of values. Each value represents one "cell" on the AprilTag,
   * where "w" is white, "b" is black, and "x" is transparent. You can index the grid using [y][x] to get the value
   * for that cell on the tag.
   *
   * @throws If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
   */
  public getBitmap(id: number): Bit[][] {
    this.assertIdInRange(id);

    if (this.layout.render === "simple") {
      return this.getSimpleBitmap(id);
    }
    return this.getRotatedQuadrantsBitmap(id);
  }

  private getSimpleBitmap(id: number): Bit[][] {
    const result: Bit[][] = [];
    let code = this.layout.codes[id];

    for (let y = 0; y < this.size; y++) {
      const row: Bit[] = [];
      for (let x = 0; x < this.size; x++) {
        const bit = this.renderBit(code, this.layout.pattern[y][x]);
        code = bit.code;
        row.push(bit.value);
      }
      result.push(row);
    }

    return result;
  }

  private getRotatedQuadrantsBitmap(id: number): Bit[][] {
    const size = this.size;
    const pattern = this.layout.pattern;
    let code: bigint = this.layout.codes[id];

    let result: Bit[][] = Array.from({ length: size }, () =>
      new Array(size).fill(false)
    );

    for (let i = 0; i < 4; i++) {
      result = this.rotate90(result);

      for (let y = 0; y <= Math.floor(size / 2); y++) {
        for (let x = y; x < size - 1 - y; x++) {
          const bit = this.renderBit(code, pattern[y][x]);
          code = bit.code;
          result[y][x] = bit.value;
        }
      }
    }

    if (size % 2 === 1) {
      const mid = Math.floor(size / 2);
      result[mid][mid] = this.renderBit(code, pattern[mid][mid]).value;
    }

    return this.rotate90(result);
  }

  private rotate90<T>(input: T[][]): T[][] {
    const size = input.length;
    const output: T[][] = Array.from({ length: size }, () => new Array(size));
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        output[size - 1 - x][y] = input[y][x];
      }
    }
    return output;
  }

  private renderBit(code: bigint, type: string): { code: bigint; value: Bit } {
    if (type === "d") {
      return {
        code: code << 1n,
        value:
          (code & (1n << BigInt(this.layout.bitCount - 1))) === 0n ? "b" : "w",
      };
    }

    return { code, value: type as Bit };
  }

  /**
   * Renders a given tag ID to a Unicode string that you can use in e.g. a CLI or terminal.
   *
   * This example shows an AprilTag16h5, but it is representative of the style of textual output:
   * ```
   *
   *  ██████
   *  ███ ██
   *  ███  █
   *  ████ █
   *  █ █  █
   *  ██████
   *
   *
   * ```
   * @throws If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
   */
  public renderToText(id: number): string {
    return this.getBitmap(id)
      .map((row) => row.map((cell) => (cell === "b" ? "█" : " ")).join(""))
      .join("\n");
  }

  /**
   * Renders the tag for a given ID onto a canvas. Works with both HTML5 canvases on web, and with the "canvas" package for node.
   *
   * ## Drawing the tag across the entire canvas
   *
   * By default, it fills the entire canvas with the tag, scaling up/down to fit. Note that it will not stretch the tag: as such,
   * non-square canvases or canvases that aren't a multiple of {@link size} will throw an error.
   *
   * ```
   * const canvas = document.createElement("canvas");
   * canvas.width = 80;
   * canvas.height = 80;
   *
   * aprilTagFamily.renderToCanvas(0, canvas); // where 0 is the tag id
   * ```
   *
   * ## Drawing the tag to a portion of the canvas
   *
   * You can choose to draw the tag to a portion of the canvas by passing a `position` option. In this case, it will leave the rest
   * of the canvas untouched.
   *
   * ```
   * aprilTagFamily.renderToCanvas(0, canvas, { position: { x: 1, y: 1, size: 80 } }); // where 0 is the tag id
   * ```
   *
   * Every item in `position` is required. The top-left corner of the tag will be placed at the position represented by (x,y ).
   * The size of the tag (width and height) will be equal to `size` --- and, as such, if the given size is not a multiple of
   * {@link size}, then an error will be thrown.
   *
   * ## Changing the colours
   *
   * You can also pass in one or more of the optional `blackColor`, `whiteColor` and `transparentColor` options to change the
   * respective colours. The transparent colour is only used for the cutouts present in some tag families: Circle21h7,
   * Circle49h12, and Custom48h12.
   *
   * ```
   * aprilTagFamily.renderToCanvas(0, canvas, { blackColor: "red", whiteColor: "blue" }); // where 0 is the tag id
   * ```
   *
   * ## Generating a PNG
   *
   * Here is a quick example of how you could use this to make an AprilTag PNG using node-canvas:
   *
   * @example
   * const canvas = createCanvas(80, 80);
   * new AprilTag16h5().renderToCanvas(0, canvas); // where 0 is the tag id
   * const png = canvas.toBuffer();
   * fs.writeFileSync("test.png", png);
   *
   * @param id The tag ID to render
   * @param canvas Either a HTML5 canvas, or a canvas object from node-canvas
   * @param options Options for colours and positioning, as described above. Optional.
   * @throws
   *   - If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
   *   - If the canvas is not square or its size is not a multiple of the {@link size} --- or same for the position option
   *     when in use.
   *   - If a 2d canvas context cannot be obtained.
   */
  public renderToCanvas(
    id: number,
    canvas: {
      width: number;
      height: number;
      getContext: (context: "2d") => any;
    },
    options?: RenderOptions & {
      position?: { x: number; y: number; size: number };
    }
  ) {
    const left = options?.position?.x ?? 0;
    const top = options?.position?.y ?? 0;
    const width = options?.position?.size ?? canvas.width;
    const height = options?.position?.size ?? canvas.height;

    if (width !== height) {
      throw new Error("Canvas must be square");
    }
    if (width % this.size !== 0) {
      throw new Error(
        `Canvas size must be a multiple of the tag size (${this.size})`
      );
    }

    const bitmap = this.getBitmap(id);

    const size = width;
    const cellSize = size / this.size;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) throw new Error("Failed to get canvas context");

    const { blackPath, whitePath } = this.getPathRects(
      bitmap,
      top,
      left,
      cellSize
    );

    ctx.fillStyle = options?.blackColor ?? "black";
    this.drawPath(blackPath, ctx);

    ctx.fillStyle = options?.whiteColor ?? "white";
    this.drawPath(whitePath, ctx);
  }

  private getPathRects(
    bitmap: Bit[][],
    top: number,
    left: number,
    cellSize: number
  ): {
    blackPath: PathRect[];
    whitePath: PathRect[];
  } {
    const blackPath: PathRect[] = [];
    const whitePath: PathRect[] = [];

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const rect: PathRect = {
          x: left + x * cellSize,
          y: top + y * cellSize,
          width: cellSize,
          height: cellSize,
        };

        switch (bitmap[y][x]) {
          case "b":
            blackPath.push(rect);
            break;
          case "w":
            whitePath.push(rect);
            break;
        }
      }
    }

    return { blackPath, whitePath };
  }

  private drawPath(path: PathRect[], ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    for (const rect of path) {
      ctx.rect(rect.x, rect.y, rect.width, rect.height);
    }
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Render the tag for a given ID as an SVG string.
   *
   * You can adjust the colours using the optional second parameter.
   *
   * @throws If the ID is not in range. You can use {@link isIdInRange} or {@link maxId} to check if an ID is valid first.
   */
  public renderToSvg(id: number, options?: RenderOptions): string {
    const bitmap = this.getBitmap(id);
    const { blackPath, whitePath } = this.getPathRects(bitmap, 0, 0, 1);

    const black = options?.blackColor ?? "#000";
    const white = options?.whiteColor ?? "#fff";

    const blackPathSvg = this.createSvgPath(blackPath);
    const whitePathSvg = this.createSvgPath(whitePath);

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.size} ${this.size}">` +
      `<path d="${blackPathSvg}" fill="${black}"/>` +
      `<path d="${whitePathSvg}" fill="${white}"/>` +
      `</svg>`
    );
  }

  private createSvgPath(path: PathRect[]): string {
    return path
      .map(
        ({ x, y, width, height }) =>
          `M${x},${y}` + // Move to absolute position (x,y)
          `v${height}` + // Draw a vertical line down by relative (height)
          `h${width}` + // Draw a horizontal line right by relative (width)
          `v${-height}` + // Draw a vertical line up by relative (-height)
          `z` // Return to the point of the previous move instruction
      )
      .join("");
  }
}
