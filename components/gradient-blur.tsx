"use client"

import { useEffect, useRef } from "react"

interface FloatingOrbsAnimationProps {
  className?: string
  numBlobs?: number
  numCenters?: number
  blurAmount?: number
}

export default function GradientBlur({
  className = "",
  numBlobs = 50,
  numCenters = 8,
  blurAmount = 60,
}: FloatingOrbsAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(null)
  const blobsRef = useRef<any[]>([])
  const orbitCentersRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Rainbow spectrum colors
    const colors = [
      ["#FF1493", "#FF1493"], // Hot Pink
      ["#FF4500", "#FF4500"], // Orange Red
      ["#FFD700", "#FFD700"], // Gold
      ["#ADFF2F", "#ADFF2F"], // Green Yellow
      ["#00FFFF", "#00FFFF"], // Cyan
      ["#00BFFF", "#00BFFF"], // Sky Blue
      ["#8A2BE2", "#8A2BE2"], // Purple Violet
      ["#DA70D6", "#DA70D6"], // Orchid
    ]

    function resizeCanvas() {
      if (!canvas) return
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      canvas.style.filter = `blur(${blurAmount}px)`
    }

    function shuffleArray(array: any[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
    }

    function setup() {
      if (!canvas) return

      orbitCentersRef.current = []
      blobsRef.current = []

      // Create centers distributed across the canvas in a grid pattern
      const cols = Math.ceil(Math.sqrt(numCenters))
      const rows = Math.ceil(numCenters / cols)
      const marginX = canvas.width * 0.15 // 15% margin on sides
      const marginY = canvas.height * 0.15 // 15% margin on top/bottom
      const spacingX = (canvas.width - 2 * marginX) / (cols - 1)
      const spacingY = (canvas.height - 2 * marginY) / (rows - 1)

      for (let i = 0; i < numCenters; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)

        // Add some randomness to avoid perfect grid
        const offsetX = (Math.random() - 0.5) * spacingX * 0.3
        const offsetY = (Math.random() - 0.5) * spacingY * 0.3

        orbitCentersRef.current.push({
          x: marginX + col * spacingX + offsetX,
          y: marginY + row * spacingY + offsetY,
        })
      }

      const blobsPerColor = Math.ceil(numBlobs / colors.length)
      const colorPool: string[][] = []

      colors.forEach((color) => {
        for (let i = 0; i < blobsPerColor; i++) {
          colorPool.push(color)
        }
      })

      shuffleArray(colorPool)

      for (let i = 0; i < numBlobs; i++) {
        const centerIndex = i % numCenters // Distribute blobs evenly across centers
        const center = orbitCentersRef.current[centerIndex]
        const angle = Math.random() * Math.PI * 2
        const orbitRadius = 40 + Math.random() * 150 // Adjusted orbit radius

        blobsRef.current.push({
          angle,
          speed: (Math.random() * 0.03 + 0.006) * (Math.random() > 0.5 ? 1 : -1), // Increased speed
          orbitRadius,
          radius: 50 + Math.random() * 120, // Maintained blob size
          centerX: center.x,
          centerY: center.y,
          color: colorPool[i % colorPool.length],
        })
      }
    }

    function drawBlob(x: number, y: number, r: number, c1: string, c2: string) {
      if (!ctx) return

      const gradient = ctx.createLinearGradient(x - r, y - r, x + r, y + r)
      gradient.addColorStop(0, c1)
      gradient.addColorStop(1, c2)

      ctx.globalAlpha = 0.7
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      blobsRef.current.forEach((blob) => {
        blob.angle += blob.speed
        const x = blob.centerX + blob.orbitRadius * Math.cos(blob.angle)
        const y = blob.centerY + blob.orbitRadius * Math.sin(blob.angle)
        drawBlob(x, y, blob.radius, blob.color[0], blob.color[1])
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    function handleResize() {
      resizeCanvas()
      setup()
    }

    // Initialize
    resizeCanvas()
    setup()
    animate()

    // Add resize listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [numBlobs, numCenters, blurAmount])

  return (
    <canvas
      ref={canvasRef}
      className={`h-[150px] rounded-full ${className}`}
    />
  )
}