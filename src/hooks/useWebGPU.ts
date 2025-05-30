import { useEffect, useState } from 'react'
import {
  type WebGPUSupportInfo,
  detectWebGPUSupport,
  getWebGPUSupportInfo,
} from '../utils/webgpu'

export function useWebGPU() {
  const [supportInfo, setSupportInfo] = useState<WebGPUSupportInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function checkWebGPUSupport() {
      try {
        const info = await getWebGPUSupportInfo()
        if (mounted) {
          setSupportInfo(info)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error checking WebGPU support:', error)
        if (mounted) {
          setSupportInfo({
            isSupported: false,
            reason: `Error checking WebGPU support: ${error}`,
            adapter: null,
          })
          setIsLoading(false)
        }
      }
    }

    checkWebGPUSupport()

    return () => {
      mounted = false
    }
  }, [])

  return {
    isSupported: supportInfo?.isSupported ?? false,
    reason: supportInfo?.reason ?? null,
    adapter: supportInfo?.adapter ?? null,
    isLoading,
    supportInfo,
  }
}

/**
 * Simple hook that just returns whether WebGPU is supported
 */
export function useWebGPUSupport(): boolean {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    let mounted = true

    detectWebGPUSupport().then((supported) => {
      if (mounted) {
        setIsSupported(supported)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  return isSupported
}
