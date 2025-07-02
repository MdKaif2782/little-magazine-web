"use client"

import { useState, useEffect, useRef, useCallback, JSX } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { articleContent } from "@/utils/data"

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
  split?: boolean // Indicates if this block was split across pages
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
const splitTextBlock = (text: string): [string, string] => {
  const words = text.split(' ')
  const midPoint = Math.floor(words.length / 2)
  const firstPart = words.slice(0, midPoint).join(' ')
  const secondPart = words.slice(midPoint).join(' ')
  return [firstPart, secondPart]
}

export default function ReadMagazine() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 })
  const [canGoNext, setCanGoNext] = useState(true)
  const [canGoPrev, setCanGoPrev] = useState(false)
  const flipBookRef = useRef<FlipBookRef | null>(null)

  // Sample magazine pages data with structured content blocks
  const generatePages = (): PageContent[] => {
    const pages: PageContent[] = []
    let currentPageBlocks: ContentBlock[] = []
    let currentHeight = 0
    const pageHeight = dimensions.height * 0.8 // 80% of page height for content
    const lineHeight = 24 // Approximate line height in pixels
    const blockMargins = 16 // Approximate margin between blocks

    // Cover page
pages.push({
  id: 0,
  type: "cover",
  blocks: [
    { type: "image", src: "/cover.png", alt: "Magazine Cover" }
  ],
})


    // Article content

    // Process content blocks and split them across pages as needed
    for (const block of articleContent) {
      let blockHeight = 0

      // Estimate block height
      switch (block.type) {
        case "title":
          blockHeight = 48
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
          blockHeight = 24
          break
        case "heading":
          blockHeight = block.level === 2 ? 32 : 28
          break
        case "paragraph":
          const words = block.text?.split(/\s+/)?.length || 0
          const lines = Math.ceil(words / 10) // Approx 10 words per line
          blockHeight = lines * lineHeight
          break
        case "image":
          blockHeight = 250
          break
        case "quote":
          blockHeight = 80
          break
        case "list":
          blockHeight = (block.items?.length || 0) * 28
          break
        default:
          blockHeight = 40
      }

      // Check if block fits in current page
      if (currentHeight + blockHeight + blockMargins > pageHeight) {
        // For paragraphs, try to split them
        if (block.type === "paragraph" && blockHeight > lineHeight * 3) {
          const [firstPart, secondPart] = splitTextBlock(block.text || '')

          // Add first part to current page
          currentPageBlocks.push({
            ...block,
            text: firstPart,
            split: true
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
          currentPageBlocks = [{
            ...block,
            text: secondPart,
            split: true
          }]
          currentHeight = blockHeight / 2 // Approximate height of second part
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
      const width = Math.min(window.innerWidth - 40, 500)
      const height = width * 1.5
      setDimensions({ width, height })
      setPages(generatePages())
    }
    
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

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
  
  const onPageChange = useCallback((e: { data: number }) => {
    const newPage = e.data
    setCurrentPage(newPage)
    setCanGoPrev(newPage > 0)
    setCanGoNext(newPage < totalPages - 1)
  }, [totalPages])

  const renderBlock = (block: ContentBlock, index: number, pageContent: PageContent) => {
    // Special case for title/author pages - center everything
    const isTitlePage = pageContent.blocks.some(b => b.type === "title") && 
                       pageContent.blocks.some(b => b.type === "author")
    
    // Add continuation indicator for split paragraphs
    const isContinuation = block.split && index === 0
    
    switch (block.type) {
      case "title":
        return (
          <h2 key={index} className={`text-2xl md:text-3xl font-bold text-[#486069] text-center ${isTitlePage ? "mt-auto" : "mb-4"}`}>
            {block.text}
          </h2>
        )
      case "author":
        return (
          <p key={index} className={`text-center text-[#486069] italic ${isTitlePage ? "mb-auto" : "mb-2"}`}>
            By {block.text}
          </p>
        )
      case "date":
        return (
          <p key={index} className="text-center text-[#486069] text-sm mb-4">
            {block.text}
          </p>
        )
      case "heading":
        const HeadingTag = `h${block.level || 3}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={index} className={`font-bold mt-4 mb-2 text-[#2C5F7A] ${
            block.level === 2 ? "text-xl" : "text-lg"
          }`}>
            {block.text}
          </HeadingTag>
        )
      case "paragraph":
        return (
          <div key={index}>
            {isContinuation && (
              <p className="text-xs italic text-[#486069] mb-1">(continued from previous page)</p>
            )}
            <p className="text-[#1F2937] mb-3 leading-relaxed">
              {block.text}
            </p>
          </div>
        )
      case "image":
        return (
          <div
            key={index}
            className={`relative ${pageContent.type === "cover" ? "w-full h-full" : "my-4 flex flex-col items-center"}`}
          >
            <div
              className={`relative ${
                pageContent.type === "cover" ? "w-full h-full" : "w-full max-w-xs h-48 md:h-64"
              }`}
            >

              <Image
                // src={block.src || "/placeholder.svg"}
                src = {pageContent.type === "cover" ? "/cover.png" : "/"+block.src || "/placeholder.svg"}
                alt={block.alt || ""}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            {block.caption && (
              <p className="text-sm italic text-center mt-2 text-[#486069]">
                {block.caption}
              </p>
            )}
          </div>
        )
      case "quote":
        return (
          <div key={index} className="border-l-4 border-[#FBD86D] pl-4 my-4 italic text-[#1F2937]">
            <p className="mb-1">&quot;{block.text}&quot;</p>
            {block.author && <p className="text-right">— {block.author}</p>}
          </div>
        )
      case "list":
        return (
          <ul key={index} className="list-disc pl-5 my-3 text-[#1F2937]">
            {block.items?.map((item, i) => (
              <li key={i} className="mb-1">{item}</li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  const renderPage = (pageContent: PageContent, isLeft = false) => {
    const isTitlePage = pageContent.blocks.some(b => b.type === "title") && 
                       pageContent.blocks.some(b => b.type === "author")
    
    return (
      <div className={`page-content h-full ${isLeft ? "page-left" : "page-right"}`}>
        <div className={`h-full bg-[#F9F5EB] border-2 border-[#2C5F7A] rounded-lg shadow-lg p-4 md:p-6 flex flex-col ${isTitlePage ? "justify-center" : ""}`}>
          <div className={`flex-1 ${isTitlePage ? "flex flex-col justify-center" : ""}`}>
            {pageContent.blocks.map((block, index) => renderBlock(block, index, pageContent))}
          </div>

          {/* Page Footer - hidden on title pages */}
          {!isTitlePage && (
            <div className="mt-auto pt-2 border-t border-[#FBD86D]/30">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#486069]">The Aevum</span>
                <span className="text-xs text-[#486069] font-medium">
                  Page {pageContent.id + 1}
                </span>
              </div>
              <div className="flex justify-center mt-1">
                <svg width="100" height="10" viewBox="0 0 100 10" className="text-[#FBD86D]">
                  <path
                    d="M0 5 L10 2 L20 8 L30 2 L40 8 L50 2 L60 8 L70 2 L80 8 L90 2 L100 5"
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
            className="text-[#FBD86D] text-lg sm:text-xl font-bold hover:text-[#FCD34D] transition-colors duration-300 mb-2 sm:mb-0"
          >
            ← Back to Home
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBD86D] text-center my-2 sm:my-0">
            The Aevum Reader
          </h1>
          <div className="text-[#FBD86D] text-sm sm:text-base">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      </header>

      {/* Flipbook Container */}
      <main className="flex-1 py-6 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Instructions */}
          <div className="text-center mb-4">
            <p className="text-[#486069] text-sm md:text-base mb-2">
              Use arrow keys or buttons to flip pages
            </p>
            <div className="flex justify-center space-x-3 text-xs text-[#1F2937]">
              <span>← Previous Page</span>
              <span>Next Page →</span>
            </div>
          </div>

          {/* Flipbook */}
          <div
            className={`flipbook-container relative transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex justify-center">
              {typeof window !== "undefined" && pages.length > 0 && (
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={dimensions.width}
                  height={dimensions.height}
                  size="stretch"
                  minWidth={300}
                  maxWidth={500}
                  minHeight={450}
                  maxHeight={750}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={false}
                  onFlip={onPageChange}
                  className="flipbook shadow-2xl"
                  style={{}}
                  startPage={0}
                  drawShadow={true}
                  flippingTime={800}
                  usePortrait={true}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
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
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2C5F7A] py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FBD86D] mb-1 text-sm md:text-base">
            © 2025 The Aevum by NeuroNumb. All rights reserved.
          </p>
          <p className="text-white text-xs">A project by Jahangirnagar University CSE</p>
        </div>
      </footer>
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
}: FlipbookControlsProps) {
  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-8 mt-6">
      {/* Previous Button */}
      <button
        onClick={onPrevPage}
        disabled={!canGoPrev}
        className={`
          px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-base border-3 shadow transition-all duration-300 transform
          ${
            canGoPrev
              ? "bg-[#FBD86D] text-[#486069] border-[#486069] hover:bg-[#FCD34D] hover:scale-105 hover:shadow-lg"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="flex items-center space-x-1 sm:space-x-2">
          <span>←</span>
          <span className="hidden sm:inline">Previous</span>
        </span>
      </button>

      {/* Page Indicator */}
      <div className="bg-[#F9F5EB] px-3 py-1 sm:px-4 sm:py-2 rounded-md border-2 border-[#2C5F7A] shadow-sm">
        <span className="text-[#486069] font-bold text-sm sm:text-base">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={onNextPage}
        disabled={!canGoNext}
        className={`
          px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-sm sm:text-base border-3 shadow transition-all duration-300 transform
          ${
            canGoNext
              ? "bg-[#FBD86D] text-[#486069] border-[#486069] hover:bg-[#FCD34D] hover:scale-105 hover:shadow-lg"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="flex items-center space-x-1 sm:space-x-2">
          <span className="hidden sm:inline">Next</span>
          <span>→</span>
        </span>
      </button>
    </div>
  )
}