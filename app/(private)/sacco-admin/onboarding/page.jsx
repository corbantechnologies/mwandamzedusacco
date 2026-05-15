"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    Users, 
    HandCoins, 
    PiggyBank, 
    ArrowRight, 
    Download, 
    BadgePercent, 
    CheckCircle2, 
    HelpCircle,
    ShieldCheck,
    FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { generateMigrationChecklist } from "@/lib/pdf-generator";

export default function MwandaMigrationHub() {
    const router = useRouter();

    const handleDownloadChecklist = () => {
        generateMigrationChecklist("Mwanda Mzedu");
    };

    const phases = [
        {
            id: "foundation",
            title: "Phase 1: Foundation",
            description: "Setup GL and lending rules.",
            icon: LayoutDashboard,
            steps: [
                { title: "GL Setup", icon: LayoutDashboard, href: "/sacco-admin/setup", desc: "Define your chart of accounts." },
                { title: "Maturity Rules", icon: ShieldCheck, href: "/sacco-admin/setup", desc: "Configure 6-month & 80% limit rules." },
            ]
        },
        {
            id: "data",
            title: "Phase 2: Member Migration",
            description: "Import members with accurate Join Dates.",
            icon: Users,
            steps: [
                { title: "Member Import", icon: Users, href: "/sacco-admin/members", desc: "Bulk upload member register." },
            ]
        },
        {
            id: "balances",
            title: "Phase 3: Savings & Fees",
            description: "Opening balances for maturity tracking.",
            icon: PiggyBank,
            steps: [
                { title: "Savings Migration", icon: PiggyBank, href: "/sacco-admin/saving-deposits", desc: "Post opening savings." },
            ]
        },
        {
            id: "loans",
            title: "Phase 4: Loan Migration",
            description: "Moving active loans into Mwanda Mzedu.",
            icon: HandCoins,
            steps: [
                { title: "Bulk Loan Apps", icon: HandCoins, href: "/sacco-admin/loan-applications", desc: "Automated schedules." },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 space-y-8 mx-auto">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#045138] font-semibold text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Mwanda Onboarding Center
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mwanda Mzedu Migration Hub</h1>
                <p className="text-slate-500 max-w-2xl">
                    Ensure the 6-month maturity rules are active before importing member data.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {phases.map((phase) => (
                        <Card key={phase.id} className="overflow-hidden border-none shadow-sm">
                            <CardHeader className="bg-white border-b border-slate-100 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-slate-100 text-[#045138]">
                                        <phase.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{phase.title}</CardTitle>
                                        <CardDescription>{phase.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {phase.steps.map((step, idx) => (
                                        <div 
                                            key={idx} 
                                            className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                                            onClick={() => router.push(step.href)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-800">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">{step.desc}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-[#045138] group-hover:bg-white group-hover:shadow-sm w-full sm:w-auto">
                                                Configure
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    <Card className="border-[#045138]/20 bg-[#045138]/5">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 text-[#045138]">
                                <HelpCircle className="w-5 h-5" />
                                Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full bg-[#045138] hover:bg-[#045138]/90 text-white gap-2 font-semibold">
                                <Download className="w-4 h-4" /> Download Checklist
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
