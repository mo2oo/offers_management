"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This is sample data - replace with your actual data structure
const sampleOffers = [
  {
    id: 1,
    title: "Summer Sale",
    category: "Seasonal",
    price: 199.99,
    discount: "20%",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "Active",
  },
  {
    id: 2,
    title: "Black Friday Deal",
    category: "Holiday",
    price: 299.99,
    discount: "40%",
    startDate: "2023-11-24",
    endDate: "2023-11-27",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "New Year Special",
    category: "Seasonal",
    price: 149.99,
    discount: "15%",
    startDate: "2023-12-26",
    endDate: "2024-01-15",
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Spring Collection",
    category: "Seasonal",
    price: 249.99,
    discount: "10%",
    startDate: "2023-03-01",
    endDate: "2023-05-31",
    status: "Expired",
  },
  {
    id: 5,
    title: "Loyalty Member Discount",
    category: "Membership",
    price: 99.99,
    discount: "25%",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Active",
  },
]

// Sample categories - replace with your actual categories
const categories = ["All", "Seasonal", "Holiday", "Membership"]
const statuses = ["All", "Active", "Upcoming", "Expired"]

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  // Filter offers based on search term and filters
  const filteredOffers = sampleOffers.filter((offer) => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || offer.category === categoryFilter
    const matchesStatus = statusFilter === "All" || offer.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Offers Management System</h1>
          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/offers">
              <Button variant="ghost">View Offers</Button>
            </Link>
            <Link href="/offers/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Offer
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search offers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.title}</TableCell>
                        <TableCell>{offer.category}</TableCell>
                        <TableCell>${offer.price.toFixed(2)}</TableCell>
                        <TableCell>{offer.discount}</TableCell>
                        <TableCell>{offer.startDate}</TableCell>
                        <TableCell>{offer.endDate}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              offer.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : offer.status === "Upcoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {offer.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/offers/${offer.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No offers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Offers Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}

