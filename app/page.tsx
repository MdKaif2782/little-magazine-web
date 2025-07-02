"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Github } from "lucide-react"

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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPrologueExpanded, setIsPrologueExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Sample data
  const articles: ArticleProps[] = [
    {
      title: "No Matter How Fast You Run, You Can't Escape Reality",
      description:
        "In Detective Comics, few rivalries are as intense as the one between Barry Allen, the Flash, and Eobard Thawne, the Reverse-Flash. It is a conflict not only of just speed but also of philosophy, trauma, and time itself. Their enmity forms a cosmic ouroboros—an eternal chase where the hunter and hunted are forever in loops of fate and obsession.",
      image: "/reverse_flash.png",
    },
    {
      title: "Quickstart in Robotics and Microcontrollers",
      description:
        "Machines that can think, sense, and react are all around us in the modern world. Examples include voice assistants, automated lights, and even intelligent farming equipment. However, how do these enchanted tools operate? Microcontrollers and robotics hold the key to the solution. These subjects are not limited to engineers or scientists. Anyone, especially inquisitive students in school or college, can learn how to use these creative tools.",
      image: "/spider.jpg",
    },
    {
      title: "The Ghostwriter's Challenge: Working Without Credit",
      description:
        "Ghostwriters face a difficult task. They must write accurately and clearly while aligning with the client's preferences, all without public recognition. This lack of credit can feel unfair—why should someone else be praised for their work?",
      image: "/ghost_writing.png",
    },
  ]

  const contributors: ContributorProps[] = [
    {
      name: "Maliha Laheen",
      roll: 322,
      reg: "20240659104",
      role: "Editor",
      image: "/laheen.jpeg",
    },
    {
      name: "Ferdous Ara Fahima",
      roll: 323,
      reg: "20240659105",
      role: "Proofreader",
      image: "/fahima.jpeg",
    },
    {
      name: "Sultana Akter",
      roll: 325,
      reg: "20240659107",
      role: "Reviewer",
      image: "/sultana.jpeg",
    },
    {
      name: "Md. Asif Khan",
      roll: 348,
      reg: "20240659130",
      role: "Typesetter",
      image: "/asif.jpeg",
    },
    {
      name: "Md. Kaif Ibn Zaman",
      roll: 358,
      reg: "20240659140",
      role: "Reviewer",
      image: "/kaif.jpeg",
    },
    {
      name: "Muhaimin Kamran",
      roll: 366,
      reg: "20240659148",
      role: "Typesetter",
      image: "/kamran.jpeg",
    },
    {
      name: "Tamjeed Rahman Udoy",
      roll: 373,
      reg: "20240659155",
      role: "Proofreader",
      image: "/udoy.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9F5EB] font-['Comic_Neue',_'Comic_Sans_MS',_cursive]">
      {/* Header Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image src="/background.png" alt="Tech Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/60 to-[#000000]/40"></div>
        </div>

        {/* Content */}
        <div
          className={`relative z-10 text-center px-6 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#FBD86D] mb-4 drop-shadow-lg">The Aevum</h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-bold">by NeuroNumb</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                window.open(
                  "https://juniv-my.sharepoint.com/:b:/g/personal/20240659140mdkaif_juniv_edu/ESjYGMrYNuVGhrruJZJPgtYBjf-JxbLORQcE3RPH2-qB2g?e=WXJfmx",
                  "_blank",
                )
              }}
              className="bg-transparent text-[#FBD86D] px-8 py-4 rounded-xl text-xl font-bold border-4 border-[#FBD86D] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-[#FBD86D] hover:text-[#486069] relative overflow-hidden"
            >
              <span className="relative z-10">Download</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            <button
              onClick={() => {
                router.push("/read")
              }}
              className="bg-[#FBD86D] text-[#486069] px-8 py-4 rounded-xl text-xl font-bold border-4 border-[#486069] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-[#FCD34D] relative overflow-hidden"
            >
              <span className="relative z-10">Start Reading</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Prologue Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#F9F5EB] to-[#E5E7EB]">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-[#FBD86D] overflow-hidden transition-all duration-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Prologue Header */}
            <div
              className="p-8 cursor-pointer hover:bg-[#FBD86D]/10 transition-all duration-300"
              onClick={() => setIsPrologueExpanded(!isPrologueExpanded)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#486069] mb-2">Prologue</h2>
                  <p className="text-[#1F2937] text-lg">Discover the story behind The Aevum</p>
                </div>
                <div className="text-[#486069] transition-transform duration-300">
                  {isPrologueExpanded ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
                </div>
              </div>
            </div>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isPrologueExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-8 pb-8">
                <div className="border-t-2 border-[#FBD86D] pt-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-[#1F2937] leading-relaxed mb-6">
                      In a world racing toward the future, where ideas spark revolutions and technology reshapes
                      reality, <span className="font-bold text-[#486069]">The Aevum</span> emerges as a beacon of
                      curiosity and insight. Our name, derived from the Latin for &quot;eternity,&quot; reflects our mission: to
                      explore the timeless questions that connect yesterday, today, and always.
                    </p>
                    <p className="text-[#1F2937] leading-relaxed mb-6">
                      From the ethical dilemmas of ghostwriting to the boundless potential of quantum computing, from
                      the dopamine-driven pull of digital platforms to the quiet triumphs of robotics, this inaugural
                      issue captures the pulse of innovation and human ambition.
                    </p>
                    <blockquote className="border-l-4 border-[#FBD86D] pl-6 my-8 bg-[#FBD86D]/10 py-4 rounded-r-lg">
                      <p className="text-[#486069] font-semibold text-xl italic">
                        &quot;The future belongs to those who believe in the beauty of their dreams.&quot;
                      </p>
                      <cite className="text-[#1F2937] text-sm">— Eleanor Roosevelt</cite>
                    </blockquote>
                    <p className="text-[#1F2937] leading-relaxed mb-6">
                      This magazine is a celebration of bold minds—students, thinkers, and creators who dare to ask
                      &quot;what if?&quot; and &quot;why not?&quot; Through their voices, we uncover stories that challenge, inspire, and
                      illuminate. Whether you&apos;re a dreamer tinkering with microcontrollers or a skeptic pondering the
                      ethics of AI, The Aevum is your space to reflect, learn, and imagine.
                    </p>
                    <p className="text-[#1F2937] leading-relaxed">
                      As you turn these pages, let curiosity guide you. The silent revolutions of our time—in
                      technology, science, and thought—are already shaping tomorrow. Join us in this journey to
                      understand, question, and create a future that resonates with purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 px-6 bg-[#F9F5EB]">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 relative">
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

          {/* Articles List */}
          <div className="space-y-20">
            {articles.map((article, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 transform transition-all duration-700 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Article Image */}
                <div className="lg:w-1/2 relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#486069]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {/* Decorative Border */}
                  <div className="absolute -inset-2 border-4 border-[#FBD86D] rounded-2xl -z-10 transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                </div>

                {/* Article Content */}
                <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#486069] leading-tight">{article.title}</h3>
                  <div className="w-20 h-1 bg-[#FBD86D] rounded-full"></div>
                  <p className="text-[#1F2937] text-lg leading-relaxed">{article.description}</p>
                  <button className="inline-flex items-center text-[#486069] font-bold text-lg hover:text-[#FBD86D] transition-colors duration-300 group">
                    Read More
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#486069] to-[#2C5F7A]">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FBD86D] mb-4">Meet Our Team</h2>
            <p className="text-white/80 text-xl">The brilliant minds behind The Aevum</p>
            {/* Comic Zigzag Underline */}
            <div className="flex justify-center mt-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className={`group relative transform transition-all duration-500 hover:scale-105 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Background */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-[#FBD86D]/20 hover:shadow-2xl hover:border-[#FBD86D] transition-all duration-300">
                  {/* Contributor Image */}
                  <div className="relative mb-6 mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FBD86D] to-[#FCD34D] rounded-full p-1">
                      <Image
                        src={contributor.image || "/placeholder.svg"}
                        alt={contributor.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {/* Hover Ring */}
                    <div className="absolute -inset-2 border-2 border-[#FBD86D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>

                  {/* Contributor Info */}
                  <h3 className="text-xl font-bold text-[#486069] mb-3 group-hover:text-[#2C5F7A] transition-colors duration-300">
                    {contributor.name}
                  </h3>

                  <div className="space-y-2 text-sm text-[#1F2937]">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#486069]">Roll:</span>
                      <span>{contributor.roll}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#486069]">Reg:</span>
                      <span>{contributor.reg}</span>
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className="mt-4">
                    <span className="inline-block bg-[#FBD86D] text-[#486069] px-4 py-2 rounded-full text-sm font-bold shadow-md group-hover:bg-[#FCD34D] transition-colors duration-300">
                      {contributor.role}
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FBD86D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"></div>
                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#FCD34D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
              </div>
            ))}
          </div>

          {/* University Attribution */}
          <div className="text-center mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-[#FBD86D]/20">
            <div className="space-y-2">
              <p className="text-[#FBD86D] text-xl font-bold">A project by NeuroNumb</p>
              <p className="text-white text-lg">Department of Computer Science & Engineering</p>
              <p className="text-white text-lg font-semibold">Jahangirnagar University</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F9F5EB] py-12 px-6 border-t-4 border-[#2C5F7A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-[#1F2937] text-lg font-semibold">© 2025 The Aevum by NeuroNumb</p>
              <p className="text-[#486069] text-sm">Exploring the timeless questions of tomorrow</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <button
              onClick={() => {
                window.open("https://github.com/MdKaif2782/little-maga-web", "_blank")
              }}
              className="w-12 h-12 bg-[#2C5F7A] text-white rounded-full hover:bg-[#FBD86D] hover:text-[#1F2937] transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg">
                <Github className="w-6 h-6" color="white" />
              </button>
              <button
              onClick={() => {
                window.open("https://github.com/MdKaif2782/chotto-magazine", "_blank")
              }}
               className="w-12 h-12 bg-[#2C5F7A] text-white rounded-full hover:bg-[#FBD86D] hover:text-[#1F2937] transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg">
                <Github className="w-6 h-6" color="white" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
