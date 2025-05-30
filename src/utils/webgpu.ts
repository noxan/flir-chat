export interface WebGPUSupportInfo {
  isSupported: boolean;
  reason?: string;
  adapter?: GPUAdapter | null;
}

/**
 * Gets WebGPU support information
 * @returns Promise<WebGPUSupportInfo>
 */
export async function getWebGPUSupportInfo(): Promise<WebGPUSupportInfo> {
  if (!navigator.gpu) {
    return { isSupported: false, reason: 'WebGPU API not available' };
  }

  try {
    const adapter = await navigator.gpu.requestAdapter();
    return adapter
      ? { isSupported: true, adapter }
      : { isSupported: false, reason: 'No WebGPU adapter found' };
  } catch (error) {
    return { isSupported: false, reason: `Adapter request failed: ${error}` };
  }
}

/**
 * Simple WebGPU support check
 * @returns Promise<boolean>
 */
export async function detectWebGPUSupport(): Promise<boolean> {
  return (await getWebGPUSupportInfo()).isSupported;
}
