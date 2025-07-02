"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// TypeScript Interfaces
interface ArticleProps {
  title: string
  description: string
  image: string
}

interface ContributorProps {
  name: string
  roll: number
  reg: string
  role: string
  image: string
}

interface HeaderProps {
  title: string
  subtitle: string
}

interface FooterProps {
  year: number
  projectName: string
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Sample data
  const articles: ArticleProps[] = [
    {
      title: "Quantum Leap Forward",
      description:
        "Exploring the revolutionary advances in quantum computing and how they're reshaping our understanding of computational possibilities. From quantum supremacy to practical applications in cryptography and optimization.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Ethics of AI",
      description:
        "Diving deep into the moral implications of artificial intelligence development. We examine bias, transparency, and the responsibility of creators in building ethical AI systems for the future.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Robotics Revolution",
      description:
        "The latest breakthroughs in robotics technology are transforming industries from healthcare to manufacturing. Discover how autonomous systems are becoming our collaborative partners.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const contributors: ContributorProps[] = [
    {
      name: "Maliha Laheen",
      roll: 322,
      reg: "20240659104",
      role: "Editor-in-Chief",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Ferdous Ara Fahima",
      roll: 323,
      reg: "20240659105",
      role: "Lead Writer",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Sultana Akter",
      roll: 325,
      reg: "20240659107",
      role: "Graphic Designer",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Md. Asif Khan",
      roll: 348,
      reg: "20240659130",
      role: "Technical Editor",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Md. Kaif Ibn Zaman",
      roll: 358,
      reg: "20240659140",
      role: "Researcher",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Muhaimin Kamran",
      roll: 366,
      reg: "20240659148",
      role: "Content Writer",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Tamjeed Rahman Udoy",
      roll: 373,
      reg: "20240659155",
      role: "Illustrator",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9F5EB] font-['Comic_Neue',_'Comic_Sans_MS',_cursive]">
      {/* Header Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt="Tech Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F7A]/70 to-[#2C5F7A]/50"></div>
        </div>

        {/* Comic Panel Border */}
        <div className="absolute inset-4 border-4 border-[#FBD86D] rounded-3xl shadow-2xl"></div>

        {/* Content */}
        <div
          className={`relative z-10 text-center px-6 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#FBD86D] mb-4 drop-shadow-lg">The Aevum</h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-bold">by NeuroNumb</p>

          {/* Start Reading Button */}
          <div className="relative inline-block">
            <button className="bg-[#FBD86D] text-[#486069] px-8 py-4 rounded-xl text-xl font-bold border-4 border-[#486069] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-[#FCD34D] relative overflow-hidden">
              <span className="relative z-10">Start Reading</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            {/* Comic Speech Bubble Tail */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#486069]"></div>
            </div>
          </div>
        </div>

        {/* Decorative Comic Elements
        <div className="absolute top-10 left-10 text-[#FBD86D] text-6xl animate-pulse">★</div>
        <div className="absolute bottom-20 right-10 text-[#486069] text-4xl animate-bounce">💥</div> */}
      </header>

      {/* Articles Section */}
      <section className="py-16 px-6 bg-[#F9F5EB]">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-[#486069] mb-4">Featured Articles</h2>
            {/* Comic Zigzag Underline */}
            <div className="flex justify-center">
              <svg width="200" height="20" viewBox="0 0 200 20" className="text-[#FBD86D]">
                <path
                  d="M0 10 L20 5 L40 15 L60 5 L80 15 L100 5 L120 15 L140 5 L160 15 L180 5 L200 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className={`bg-[#F9F5EB] rounded-xl p-6 shadow-lg border-2 border-[#2C5F7A] hover:shadow-2xl hover:scale-105 transition-all duration-300 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Article Title */}
                <h3 className="text-2xl font-bold text-[#486069] mb-4 text-center">{article.title}</h3>

                {/* Article Image */}
                <div className="relative mb-4 mx-4">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-xl border-2 border-[#FBD86D]"
                  />
                </div>

                {/* Article Description */}
                <p className="text-[#1F2937] text-sm leading-relaxed">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#F9F5EB] to-[#E5E7EB]">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with Comic Starburst */}
          <div className="text-center mb-12 relative">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-[#486069] mb-4 relative z-10">Our Team</h2>
              {/* Starburst Background */}
              <div className="absolute inset-0 -m-4">
                <svg width="100%" height="100%" viewBox="0 0 200 100" className="text-[#FBD86D]/20">
                  <polygon
                    points="100,10 120,40 150,40 130,60 140,90 100,75 60,90 70,60 50,40 80,40"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Comic Zigzag Underline */}
            <div className="flex justify-center">
              <svg width="200" height="20" viewBox="0 0 200 20" className="text-[#FBD86D]">
                <path
                  d="M0 10 L20 5 L40 15 L60 5 L80 15 L100 5 L120 15 L140 5 L160 15 L180 5 L200 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Contributors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className={`bg-[#F9F5EB] rounded-xl p-6 text-center shadow-lg border-2 border-[#2C5F7A] hover:shadow-2xl hover:scale-105 hover:border-[#FBD86D] transition-all duration-300 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Contributor Image */}
                <div className="mb-4 mx-auto w-24 h-24 relative">
                  <Image
                    src={contributor.image || "/placeholder.svg"}
                    alt={contributor.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover rounded-full border-2 border-[#FBD86D]"
                  />
                </div>

                {/* Contributor Info */}
                <h3 className="text-lg font-bold text-[#486069] mb-2">{contributor.name}</h3>
                <p className="text-[#1F2937] text-sm mb-1">
                  <span className="font-semibold">Roll:</span> {contributor.roll}
                </p>
                <p className="text-[#1F2937] text-sm mb-1">
                  <span className="font-semibold">Reg:</span> {contributor.reg}
                </p>
                <p className="text-[#1F2937] text-sm font-semibold">{contributor.role}</p>
              </div>
            ))}
          </div>

          {/* University Attribution */}
          <div className="text-center">
            <p className="text-[#1F2937] text-lg font-semibold">A project by Jahangirnagar University CSE</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F9F5EB] py-8 px-6 border-t-4 border-[#2C5F7A]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#1F2937] mb-4">© 2025 The Aevum by NeuroNumb. All rights reserved.</p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <button className="w-10 h-10 bg-[#2C5F7A] text-white rounded-full hover:bg-[#FBD86D] hover:text-[#1F2937] transition-all duration-300 hover:scale-110 flex items-center justify-center">
              <span className="text-sm font-bold">X</span>
            </button>
            <button className="w-10 h-10 bg-[#2C5F7A] text-white rounded-full hover:bg-[#FBD86D] hover:text-[#1F2937] transition-all duration-300 hover:scale-110 flex items-center justify-center">
              <span className="text-sm font-bold">in</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
