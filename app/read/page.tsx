"use client"

import { useState, useEffect, useRef, useCallback, type JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { articleContent } from "@/utils/data"
import { Footer } from "@/components/footer"

// Dynamically import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(() => import("react-pageflip").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96">Loading flipbook...</div>,
})

// TypeScript Interfaces
export interface ContentBlock {
  type: "title" | "author" | "date" | "heading" | "paragraph" | "image" | "quote" | "list"
  text?: string
  level?: number
  src?: string
  alt?: string
  caption?: string
  author?: string
  items?: string[]
  split?: boolean
}

interface PageContent {
  id: number
  type: "cover" | "article" | "content"
  blocks: ContentBlock[]
}

interface FlipbookControlsProps {
  onPrevPage: () => void
  onNextPage: () => void
  canGoPrev: boolean
  canGoNext: boolean
  currentPage: number
  totalPages: number
}

interface FlipBookRef {
  pageFlip(): {
    flipNext(): void
    flipPrev(): void
    flip(pageNum: number): void
    getCurrentPageIndex(): number
    getPageCount(): number
  }
}

// Utility function to split text into chunks that fit on a page
const splitTextBlock = (text: string, isMobile: boolean): [string, string] => {
  const words = text.split(" ")
  // Adjust split point based on screen size
  const splitRatio = isMobile ? 0.6 : 0.5 // Split earlier on mobile for better fit
  const midPoint = Math.floor(words.length * splitRatio)
  const firstPart = words.slice(0, midPoint).join(" ")
  const secondPart = words.slice(midPoint).join(" ")
  return [firstPart, secondPart]
}

export default function ReadMagazine() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 })
  const [canGoNext, setCanGoNext] = useState(true)
  const [canGoPrev, setCanGoPrev] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const flipBookRef = useRef<FlipBookRef | null>(null)

  useEffect(() => {
    console.log(isMobile)
  },[isMobile])

  // Sample magazine pages data with structured content blocks
  const generatePages = (): PageContent[] => {
    const pages: PageContent[] = []
    let currentPageBlocks: ContentBlock[] = []
    let currentHeight = 0

    // Adjust page height based on screen size
    const pageHeight = isMobile ? dimensions.height * 0.7 : dimensions.height * 0.8
    const lineHeight = isMobile ? 20 : 24
    const blockMargins = isMobile ? 12 : 16

    // Cover page
    pages.push({
      id: 0,
      type: "cover",
      blocks: [{ type: "image", src: "/cover.png", alt: "Magazine Cover" }],
    })

    // Process content blocks and split them across pages as needed
    for (const block of articleContent) {
      let blockHeight = 0

      // Estimate block height with mobile adjustments
      switch (block.type) {
        case "title":
          blockHeight = isMobile ? 36 : 48
          if (currentPageBlocks.length > 0) {
            pages.push({
              id: pages.length,
              type: "article",
              blocks: currentPageBlocks,
            })
            currentPageBlocks = []
            currentHeight = 0
          }
          break
        case "author":
          blockHeight = isMobile ? 20 : 24
          break
        case "heading":
          blockHeight = isMobile ? (block.level === 2 ? 28 : 24) : block.level === 2 ? 32 : 28
          break
        case "paragraph":
          const words = block.text?.split(/\s+/)?.length || 0
          const wordsPerLine = isMobile ? 8 : 10
          const lines = Math.ceil(words / wordsPerLine)
          blockHeight = lines * lineHeight
          break
        case "image":
          blockHeight = isMobile ? 180 : 250
          break
        case "quote":
          blockHeight = isMobile ? 60 : 80
          break
        case "list":
          blockHeight = (block.items?.length || 0) * (isMobile ? 24 : 28)
          break
        default:
          blockHeight = isMobile ? 32 : 40
      }

      // Check if block fits in current page
      if (currentHeight + blockHeight + blockMargins > pageHeight) {
        // For paragraphs, try to split them
        if (block.type === "paragraph" && blockHeight > lineHeight * 3) {
          const [firstPart, secondPart] = splitTextBlock(block.text || "", isMobile)

          // Add first part to current page
          currentPageBlocks.push({
            ...block,
            text: firstPart,
            split: true,
          })

          // Create new page with remaining content
          if (currentPageBlocks.length > 0) {
            pages.push({
              id: pages.length,
              type: "article",
              blocks: currentPageBlocks,
            })
          }

          // Start new page with second part
          currentPageBlocks = [
            {
              ...block,
              text: secondPart,
              split: true,
            },
          ]
          currentHeight = blockHeight / 2
        } else {
          // Push current page and start new one
          if (currentPageBlocks.length > 0) {
            pages.push({
              id: pages.length,
              type: "article",
              blocks: currentPageBlocks,
            })
          }
          currentPageBlocks = [block]
          currentHeight = blockHeight
        }
      } else {
        // Add block to current page
        currentPageBlocks.push(block)
        currentHeight += blockHeight + blockMargins
      }
    }

    // Add remaining blocks to last page
    if (currentPageBlocks.length > 0) {
      pages.push({
        id: pages.length,
        type: "article",
        blocks: currentPageBlocks,
      })
    }

    return pages
  }

  const [pages, setPages] = useState<PageContent[]>([])

  useEffect(() => {
    setIsLoaded(true)

    // Handle responsive dimensions
    const updateDimensions = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const isMobileDevice = screenWidth < 768

      setIsMobile(isMobileDevice)

      let width, height

      if (isMobileDevice) {
        // Mobile dimensions - use most of the screen width but leave some margin
        width = Math.min(screenWidth - 32, 350) // Max 350px on mobile
        height = Math.min(screenHeight * 0.7, width * 1.4) // Shorter aspect ratio for mobile
      } else if (screenWidth < 1024) {
        // Tablet dimensions
        width = Math.min(screenWidth - 80, 450)
        height = width * 1.5
      } else {
        // Desktop dimensions
        width = Math.min(screenWidth - 100, 500)
        height = width * 1.5
      }

      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Regenerate pages when dimensions or mobile state changes
  useEffect(() => {
    if (dimensions.width > 0) {
      setPages(generatePages())
    }
  }, [dimensions, isMobile])

  const totalPages = pages.length

  // Update navigation buttons state when page changes
  useEffect(() => {
    if (flipBookRef.current) {
      setCanGoPrev(currentPage > 0)
      setCanGoNext(currentPage < totalPages - 1)
    }
  }, [currentPage, totalPages])

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNextPage()
      } else if (event.key === "ArrowLeft") {
        handlePrevPage()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentPage])

  const handleNextPage = useCallback(() => {
    if (flipBookRef.current && canGoNext) {
      flipBookRef.current.pageFlip().flipNext()
    }
  }, [canGoNext])

  const handlePrevPage = useCallback(() => {
    if (flipBookRef.current && canGoPrev) {
      flipBookRef.current.pageFlip().flipPrev()
    }
  }, [canGoPrev])

  const onPageChange = useCallback(
    (e: { data: number }) => {
      const newPage = e.data
      setCurrentPage(newPage)
      setCanGoPrev(newPage > 0)
      setCanGoNext(newPage < totalPages - 1)
    },
    [totalPages],
  )

  const renderBlock = (block: ContentBlock, index: number, pageContent: PageContent) => {
    // Special case for title/author pages - center everything
    const isTitlePage =
      pageContent.blocks.some((b) => b.type === "title") && pageContent.blocks.some((b) => b.type === "author")

    // Add continuation indicator for split paragraphs
    const isContinuation = block.split && index === 0

    // Responsive text sizes
    const titleSize = isMobile ? "text-lg md:text-xl" : "text-xl md:text-2xl"
    const headingSize = isMobile ? "text-base" : "text-lg"
    const textSize = isMobile ? "text-sm" : "text-base"
    const smallTextSize = isMobile ? "text-xs" : "text-sm"

    switch (block.type) {
      case "title":
        return (
          <h2
            key={index}
            className={`${titleSize} font-bold text-[#486069] text-center leading-tight ${isTitlePage ? "mt-auto" : "mb-3"}`}
          >
            {block.text}
          </h2>
        )

      case "author":
        return (
          <p
            key={index}
            className={`text-center text-[#486069] italic ${textSize} ${isTitlePage ? "mb-auto" : "mb-2"}`}
          >
            By {block.text}
          </p>
        )

      case "date":
        return (
          <p key={index} className={`text-center text-[#486069] ${smallTextSize} mb-3`}>
            {block.text}
          </p>
        )

      case "heading":
        const HeadingTag = `h${block.level || 3}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag
            key={index}
            className={`font-bold mt-3 mb-2 text-[#2C5F7A] leading-tight ${block.level === 2 ? headingSize : textSize}`}
          >
            {block.text}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <div key={index}>
            {isContinuation && (
              <p className={`${smallTextSize} italic text-[#486069] mb-1`}>(continued from previous page)</p>
            )}
            <p className={`text-[#1F2937] mb-2 leading-relaxed ${textSize}`}>{block.text}</p>
          </div>
        )

      case "image":
        return (
          <div
            key={index}
            className={`relative ${pageContent.type === "cover" ? "w-full h-full" : "my-3 flex flex-col items-center"}`}
          >
            <div
              className={`relative ${
                pageContent.type === "cover"
                  ? "w-full h-full"
                  : isMobile
                    ? "w-full max-w-[200px] h-32"
                    : "w-full max-w-xs h-40"
              }`}
            >
              <Image
                src={pageContent.type === "cover" ? "/cover.png" : `/${block.src}` || "/placeholder.svg"}
                alt={block.alt || ""}
                fill
                className="object-contain rounded-lg"
                sizes={isMobile ? "200px" : "300px"}
              />
            </div>
            {block.caption && (
              <p className={`${smallTextSize} italic text-center mt-1 text-[#486069] leading-tight`}>{block.caption}</p>
            )}
          </div>
        )

      case "quote":
        return (
          <div key={index} className={`border-l-2 border-[#FBD86D] pl-3 my-3 italic text-[#1F2937] ${textSize}`}>
            <p className="mb-1">&quot;{block.text}&quot;</p>
            {block.author && <p className="text-right">{`— ${block.author}`}</p>}
          </div>
        )

      case "list":
        return (
          <ul key={index} className={`list-disc pl-4 my-2 text-[#1F2937] ${textSize}`}>
            {block.items?.map((item, i) => (
              <li key={i} className="mb-1 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )

      default:
        return null
    }
  }

  const renderPage = (pageContent: PageContent, isLeft = false) => {
    const isTitlePage =
      pageContent.blocks.some((b) => b.type === "title") && pageContent.blocks.some((b) => b.type === "author")

    return (
      <div className={`page-content h-full ${isLeft ? "page-left" : "page-right"}`}>
        <div
          className={`h-full bg-[#F9F5EB] border-2 border-[#2C5F7A] rounded-lg shadow-lg ${
            isMobile ? "p-3" : "p-4 md:p-6"
          } flex flex-col ${isTitlePage ? "justify-center" : ""} overflow-hidden`}
        >
          <div className={`flex-1 overflow-hidden ${isTitlePage ? "flex flex-col justify-center" : ""}`}>
            {pageContent.blocks.map((block, index) => renderBlock(block, index, pageContent))}
          </div>

          {/* Page Footer - hidden on title pages */}
          {!isTitlePage && (
            <div className="mt-auto pt-2 border-t border-[#FBD86D]/30 flex-shrink-0">
              <div className="flex justify-between items-center">
                <span className={`${isMobile ? "text-xs" : "text-xs"} text-[#486069]`}>The Aevum</span>
                <span className={`${isMobile ? "text-xs" : "text-xs"} text-[#486069] font-medium`}>
                  Page {pageContent.id + 1}
                </span>
              </div>
              <div className="flex justify-center mt-1">
                <svg width={isMobile ? "80" : "100"} height="8" viewBox="0 0 100 8" className="text-[#FBD86D]">
                  <path
                    d="M0 4 L10 1 L20 7 L30 1 L40 7 L50 1 L60 7 L70 1 L80 7 L90 1 L100 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F5EB] to-[#E5E7EB] font-['Comic_Neue',_'Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-[#2C5F7A] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center">
          <Link
            href="/"
            className="text-[#FBD86D] text-base sm:text-lg font-bold hover:text-[#FCD34D] transition-colors duration-300 mb-2 sm:mb-0"
          >
            ← Back to Home
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBD86D] text-center my-2 sm:my-0">
            The Aevum Reader
          </h1>
          <div className="text-[#FBD86D] text-sm">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      </header>

      {/* Flipbook Container */}
      <main className="flex-1 py-4 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Instructions */}
          <div className="text-center mb-4">
            <p className="text-[#486069] text-sm mb-2">
              {isMobile ? "Tap to flip pages" : "Use arrow keys or buttons to flip pages"}
            </p>
            {!isMobile && (
              <div className="flex justify-center space-x-3 text-xs text-[#1F2937]">
                <span>← Previous Page</span>
                <span>Next Page →</span>
              </div>
            )}
          </div>

          {/* Flipbook */}
          <div
            className={`flipbook-container relative transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex justify-center">
              {typeof window !== "undefined" && pages.length > 0 && (
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={dimensions.width}
                  height={dimensions.height}
                  size="stretch"
                  minWidth={isMobile ? 280 : 300}
                  maxWidth={isMobile ? 350 : 500}
                  minHeight={isMobile ? 400 : 450}
                  maxHeight={isMobile ? 500 : 750}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  onFlip={onPageChange}
                  className="flipbook shadow-2xl"
                  style={{ width: dimensions.width, height: dimensions.height }}
                  startPage={0}
                  drawShadow={true}
                  flippingTime={600}
                  usePortrait={true}
                  startZIndex={0}
                  autoSize={false}
                  clickEventForward={true}
                  useMouseEvents={!isMobile}
                  swipeDistance={isMobile ? 50 : 30}
                  showPageCorners={!isMobile}
                  disableFlipByClick={false}
                >
                  {pages.map((page, index) => (
                    <div key={page.id} className="page">
                      {renderPage(page, index % 2 === 0)}
                    </div>
                  ))}
                </HTMLFlipBook>
              )}
            </div>
          </div>

          {/* Controls */}
          <FlipbookControls
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            currentPage={currentPage}
            totalPages={totalPages}
            isMobile={isMobile}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

// Flipbook Controls Component
function FlipbookControls({
  onPrevPage,
  onNextPage,
  canGoPrev,
  canGoNext,
  currentPage,
  totalPages,
  isMobile = false,
}: FlipbookControlsProps & { isMobile?: boolean }) {
  return (
    <div className="flex justify-center items-center space-x-3 sm:space-x-6 mt-6">
      {/* Previous Button */}
      <button
        onClick={onPrevPage}
        disabled={!canGoPrev}
        className={`
          ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"} 
          rounded-lg font-bold border-2 shadow transition-all duration-300 transform
          ${
            canGoPrev
              ? "bg-[#FBD86D] text-[#486069] border-[#486069] hover:bg-[#FCD34D] hover:scale-105 hover:shadow-lg active:scale-95"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="flex items-center space-x-1">
          <span>←</span>
          {!isMobile && <span className="hidden sm:inline">Previous</span>}
        </span>
      </button>

      {/* Page Indicator */}
      <div
        className={`bg-[#F9F5EB] ${isMobile ? "px-2 py-1" : "px-3 py-1 sm:px-4 sm:py-2"} rounded-md border-2 border-[#2C5F7A] shadow-sm`}
      >
        <span className={`text-[#486069] font-bold ${isMobile ? "text-xs" : "text-sm sm:text-base"}`}>
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={onNextPage}
        disabled={!canGoNext}
        className={`
          ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"} 
          rounded-lg font-bold border-2 shadow transition-all duration-300 transform
          ${
            canGoNext
              ? "bg-[#FBD86D] text-[#486069] border-[#486069] hover:bg-[#FCD34D] hover:scale-105 hover:shadow-lg active:scale-95"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="flex items-center space-x-1">
          {!isMobile && <span className="hidden sm:inline">Next</span>}
          <span>→</span>
        </span>
      </button>
    </div>
  )
}
