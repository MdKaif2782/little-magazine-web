"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(() => import("react-pageflip").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96">Loading flipbook...</div>,
})

// TypeScript Interfaces
interface FlipbookProps {
  pages: PageContent[]
  currentPage: number
  onPageChange: (page: number) => void
}

interface PageContent {
  id: number
  title: string
  content: string
  image?: string
  type: "cover" | "article" | "content"
}

interface FlipbookControlsProps {
  onPrevPage: () => void
  onNextPage: () => void
  canGoPrev: boolean
  canGoNext: boolean
  currentPage: number
  totalPages: number
}

export default function ReadMagazine() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const flipBookRef = useRef<any>(null)

  // Sample magazine pages data
  const pages: PageContent[] = [
    {
      id: 0,
      title: "The Aevum",
      content:
        "Welcome to our first digital issue! Explore the future of technology through the eyes of tomorrow's innovators.",
      image: "/placeholder.svg?height=400&width=300",
      type: "cover",
    },
    {
      id: 1,
      title: "Table of Contents",
      content:
        "Featured Articles:\n\n• Quantum Leap Forward - Page 3\n• Ethics of AI - Page 7\n• Robotics Revolution - Page 11\n• Neural Networks Explained - Page 15\n• The Future of Computing - Page 19",
      type: "content",
    },
    {
      id: 2,
      title: "Quantum Leap Forward",
      content:
        "Quantum computing represents one of the most significant technological breakthroughs of our time. Unlike classical computers that use bits to process information in binary states, quantum computers leverage quantum bits or 'qubits' that can exist in multiple states simultaneously.\n\nThis phenomenon, known as superposition, allows quantum computers to perform complex calculations exponentially faster than traditional computers. Recent advances in quantum error correction and qubit stability have brought us closer to practical quantum applications.",
      image: "/placeholder.svg?height=300&width=250",
      type: "article",
    },
    {
      id: 3,
      title: "Quantum Applications",
      content:
        "The applications of quantum computing span across multiple industries:\n\n• Cryptography: Breaking current encryption methods while creating quantum-safe alternatives\n• Drug Discovery: Simulating molecular interactions for pharmaceutical research\n• Financial Modeling: Optimizing portfolios and risk assessment\n• Weather Prediction: Processing vast amounts of atmospheric data\n• Artificial Intelligence: Accelerating machine learning algorithms\n\nMajor tech companies like IBM, Google, and Microsoft are investing billions in quantum research, with Google claiming 'quantum supremacy' in 2019.",
      image: "/placeholder.svg?height=300&width=250",
      type: "article",
    },
    {
      id: 4,
      title: "Ethics of AI",
      content:
        "As artificial intelligence becomes increasingly integrated into our daily lives, the ethical implications of AI development have never been more critical. From algorithmic bias to privacy concerns, the AI community faces unprecedented challenges in creating responsible technology.\n\nKey ethical considerations include:\n• Transparency in AI decision-making\n• Fairness and bias mitigation\n• Privacy and data protection\n• Accountability for AI actions\n• The impact on employment and society",
      image: "/placeholder.svg?height=300&width=250",
      type: "article",
    },
    {
      id: 5,
      title: "AI Governance",
      content:
        "Establishing proper governance frameworks for AI development is essential for ensuring these powerful technologies benefit humanity. Organizations worldwide are developing AI ethics guidelines and regulatory frameworks.\n\nThe European Union's AI Act, proposed in 2021, aims to regulate AI systems based on their risk levels. Similarly, companies are establishing AI ethics boards and implementing responsible AI practices in their development processes.\n\nThe future of AI depends on our ability to balance innovation with responsibility, ensuring that artificial intelligence serves as a tool for human flourishing rather than a source of harm.",
      image: "/placeholder.svg?height=300&width=250",
      type: "article",
    },
    {
      id: 6,
      title: "Robotics Revolution",
      content:
        "The field of robotics is experiencing unprecedented growth, with applications spanning from industrial automation to personal assistance. Modern robots are becoming more sophisticated, incorporating advanced AI, computer vision, and natural language processing capabilities.\n\nBreakthroughs in robotics include:\n• Collaborative robots (cobots) working alongside humans\n• Autonomous vehicles and delivery systems\n• Medical robots performing precise surgeries\n• Service robots in hospitality and retail\n• Exploration robots for space and deep-sea missions",
      image: "/placeholder.svg?height=300&width=250",
      type: "article",
    },
    {
      id: 7,
      title: "Future of Robotics",
      content:
        "The next decade promises even more exciting developments in robotics. Soft robotics, inspired by biological systems, will enable robots to interact more safely with humans and navigate complex environments.\n\nBio-inspired designs are leading to robots that can:\n• Adapt to changing environments\n• Self-repair and maintain themselves\n• Learn from experience and improve performance\n• Collaborate effectively with human teams\n\nAs robotics technology continues to advance, we're moving toward a future where robots will be seamlessly integrated into our homes, workplaces, and communities.",
      image: "/placeholder.svg?height=300&width=250",
      type: "article",
    },
  ]

  const totalPages = Math.ceil(pages.length / 2)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
    if (flipBookRef.current && currentPage < totalPages - 1) {
      flipBookRef.current.pageFlip().flipNext()
    }
  }, [currentPage, totalPages])

  const handlePrevPage = useCallback(() => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev()
    }
  }, [currentPage])

  const onPageChange = useCallback((e: any) => {
    setCurrentPage(e.data)
  }, [])

  const renderPage = (pageContent: PageContent, isLeft = false) => (
    <div className={`page-content h-full ${isLeft ? "page-left" : "page-right"}`}>
      <div className="h-full bg-[#F9F5EB] border-2 border-[#2C5F7A] rounded-lg shadow-lg p-6 flex flex-col">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-4 border-b-2 border-[#FBD86D] pb-2">
          <h2 className="text-2xl font-bold text-[#486069] font-['Comic_Neue',_'Comic_Sans_MS',_cursive]">
            {pageContent.title}
          </h2>
          <span className="text-sm text-[#486069] font-semibold">Page {pageContent.id + 1}</span>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col">
          {pageContent.image && (
            <div className="mb-4 flex justify-center">
              <Image
                src={pageContent.image || "/placeholder.svg"}
                alt={pageContent.title}
                width={250}
                height={300}
                className="rounded-lg border-2 border-[#FBD86D] shadow-md"
              />
            </div>
          )}

          <div className="flex-1">
            <p className="text-[#1F2937] leading-relaxed whitespace-pre-line font-['Comic_Neue',_'Comic_Sans_MS',_cursive]">
              {pageContent.content}
            </p>
          </div>
        </div>

        {/* Page Footer */}
        <div className="mt-4 pt-2 border-t border-[#FBD86D]/30">
          <div className="flex justify-center">
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
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F5EB] to-[#E5E7EB] font-['Comic_Neue',_'Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-[#2C5F7A] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-[#FBD86D] text-2xl font-bold hover:text-[#FCD34D] transition-colors duration-300"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-[#FBD86D]">The Aevum Reader</h1>
          <div className="text-[#FBD86D] text-lg">
            Page {currentPage * 2 + 1}-{Math.min(currentPage * 2 + 2, pages.length)} of {pages.length}
          </div>
        </div>
      </header>

      {/* Flipbook Container */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Instructions */}
          <div className="text-center mb-6">
            <p className="text-[#486069] text-lg mb-2">Use arrow keys or buttons to flip pages</p>
            <div className="flex justify-center space-x-4 text-sm text-[#1F2937]">
              <span>← Previous Page</span>
              <span>Next Page →</span>
            </div>
          </div>

          {/* Flipbook */}
          <div
            className={`flipbook-container relative transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex justify-center">
              {typeof window !== "undefined" && (
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={400}
                  height={600}
                  size="stretch"
                  minWidth={300}
                  maxWidth={500}
                  minHeight={400}
                  maxHeight={700}
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
            canGoPrev={currentPage > 0}
            canGoNext={currentPage < totalPages - 1}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2C5F7A] py-6 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FBD86D] mb-2">© 2025 The Aevum by NeuroNumb. All rights reserved.</p>
          <p className="text-white text-sm">A project by Jahangirnagar University CSE</p>
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
    <div className="flex justify-center items-center space-x-8 mt-8">
      {/* Previous Button */}
      <button
        onClick={onPrevPage}
        disabled={!canGoPrev}
        className={`
          px-6 py-3 rounded-xl font-bold text-lg border-4 shadow-lg transition-all duration-300 transform
          ${
            canGoPrev
              ? "bg-[#FBD86D] text-[#486069] border-[#486069] hover:bg-[#FCD34D] hover:scale-105 hover:shadow-2xl"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="flex items-center space-x-2">
          <span>←</span>
          <span>Previous</span>
        </span>
      </button>

      {/* Page Indicator */}
      <div className="bg-[#F9F5EB] px-4 py-2 rounded-lg border-2 border-[#2C5F7A] shadow-md">
        <span className="text-[#486069] font-bold">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={onNextPage}
        disabled={!canGoNext}
        className={`
          px-6 py-3 rounded-xl font-bold text-lg border-4 shadow-lg transition-all duration-300 transform
          ${
            canGoNext
              ? "bg-[#FBD86D] text-[#486069] border-[#486069] hover:bg-[#FCD34D] hover:scale-105 hover:shadow-2xl"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="flex items-center space-x-2">
          <span>Next</span>
          <span>→</span>
        </span>
      </button>
    </div>
  )
}
