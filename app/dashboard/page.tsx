"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dashnav from "@/components/ui/Dashnav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";

// Shipment Type
type Shipment = {
  id: string;
  description: string;
  sender: string;
  receiver: string;
  status: string;
  date: string;
  statusCode: number;
};

const useFormattedDate = (dateString: string) => {
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
    setFormatted(formattedDate);
  }, [dateString]);
  return formatted;
};

const getStatusIcon = (statusCode: number) => {
  switch (statusCode) {
    case 1:
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 2:
      return <Truck className="h-4 w-4 text-blue-500" />;
    case 3:
      return <AlertCircle className="h-4 w-4 text-purple-500" />;
    case 4:
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const ShipmentRow = ({ shipment }: { shipment: Shipment }) => {
  const formattedDate = useFormattedDate(shipment.date);

  return (
    <TableRow>
      <TableCell className="font-medium">{shipment.id}</TableCell>
      <TableCell>{shipment.description}</TableCell>
      <TableCell className="hidden md:table-cell">{formattedDate}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {getStatusIcon(shipment.statusCode)}
          <span>{shipment.status}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/track?id=${shipment.id}`} className="w-full">
                View Details
              </Link>
            </DropdownMenuItem>
            {shipment.statusCode === 4 ? (
              <DropdownMenuItem>View Proof of Delivery</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>Update Status</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View on Blockchain</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function DashboardPage() {
  const shipments: Shipment[] = [
    {
      id: "DPC-1234-5678-90",
      description: "Electronics Package",
      sender: "0x1234...5678",
      receiver: "0xabcd...ef01",
      status: "Delivered",
      date: "2023-06-05T14:30:00Z",
      statusCode: 4,
    },
    {
      id: "DPC-2345-6789-01",
      description: "Clothing Items",
      sender: "0x1234...5678",
      receiver: "0xbcde...f012",
      status: "In Transit",
      date: "2023-06-08T09:15:00Z",
      statusCode: 2,
    },
    {
      id: "DPC-3456-7890-12",
      description: "Books and Stationery",
      sender: "0x1234...5678",
      receiver: "0xcdef...0123",
      status: "Out for Delivery",
      date: "2023-06-09T11:45:00Z",
      statusCode: 3,
    },
    {
      id: "DPC-4567-8901-23",
      description: "Fragile Glassware",
      sender: "0x1234...5678",
      receiver: "0xdefg...1234",
      status: "Registered",
      date: "2023-06-10T10:30:00Z",
      statusCode: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredShipments = shipments.filter((shipment) => {
    if (
      searchTerm &&
      !shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !shipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (activeTab === "registered" && shipment.statusCode !== 1) return false;
    if (activeTab === "in-transit" && shipment.statusCode !== 2) return false;
    if (activeTab === "out-for-delivery" && shipment.statusCode !== 3)
      return false;
    if (activeTab === "delivered" && shipment.statusCode !== 4) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Dashnav />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Shipment Dashboard</h1>
            <p className="text-gray-500">
              Manage and track all your blockchain-verified shipments
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search shipments..."
                className="pl-8 w-[200px] md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Link href="/register-shipment">
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                <span>New Shipment</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Shipments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments.length}</div>
                <p className="text-xs text-gray-500">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  In Transit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {shipments.filter((s) => s.statusCode === 2).length}
                </div>
                <p className="text-xs text-gray-500">Currently moving</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Out for Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {shipments.filter((s) => s.statusCode === 3).length}
                </div>
                <p className="text-xs text-gray-500">Arriving soon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Delivered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {shipments.filter((s) => s.statusCode === 4).length}
                </div>
                <p className="text-xs text-gray-500">Successfully completed</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Shipments</TabsTrigger>
                <TabsTrigger value="registered">Registered</TabsTrigger>
                <TabsTrigger value="in-transit">In Transit</TabsTrigger>
                <TabsTrigger value="out-for-delivery">
                  Out for Delivery
                </TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
            </div>

            {["all", "registered", "in-transit", "out-for-delivery", "delivered"].map(
              (tab) => (
                <TabsContent key={tab} value={tab} className="mt-4">
                  <Card>
                    <CardContent className="p-0 overflow-x-auto">
                      <div className="min-w-[600px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tracking ID</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="hidden md:table-cell">
                                Date
                              </TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredShipments.length > 0 ? (
                              filteredShipments
                                .filter((shipment) => {
                                  if (tab === "registered" && shipment.statusCode !== 1) return false;
                                  if (tab === "in-transit" && shipment.statusCode !== 2) return false;
                                  if (tab === "out-for-delivery" && shipment.statusCode !== 3) return false;
                                  if (tab === "delivered" && shipment.statusCode !== 4) return false;
                                  return true;
                                })
                                .map((shipment) => (
                                  <ShipmentRow key={shipment.id} shipment={shipment} />
                                ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={5}
                                  className="text-center py-6 text-gray-500"
                                >
                                  No {tab.replace(/-/g, " ")} shipments found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
