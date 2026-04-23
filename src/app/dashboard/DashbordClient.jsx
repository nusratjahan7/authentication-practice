"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, Button, Card, CardContent, Toast, toast } from "@heroui/react";

const stats = [
  { label: "Projects", value: "12", color: "text-violet-400" },
  { label: "Completed", value: "94%", color: "text-emerald-400" },
  { label: "Team", value: "5", color: "text-violet-400" },
  { label: "This week", value: "+8", color: "text-emerald-400" },
];

const activity = [
  { text: 'Project "Alpha" updated', time: "2m ago", color: "bg-violet-500" },
  { text: "Task completed by Sarah", time: "1h ago", color: "bg-emerald-500" },
  { text: "New comment on design review", time: "3h ago", color: "bg-violet-400" },
];

export default function DashboardClient({ user }) {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    toast("Logged out", { description: "See you next time!" });
    setTimeout(() => router.push("/signin"), 600);
  }

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <>
      <Toast.Provider placement="top-center" />
      <div className="min-h-screen bg-[#0f0f11] px-4 py-10">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
                N
              </div>
              <span className="text-lg font-semibold text-white">Dashboard</span>
            </div>
            <Avatar name={initials} className="bg-violet-600 text-white font-semibold text-sm w-9 h-9" />
          </div>

          {/* User badge */}
          <Card className="bg-[#19191e] border border-[#2e2e38] mb-5">
            <CardContent className="flex flex-row items-center gap-4 px-5 py-4">
              <Avatar
                name={initials}
                className="bg-violet-700 text-white font-semibold text-sm w-10 h-10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <Button
                size="sm"
                variant="bordered"
                onPress={handleLogout}
                className="border-[#3d1a1a] text-red-400 hover:bg-red-950/30 hover:border-red-700 shrink-0"
              >
                Log out
              </Button>
            </CardContent>
          </Card>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {stats.map((s) => (
              <Card key={s.label} className="bg-[#19191e] border border-[#2e2e38]">
                <CardContent className="px-5 py-4">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity */}
          <Card className="bg-[#19191e] border border-[#2e2e38]">
            <CardContent className="px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Recent activity</p>
              <div className="flex flex-col gap-0">
                {activity.map((a, i) => (
                  <div key={i} className={`flex items-center gap-3 py-3 ${i < activity.length - 1 ? "border-b border-[#2e2e38]" : ""}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${a.color}`} />
                    <span className="text-sm text-white flex-1">{a.text}</span>
                    <span className="text-xs text-gray-500">{a.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
}
