let pendingImageDeleteId: number | null = null;

export function queueImageDelete(id: number) {
  pendingImageDeleteId = id;
}

export function takePendingImageDelete(): number | null {
  const id = pendingImageDeleteId;
  pendingImageDeleteId = null;
  return id;
}
