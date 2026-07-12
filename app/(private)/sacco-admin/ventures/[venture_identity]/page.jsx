"use client";

import MemberLoadingSpinner from "@/components/general/MemberLoadingSpinner";
import { useFetchVentureDetail } from "@/hooks/ventures/actions";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CreateVenturePayment from "@/forms/venturepayments/CreateVenturePayment";
import VentureDepositsTable from "@/components/ventures/VentureDepositsTable";
import VenturePaymentsTable from "@/components/ventures/VenturePaymentsTable";
import { format } from "date-fns";
import VentureTransactions from "@/components/ventures/VentureTransactionsTable";

function VentureDetail() {
  const { venture_identity } = useParams();
  const [paymentModal, setPaymentModal] = useState(false);

  const {
    isLoading: isLoadingVenture,
    data: venture,
    refetch: refetchVenture,
  } = useFetchVentureDetail(venture_identity);

const PersonalVentureDetailSkeleton = () => (
  <div className="mx-auto p-4 sm:p-6 space-y-6 animate-pulse">
    <div className="h-4 w-48 bg-slate-200 rounded" />
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="h-6 w-64 bg-slate-200 rounded" />
        <div className="h-4 w-40 bg-slate-200 rounded" />
      </div>
      <div className="h-10 w-32 bg-slate-200 rounded" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="h-24 bg-slate-200 rounded-lg" />
          <div className="h-24 bg-slate-200 rounded-lg" />
        </div>
        <div className="h-96 bg-slate-200 rounded-lg" />
      </div>
      <div className="h-96 bg-slate-200 rounded-lg" />
    </div>
  </div>
);

  if (isLoadingVenture) {
    return (
      <div className="min-h-screen bg-background">
        <PersonalVentureDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto p-4 sm:p-6 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/sacco-admin/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{venture?.venture_type}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Venture Details */}
        <Card className="border-l-4 border-l-primary shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              {venture?.venture_type}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-base font-medium">
              Account Number:{" "}
              <span className="font-normal">{venture?.account_number}</span>
            </p>
            <p className="text-base font-medium">
              Balance:{" "}
              <span className="font-normal text-primary">
                KES {parseFloat(venture?.balance).toFixed(2)}
              </span>
            </p>
            <p className="text-base font-medium">
              Status:{" "}
              <span
                className={`font-normal ${
                  venture?.is_active ? "text-green-600" : "text-red-600"
                }`}
              >
                {venture?.is_active ? "Active" : "Inactive"}
              </span>
            </p>
            <p className="text-base font-medium">
              Created At:{" "}
              <span className="font-normal">
                {format(new Date(venture?.created_at), "PPP")}
              </span>
            </p>
            <p className="text-base font-medium">
              Venture Type:{" "}
              <span className="font-normal">{venture?.venture_type}</span>
            </p>
          </CardContent>
        </Card>

        {/* Deposits Table */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VentureDepositsTable deposits={venture?.deposits || []} />
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VenturePaymentsTable payments={venture?.payments || []} />
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VentureTransactions
              deposits={venture?.deposits || []}
              payments={venture?.payments || []}
            />
          </CardContent>
        </Card>

        {/* Modal */}
        <CreateVenturePayment
          isOpen={paymentModal}
          onClose={() => setPaymentModal(false)}
          ventures={[venture]}
          refetchVenture={refetchVenture}
        />
      </div>
    </div>
  );
}

export default VentureDetail;
