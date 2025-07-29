export function decodeTagFamily(base64Family: string): bigint[] {
  const arrayBuffer = base64ToArrayBuffer(base64Family);

  const view = new DataView(arrayBuffer);
  const tags = [];

  for (let i = 0; i < arrayBuffer.byteLength; i += 8) {
    const littleEndian = false;
    tags.push(view.getBigUint64(i, littleEndian));
  }

  return tags;
}

function base64ToArrayBuffer(base64Family: string): ArrayBuffer {
  if (typeof Buffer !== "undefined") {
    // Node.js
    const buffer = Buffer.from(base64Family, "base64");
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  }

  // Web
  const binaryString = atob(base64Family);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array.buffer;
}
