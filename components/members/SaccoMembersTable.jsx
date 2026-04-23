"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CheckCircle, Clock, Search } from "lucide-react";
import Link from "next/link";

function SaccoMembersTable({ members }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter members by search term and status
  const filteredMembers =
    members?.filter((member) => {
      const fullName =
        `${member?.salutation} ${member?.first_name} ${member?.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && member?.is_approved) ||
        (statusFilter === "pending" && !member?.is_approved);
      return matchesSearch && matchesStatus;
    }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl ">Members List</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
              id="search"
              placeholder="Search members by name or number..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 border-gray-200 focus:border-primary rounded-xl text-base h-11 transition-all"
            />
          </div>
          <div className="w-full lg:w-56">
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-primary/20 transition-all bg-white h-11 appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved Only</option>
              <option value="pending">Pending Approval</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {filteredMembers.length > 0 ? (
          <>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[600px]">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-gray-900 font-bold py-4">Member No</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4">Full Name</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4">Status</TableHead>
                      <TableHead className="text-gray-900 font-bold py-4 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMembers.map((member) => (
                      <TableRow key={member?.reference}>
                        <TableCell className="font-medium">
                          <Link href={`/sacco-admin/members/${member?.member_no}`}>
                            {member?.member_no}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/sacco-admin/members/${member?.member_no}`}>
                            {member?.first_name} {member?.last_name}
                          </Link>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={member?.is_approved ? "default" : "secondary"}
                            className={
                              member?.is_approved
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-800"
                            }
                          >
                            {member?.is_approved ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {member?.is_approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => {
                              router.push(`/sacco-admin/members/${member?.member_no}`);
                            }}
                            className="bg-accent hover:bg-accent/90 text-white rounded-lg px-4 h-9"
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of{" "}
                {filteredMembers.length} members
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-black text-black hover:bg-gray-100"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-accent text-white hover:bg-accent/90"
                        : "border-black text-black hover:bg-gray-100"
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-black text-black hover:bg-gray-100"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-12">No members found.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default SaccoMembersTable;
