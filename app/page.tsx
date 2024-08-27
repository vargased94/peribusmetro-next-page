'use client'

import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Instagram, Facebook } from "lucide-react"
import Link from 'next/link'

const images = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600&text=Image+2",
  "/placeholder.svg?height=400&width=600&text=Image+3",
]

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Routes', href: '#routes' },
  { name: 'Contact', href: '#contact' },
]

const routes = [
  {
    type: 'Main Routes',
    color: 'bg-purple-600',
    routes: [
      { id: 'T01', origin: 'Central Station', destination: 'Airport Terminal' },
      { id: 'T02', origin: 'Downtown Plaza', destination: 'University Campus' },
      { id: 'T03', origin: 'Riverside Park', destination: 'Shopping District' },
    ]
  },
  {
    type: 'Express Routes',
    color: 'bg-blue-500',
    routes: [
      { id: 'E01', origin: 'Central Station', destination: 'Business Park' },
      { id: 'E02', origin: 'Airport Terminal', destination: 'Convention Center' },
      { id: 'E03', origin: 'Suburban Hub', destination: 'City Center' },
    ]
  },
  {
    type: 'Local Routes',
    color: 'bg-green-500',
    routes: [
      { id: 'L01', origin: 'Neighborhood A', destination: 'Local Market' },
      { id: 'L02', origin: 'Community Center', destination: 'Public Library' },
      { id: 'L03', origin: 'Residential Area', destination: 'Sports Complex' },
    ]
  }
]

export default function Component() {
  const [currentImage, setCurrentImage] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header height

      for (const section of navItems) {
        const element = sectionRefs.current[section.href.slice(1)]
        if (element) {
          if (
            element.offsetTop <= scrollPosition &&
            element.offsetTop + element.offsetHeight > scrollPosition
          ) {
            setActiveSection(section.href)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = sectionRefs.current[href.slice(1)]
    if (element) {
      const offsetTop = element.offsetTop - 80 // Adjust for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">ACME Transit</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-foreground/80 ${activeSection === item.href ? 'text-foreground' : 'text-foreground/60'
                    }`}
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section id="home" ref={setRef('home')} className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your City with ACME Transit
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Efficient, reliable, and sustainable transportation for everyone.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Plan Your Trip
                  </Button>
                </div>
              </div>
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
                  <Button variant="outline" size="icon" onClick={prevImage} className="h-8 w-8 rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextImage} className="h-8 w-8 rounded-full">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </div>
                <div className="relative h-[400px] w-full">
                  {images.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Transit system image ${index + 1}`}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" ref={setRef('about')} className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About ACME Transit</h2>
                <p className="text-muted-foreground md:text-xl">
                  ACME Transit is committed to providing safe, efficient, and sustainable transportation solutions for our community.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To connect people and places, enhancing the quality of life in our city through innovative and accessible public transportation.
                </p>
                <h3 className="text-xl font-bold">Our Values</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Safety as our top priority</li>
                  <li>Environmental sustainability</li>
                  <li>Continuous improvement of services</li>
                  <li>Inclusivity and accessibility for all</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="routes" ref={setRef('routes')} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Our Routes</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((routeType) => (
                <Card key={routeType.type} className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{routeType.type}</h3>
                  <ul className="space-y-4">
                    {routeType.routes.map((route) => (
                      <li key={route.id} className="flex items-center space-x-2">
                        <span className={`w-10 h-6 rounded flex items-center justify-center text-white font-bold ${routeType.color}`}>
                          {route.id}
                        </span>
                        <span className="flex-grow">
                          <div className="font-medium">{route.origin}</div>
                          <div className="text-sm text-muted-foreground">to {route.destination}</div>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" ref={setRef('contact')} className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Contact Us</h2>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mt-4 text-muted-foreground md:text-xl mb-4">Get in touch with us for any inquiries or support.</p>
                <div className="space-y-4">
                  <p><strong>Email:</strong> support@acmetransit.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Transit Plaza, Metro City, MC 12345</p>
                </div>
              </div>
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message" required />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">ACME Transit</span>
              </Link>
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2024 ACME Transit. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}