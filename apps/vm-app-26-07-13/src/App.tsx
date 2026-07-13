import { useState, useMemo, type ReactElement } from 'react'
import {
  AppShell,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  ChromeHeader,
  TooltipProvider,
  Avatar,
  ItemAvatar,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  ProgressBar,
  Select,
  DataTable,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@qijenchen/design-system'
import { createColumnHelper } from '@tanstack/react-table'
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  Layers,
  Monitor,
  BookOpen,
  MessageSquare,
  Settings2,
  Server,
} from 'lucide-react'

// ── Sidebar ──────────────────────────────────────────────────────────────────

const APPS = [
  { id: 'modelhub', label: 'ModelHub', icon: Layers },
  { id: 'workbench', label: 'Workbench', icon: Monitor },
] as const
type AppId = (typeof APPS)[number]['id']

function AppSidebar({ activeApp, onAppChange }: { activeApp: AppId; onAppChange: (id: AppId) => void }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 min-w-0 group-data-[collapsible=icon]:justify-center">
          <Avatar alt="PlatformOS" size={24} shape="square" color="purple" solid />
          <span className="text-body-lg font-medium truncate group-data-[collapsible=icon]:hidden">
            PlatformOS
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {APPS.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    id={id}
                    startIcon={icon}
                    tooltip={label}
                    isActive={activeApp === id}
                    onClick={() => onAppChange(id)}
                  >
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div role="group" aria-label="當前使用者">
                <ItemAvatar alt="Penny Deng" color="indigo" />
                <span data-sidebar="menu-label" className="min-w-0 flex-1 truncate">
                  Penny Deng
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

// ── PageHeader ────────────────────────────────────────────────────────────────

function PageHeader({ title, rightSlot }: { title: string; rightSlot?: ReactElement<any, any> }) {
  return (
    <ChromeHeader className="bg-surface">
      <SidebarTrigger />
      <h1 className="text-body-lg font-medium">{title}</h1>
      {rightSlot}
    </ChromeHeader>
  )
}

// ── Tab 1: 使用報表 ───────────────────────────────────────────────────────────

const modelUsageData = [
  { model: 'gpt4o', requests: 4820, fill: 'var(--color-gpt4o)' },
  { model: 'claude', requests: 3340, fill: 'var(--color-claude)' },
  { model: 'gemini', requests: 2280, fill: 'var(--color-gemini)' },
  { model: 'other', requests: 1562, fill: 'var(--color-other)' },
]
const modelUsageConfig = {
  gpt4o: { label: 'GPT-4o', color: 'var(--chart-1)' },
  claude: { label: 'Claude 3.5', color: 'var(--chart-2)' },
  gemini: { label: 'Gemini 1.5', color: 'var(--chart-3)' },
  other: { label: '其他', color: 'var(--chart-4)' },
} satisfies ChartConfig

const dailyTokenData = [
  { day: '7/7', tokens: 84 },
  { day: '7/8', tokens: 120 },
  { day: '7/9', tokens: 96 },
  { day: '7/10', tokens: 145 },
  { day: '7/11', tokens: 110 },
  { day: '7/12', tokens: 88 },
  { day: '7/13', tokens: 132 },
]
const dailyTokenConfig = {
  tokens: { label: 'Token（千）', color: 'var(--chart-1)' },
} satisfies ChartConfig

const deptUsageData = [
  { dept: '設計', usage: 4830 },
  { dept: '工程', usage: 7200 },
  { dept: '產品', usage: 5900 },
  { dept: '行銷', usage: 3100 },
  { dept: '資料', usage: 6400 },
]
const deptUsageConfig = {
  usage: { label: '用量（pts）', color: 'var(--chart-2)' },
} satisfies ChartConfig

function ReportsTab() {
  return (
    <div className="grid grid-cols-[320px_1fr_1fr] gap-[var(--layout-space-loose)] items-start">
      {/* Donut chart */}
      <div className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)]">
        <p className="text-body font-semibold text-foreground mb-0.5">模型使用分佈</p>
        <p className="text-caption text-fg-muted mb-4">本月呼叫次數佔比</p>
        <ChartContainer config={modelUsageConfig} className="mx-auto aspect-square max-h-[200px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="model" />} />
            <Pie data={modelUsageData} dataKey="requests" nameKey="model" innerRadius={52} strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent nameKey="model" />} />
          </PieChart>
        </ChartContainer>
      </div>

      {/* Bar chart: daily tokens */}
      <div className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)]">
        <p className="text-body font-semibold text-foreground mb-0.5">每日 Token 消耗</p>
        <p className="text-caption text-fg-muted mb-4">近 7 天（千 tokens）</p>
        <ChartContainer config={dailyTokenConfig} className="h-[220px]">
          <BarChart accessibilityLayer data={dailyTokenData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}K`} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" formatter={(v) => `${v}K tokens`} />} />
            <Bar dataKey="tokens" fill="var(--color-tokens)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Bar chart: dept comparison */}
      <div className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)]">
        <p className="text-body font-semibold text-foreground mb-0.5">部門消耗比較</p>
        <p className="text-caption text-fg-muted mb-4">本月各部門用量</p>
        <ChartContainer config={deptUsageConfig} className="h-[220px]">
          <BarChart accessibilityLayer data={deptUsageData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="dept" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" formatter={(v) => `${Number(v).toLocaleString()} pts`} />} />
            <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

// ── Tab 2: 配額管理 ───────────────────────────────────────────────────────────

function QuotaCard({
  title,
  description,
  type,
  used,
  total,
  status,
}: {
  title: string
  description: string
  type: '個人' | '部門'
  used: number
  total: number
  status: 'inProgress' | 'success' | 'error'
}) {
  const pct = Math.round((used / total) * 100)
  return (
    <div className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-body font-semibold text-foreground">{title}</p>
          <p className="text-caption text-fg-muted">{description}</p>
        </div>
        <Badge count={0} className="invisible" aria-hidden />
        <span className="text-caption font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface-raised text-fg-secondary border border-divider">
          {type}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-h3 font-bold tabular-nums">{used.toLocaleString()}</span>
        <span className="text-body text-fg-muted">/ {total.toLocaleString()} pts</span>
      </div>
      <ProgressBar value={pct} status={status} affix="value" aria-label={`${title} 已使用 ${pct}%`} />
      <div className="flex justify-between mt-1.5 text-caption text-fg-muted tabular-nums">
        <span>已使用 {used.toLocaleString()} pts</span>
        <span>剩餘 {(total - used).toLocaleString()} pts</span>
      </div>
    </div>
  )
}

function MachineCard({
  name,
  spec,
  cost,
  running,
}: {
  name: string
  spec: string
  cost: number
  running: boolean
}) {
  return (
    <div className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: running ? 'var(--color-positive)' : 'var(--color-neutral-300)' }}
      />
      <div className="flex items-center justify-between mb-3 mt-1">
        <div className="w-9 h-9 rounded-lg border border-divider bg-surface-raised flex items-center justify-center">
          <Server size={18} className="text-fg-secondary" />
        </div>
        <span
          className={`text-caption font-semibold px-2 py-0.5 rounded-full ${
            running
              ? 'bg-[color:var(--color-positive-subtle)] text-[color:var(--color-positive)]'
              : 'bg-surface-raised text-fg-muted border border-divider'
          }`}
        >
          {running ? '執行中' : '已停止'}
        </span>
      </div>
      <p className="text-body font-semibold text-foreground">{name}</p>
      <p className="text-caption text-fg-muted mb-3">{spec}</p>
      <div className="flex items-center justify-between pt-2.5 border-t border-divider">
        <span className="text-caption text-fg-muted">本月消耗</span>
        <span className="text-body font-bold tabular-nums">
          {cost.toLocaleString()} <span className="text-caption text-fg-muted font-normal">pts</span>
        </span>
      </div>
    </div>
  )
}

function QuotaTab() {
  return (
    <div className="space-y-[var(--layout-space-loose)]">
      <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
        <QuotaCard title="個人配額" description="月度個人可使用點數" type="個人" used={1240} total={2000} status="inProgress" />
        <QuotaCard title="部門共用配額" description="設計部門共用點數池" type="部門" used={4830} total={10000} status="inProgress" />
      </div>
      <div>
        <p className="text-body font-semibold text-foreground mb-3 flex items-center gap-1.5">
          <Server size={15} className="text-fg-muted" />
          點數換取的運算機器
        </p>
        <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
          <MachineCard name="dev-instance-01" spec="4 vCPU · 16 GB RAM · GPU T4" cost={480} running={true} />
          <MachineCard name="exp-instance-02" spec="8 vCPU · 32 GB RAM · GPU A10" cost={760} running={false} />
        </div>
      </div>
    </div>
  )
}

// ── Tab 3: 申請記錄 ───────────────────────────────────────────────────────────

interface AppRecord {
  id: string
  model: string
  applicant: string
  date: string
  pts: number
  status: '已核准' | '審核中' | '已拒絕'
}

const appRecords: AppRecord[] = [
  { id: '#REQ-0041', model: 'GPT-4o', applicant: 'Penny Deng', date: '2026-07-10', pts: 200, status: '已核准' },
  { id: '#REQ-0038', model: 'Claude 3.5', applicant: 'Alex Wu', date: '2026-07-08', pts: 500, status: '審核中' },
  { id: '#REQ-0035', model: 'Gemini 1.5 Pro', applicant: 'Iris Chen', date: '2026-07-05', pts: 300, status: '已核准' },
  { id: '#REQ-0031', model: 'GPT-4o mini', applicant: 'Sam Lin', date: '2026-06-30', pts: 100, status: '已拒絕' },
  { id: '#REQ-0028', model: 'Claude 3 Haiku', applicant: 'Penny Deng', date: '2026-06-25', pts: 150, status: '已核准' },
]

interface QuotaRecord {
  date: string
  type: 'add' | 'use' | 'expire'
  description: string
  delta: number
  balance: number
  days: number
}

const quotaRecords: QuotaRecord[] = [
  { date: '2026-07-10', type: 'use', description: 'GPT-4o 申請 #REQ-0041', delta: -200, balance: 1240, days: 3 },
  { date: '2026-07-08', type: 'add', description: '月度配額重置', delta: 2000, balance: 1440, days: 5 },
  { date: '2026-06-30', type: 'expire', description: '6 月未使用點數到期', delta: -560, balance: 0, days: 13 },
  { date: '2026-06-25', type: 'use', description: 'Claude 3 Haiku 申請 #REQ-0028', delta: -150, balance: 560, days: 18 },
  { date: '2026-06-08', type: 'add', description: '主管補充配額', delta: 500, balance: 710, days: 35 },
]

const statusBadgeClass: Record<AppRecord['status'], string> = {
  已核准: 'bg-[color:var(--color-positive-subtle)] text-[color:var(--color-positive)]',
  審核中: 'bg-[color:var(--color-warning-subtle)] text-[color:var(--color-warning)]',
  已拒絕: 'bg-[color:var(--color-negative-subtle)] text-[color:var(--color-negative)]',
}

const typeLabel: Record<QuotaRecord['type'], string> = {
  add: '點數增加',
  use: '點數使用',
  expire: '點數到期',
}
const typeBadgeClass: Record<QuotaRecord['type'], string> = {
  add: 'bg-[color:var(--color-positive-subtle)] text-[color:var(--color-positive)]',
  use: 'bg-[color:var(--color-warning-subtle)] text-[color:var(--color-warning)]',
  expire: 'bg-surface-raised text-fg-muted border border-divider',
}

const appColHelper = createColumnHelper<AppRecord>()
const appColumns = [
  appColHelper.accessor('id', { header: '申請編號', cell: (i) => <span className="font-mono text-caption text-fg-muted">{i.getValue()}</span> }),
  appColHelper.accessor('model', { header: '模型' }),
  appColHelper.accessor('applicant', { header: '申請人' }),
  appColHelper.accessor('date', { header: '申請日期' }),
  appColHelper.accessor('pts', { header: '點數', cell: (i) => <span className="tabular-nums">{i.getValue()}</span> }),
  appColHelper.accessor('status', {
    header: '狀態',
    cell: (i) => {
      const s = i.getValue()
      return <span className={`text-caption font-semibold px-2 py-0.5 rounded-full ${statusBadgeClass[s]}`}>{s}</span>
    },
  }),
]

const quotaColHelper = createColumnHelper<QuotaRecord>()
const quotaColumns = [
  quotaColHelper.accessor('date', { header: '日期' }),
  quotaColHelper.accessor('type', {
    header: '類型',
    cell: (i) => {
      const t = i.getValue()
      return <span className={`text-caption font-semibold px-2 py-0.5 rounded-full ${typeBadgeClass[t]}`}>{typeLabel[t]}</span>
    },
  }),
  quotaColHelper.accessor('description', { header: '描述' }),
  quotaColHelper.accessor('delta', {
    header: '異動點數',
    cell: (i) => {
      const v = i.getValue()
      return (
        <span className={`tabular-nums font-semibold ${v > 0 ? 'text-[color:var(--color-positive)]' : 'text-fg-muted'}`}>
          {v > 0 ? `+${v}` : v}
        </span>
      )
    },
  }),
  quotaColHelper.accessor('balance', { header: '餘額', cell: (i) => <span className="tabular-nums">{i.getValue().toLocaleString()}</span> }),
]

const typeFilterOptions = [
  { value: '', label: '所有類型' },
  { value: 'add', label: '點數增加' },
  { value: 'use', label: '點數使用' },
  { value: 'expire', label: '點數到期' },
]
const rangeFilterOptions = [
  { value: '', label: '所有時間' },
  { value: '7', label: '近 7 天' },
  { value: '30', label: '近 30 天' },
  { value: '90', label: '近 90 天' },
]

function RecordsTab() {
  const [typeFilter, setTypeFilter] = useState('')
  const [rangeFilter, setRangeFilter] = useState('')

  const filteredQuota = useMemo(() => {
    return quotaRecords.filter((r) => {
      const typeOk = !typeFilter || r.type === typeFilter
      const rangeOk = !rangeFilter || r.days <= parseInt(rangeFilter)
      return typeOk && rangeOk
    })
  }, [typeFilter, rangeFilter])

  return (
    <div className="space-y-6">
      {/* Table 1: no filter */}
      <div className="rounded-lg border border-divider bg-surface overflow-hidden">
        <div className="px-5 py-3.5 border-b border-divider">
          <p className="text-body font-semibold text-foreground">模型申請記錄</p>
          <p className="text-caption text-fg-muted">所有已提交的模型使用申請</p>
        </div>
        <DataTable columns={appColumns as any} data={appRecords} />
      </div>

      {/* Table 2: with 2 filters */}
      <div className="rounded-lg border border-divider bg-surface overflow-hidden">
        <div className="px-5 py-3.5 border-b border-divider flex items-center justify-between gap-3">
          <div>
            <p className="text-body font-semibold text-foreground">配額異動明細</p>
            <p className="text-caption text-fg-muted">點數異動與到期記錄</p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              options={typeFilterOptions}
              value={typeFilter}
              onChange={setTypeFilter}
              aria-label="篩選類型"
            />
            <Select
              options={rangeFilterOptions}
              value={rangeFilter}
              onChange={setRangeFilter}
              aria-label="篩選時間範圍"
            />
          </div>
        </div>
        <DataTable columns={quotaColumns as any} data={filteredQuota} />
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeApp, setActiveApp] = useState<AppId>('modelhub')
  const appLabel = APPS.find((a) => a.id === activeApp)?.label ?? 'ModelHub'

  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeApp} onActiveChange={(id) => setActiveApp(id as AppId)}>
        <Tabs defaultValue="reports">
          <AppShell
            layout="primary-sidebar"
            sidebar={<AppSidebar activeApp={activeApp} onAppChange={setActiveApp} />}
            header={
              <PageHeader
                title={appLabel}
                rightSlot={
                  <div className="flex items-center gap-1 ml-auto">
                    <TabsList>
                      <TabsTrigger value="reports">使用報表</TabsTrigger>
                      <TabsTrigger value="quota">配額管理</TabsTrigger>
                      <TabsTrigger value="records">申請記錄</TabsTrigger>
                    </TabsList>
                    <div className="w-px h-5 bg-divider mx-2" />
                    <Button variant="tertiary" size="sm" startIcon={BookOpen}>說明文件</Button>
                    <Button variant="tertiary" size="sm" startIcon={MessageSquare}>意見回饋</Button>
                    <Button variant="secondary" size="sm" startIcon={Settings2}>跨平台設定</Button>
                  </div>
                }
              />
            }
          >
            <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-loose)]">
              <TabsContent value="reports">
                <ReportsTab />
              </TabsContent>
              <TabsContent value="quota">
                <QuotaTab />
              </TabsContent>
              <TabsContent value="records">
                <RecordsTab />
              </TabsContent>
            </div>
          </AppShell>
        </Tabs>
      </SidebarProvider>
    </TooltipProvider>
  )
}
