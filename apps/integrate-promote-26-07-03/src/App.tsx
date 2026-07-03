import { useState, type ReactElement } from 'react'
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Field,
  FieldLabel,
  FieldGroup,
  FieldDescription,
  Input,
  Textarea,
  Select,
  Badge,
  Checkbox,
  Separator,
  Tag,
} from '@qijenchen/design-system'
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  ChevronRight,
  Calendar,
  Folder,
  CheckSquare,
  Upload,
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
} from 'lucide-react'

// ── Nav ──
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FileText },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

// ── Mock data: ticket list ──
const TICKETS = [
  { id: 'PROJ-1042', title: 'Integrate Payment Gateway v3', status: 'In Progress', priority: 'High', assignee: 'Alex Chen', updated: '2026-07-02', promoteCount: 32 },
  { id: 'PROJ-1038', title: 'Refactor Auth Module', status: 'Review', priority: 'Medium', assignee: 'Sam Lee', updated: '2026-07-01', promoteCount: 3 },
  { id: 'PROJ-1031', title: 'Update Notification System', status: 'In Progress', priority: 'High', assignee: 'Jamie Wu', updated: '2026-06-30', promoteCount: 28 },
  { id: 'PROJ-1025', title: 'Migrate Legacy DB Schema', status: 'Blocked', priority: 'Critical', assignee: 'Taylor Kim', updated: '2026-06-29', promoteCount: 3 },
  { id: 'PROJ-1019', title: 'Add Dark Mode Support', status: 'Open', priority: 'Low', assignee: 'Morgan Liu', updated: '2026-06-28', promoteCount: 8 },
  { id: 'PROJ-1011', title: 'Performance Audit Q2', status: 'Open', priority: 'Medium', assignee: 'Riley Park', updated: '2026-06-27', promoteCount: 3 },
  { id: 'PROJ-1007', title: 'Security Patch Rollout', status: 'Done', priority: 'Critical', assignee: 'Jordan Chen', updated: '2026-06-25', promoteCount: 15 },
  { id: 'PROJ-0998', title: 'API Rate Limiting', status: 'Done', priority: 'High', assignee: 'Casey Wang', updated: '2026-06-22', promoteCount: 3 },
]

// ── Mock data: promote items (32 items for demo) ──
const PROMOTE_ITEMS_FULL = Array.from({ length: 32 }, (_, i) => ({
  id: `pkg-${String(i + 1).padStart(3, '0')}`,
  name: `payment-service-v${3 + Math.floor(i / 8)}.${i % 8}.${Math.floor(Math.random() * 10)}`,
  target: ['staging', 'uat', 'pre-prod', 'prod'][i % 4],
  status: (['pending', 'ready', 'failed', 'ready', 'pending'] as const)[i % 5],
  size: `${(Math.random() * 50 + 5).toFixed(1)} MB`,
  owner: ['Alex Chen', 'Sam Lee', 'Jamie Wu', 'Taylor Kim'][i % 4],
  branch: `feature/payment-v3-${i % 8 === 0 ? 'main' : `chunk-${i % 8}`}`,
  commitHash: Math.random().toString(16).slice(2, 10),
  builtAt: `2026-07-0${(i % 3) + 1} ${String(9 + (i % 12)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
  dependencies: i % 3 === 0 ? `pkg-${String(i).padStart(3, '0')}` : null,
}))

const PROMOTE_ITEMS_SHORT = PROMOTE_ITEMS_FULL.slice(0, 3)

// ── Mock data: subtasks ──
const SUBTASKS = Array.from({ length: 30 }, (_, i) => ({
  id: `SUB-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Update payment SDK to v3.2.1',
    'Migrate webhook endpoint schema',
    'Write unit tests for charge flow',
    'Update error handling middleware',
    'Refactor retry logic',
    'Add idempotency key support',
    'Update API documentation',
    'Configure staging environment',
    'Validate 3DS authentication flow',
    'Performance test under 1000 TPS',
    'Update CORS policy',
    'Add audit log for transactions',
    'Update currency rounding logic',
    'Fix decimal precision bug',
    'Add webhook signature verification',
    'Update refund flow',
    'Migrate legacy charge records',
    'Add rate limiting per merchant',
    'Update SDK consumer guide',
    'QA regression on checkout flow',
    'Fix tokenization edge case',
    'Update fraud detection rules',
    'Add multi-currency support',
    'Test payment failure recovery',
    'Update merchant dashboard API',
    'Security audit sign-off',
    'Load test payment gateway',
    'Update SLA monitoring',
    'Finalize rollback plan',
    'Deploy to production',
  ][i],
  status: (['done', 'in-progress', 'open', 'blocked', 'done'] as const)[i % 5],
  assignee: ['Alex Chen', 'Sam Lee', 'Jamie Wu', 'Taylor Kim', 'Morgan Liu'][i % 5],
  priority: (['high', 'medium', 'low', 'critical'] as const)[i % 4],
}))

// ── Mock data: members ──
const MEMBERS = [
  { role: 'PM', name: 'Jordan Chen', email: 'jordan@acme.com', color: 'blue' as const },
  { role: 'Tech Lead', name: 'Alex Chen', email: 'alex@acme.com', color: 'green' as const },
  { role: 'Executor', name: 'Sam Lee', email: 'sam@acme.com', color: 'orange' as const },
  { role: 'Executor', name: 'Jamie Wu', email: 'jamie@acme.com', color: 'purple' as const },
  { role: 'QA', name: 'Taylor Kim', email: 'taylor@acme.com', color: 'red' as const },
  { role: 'DevOps', name: 'Morgan Liu', email: 'morgan@acme.com', color: 'yellow' as const },
  { role: 'User (Requester)', name: 'Riley Park', email: 'riley@biz.com', color: 'indigo' as const },
  { role: 'Stakeholder', name: 'Casey Wang', email: 'casey@acme.com', color: 'turquoise' as const },
]

// ── Status helpers ──
const STATUS_COLORS: Record<string, string> = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Review': 'bg-purple-100 text-purple-700',
  'Blocked': 'bg-red-100 text-red-700',
  'Open': 'bg-gray-100 text-gray-600',
  'Done': 'bg-green-100 text-green-700',
}

const PRIORITY_COLORS: Record<string, string> = {
  'Critical': 'text-red-600',
  'High': 'text-orange-500',
  'Medium': 'text-yellow-600',
  'Low': 'text-gray-400',
}

const PROMOTE_STATUS_ICON = {
  ready: <CheckCircle2 size={14} className="text-green-600" />,
  pending: <Clock size={14} className="text-yellow-600" />,
  failed: <AlertCircle size={14} className="text-red-600" />,
}

// ── Promote card ──
function PromoteCard({
  item,
  selectable,
  selected,
  onToggle,
}: {
  item: typeof PROMOTE_ITEMS_FULL[0]
  selectable: boolean
  selected: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`rounded-lg border p-[var(--layout-space-tight)] flex gap-3 transition-colors ${
        selected ? 'border-primary bg-primary/5' : 'border-border bg-surface'
      }`}
    >
      {selectable && (
        <div className="pt-0.5">
          <Checkbox checked={selected} onCheckedChange={onToggle} aria-label={`Select ${item.name}`} />
        </div>
      )}
      <div className="flex-1 min-w-0 grid grid-cols-2 gap-x-[var(--layout-space-loose)] gap-y-1">
        <div className="col-span-2 flex items-center gap-2 mb-1">
          <Package size={14} className="text-fg-secondary shrink-0" />
          <span className="text-body-sm font-medium truncate">{item.name}</span>
          <span className="shrink-0 flex items-center gap-1">
            {PROMOTE_STATUS_ICON[item.status]}
            <span className="text-caption text-fg-secondary capitalize">{item.status}</span>
          </span>
        </div>
        <div className="text-caption text-fg-secondary">Target: <span className="text-fg font-medium">{item.target}</span></div>
        <div className="text-caption text-fg-secondary">Size: <span className="text-fg">{item.size}</span></div>
        <div className="text-caption text-fg-secondary">Owner: <span className="text-fg">{item.owner}</span></div>
        <div className="text-caption text-fg-secondary">Built: <span className="text-fg">{item.builtAt}</span></div>
        <div className="col-span-2 text-caption text-fg-secondary font-mono truncate">Branch: {item.branch} · {item.commitHash}</div>
        {item.dependencies && (
          <div className="col-span-2 text-caption text-yellow-600 flex items-center gap-1">
            <AlertCircle size={12} /> Depends on {item.dependencies}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Ticket detail modal ──
function TicketModal({ ticket }: { ticket: typeof TICKETS[0] }) {
  const [activeTab, setActiveTab] = useState('info')
  const promoteItems = ticket.promoteCount > 3 ? PROMOTE_ITEMS_FULL : PROMOTE_ITEMS_SHORT
  const isLargeSet = ticket.promoteCount > 3
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [promoted, setPromoted] = useState(false)

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedIds.size === promoteItems.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(promoteItems.map(i => i.id)))
    }
  }

  const readyCount = promoteItems.filter(i => i.status === 'ready').length
  const pendingCount = promoteItems.filter(i => i.status === 'pending').length

  return (
    <DialogContent maxWidth={860} className="h-[88vh] flex flex-col">
      <DialogHeader>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-caption text-fg-secondary shrink-0">{ticket.id}</span>
          <DialogTitle className="truncate">{ticket.title}</DialogTitle>
          <span className={`shrink-0 text-caption px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[ticket.status]}`}>
            {ticket.status}
          </span>
        </div>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
        <div className="px-[var(--layout-space-loose)]">
          <TabsList>
            <TabsTrigger value="info" startIcon={FileText}>Info</TabsTrigger>
            <TabsTrigger value="tasks" startIcon={CheckSquare} badge={<Badge count={30} variant="low" />}>Tasks</TabsTrigger>
            <TabsTrigger value="members" startIcon={Users} badge={<Badge count={8} variant="low" />}>Members</TabsTrigger>
            <TabsTrigger
              value="promote"
              startIcon={Upload}
              badge={<Badge count={ticket.promoteCount} variant={pendingCount > 0 ? 'high' : 'low'} />}
            >
              Promote
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Info Tab ── */}
        <TabsContent value="info" className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] space-y-[var(--layout-space-loose)]">

            {/* 基本資訊 */}
            <section>
              <h3 className="text-body-sm font-semibold text-fg-secondary uppercase tracking-wide mb-[var(--layout-space-tight)]">基本資訊</h3>
              <FieldGroup>
                <Field required>
                  <FieldLabel>專案名稱</FieldLabel>
                  <Input defaultValue={ticket.title} />
                </Field>
                <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
                  <Field required>
                    <FieldLabel>計劃開始時間</FieldLabel>
                    <Input type="date" defaultValue="2026-06-01" />
                  </Field>
                  <Field required>
                    <FieldLabel>計劃結束時間</FieldLabel>
                    <Input type="date" defaultValue="2026-07-31" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
                  <Field>
                    <FieldLabel>執行開始時間</FieldLabel>
                    <Input type="date" defaultValue="2026-06-08" />
                  </Field>
                  <Field>
                    <FieldLabel>執行結束時間</FieldLabel>
                    <Input type="date" defaultValue="2026-07-25" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>優先級</FieldLabel>
                  <Select
                    value="high"
                    options={[
                      { value: 'critical', label: 'Critical' },
                      { value: 'high', label: 'High' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'low', label: 'Low' },
                    ]}
                  />
                </Field>
                <Field>
                  <FieldLabel>負責人</FieldLabel>
                  <Input defaultValue={ticket.assignee} />
                </Field>
                <Field>
                  <FieldLabel>專案描述</FieldLabel>
                  <Textarea rows={4} defaultValue="整合第三方支付 Gateway v3 版本，包含 SDK 升級、Webhook schema 遷移、3DS 驗證流程更新，以及上下游服務的相容性調整。預計影響結帳、退款、對帳三個核心模組。" />
                </Field>
              </FieldGroup>
            </section>

            <Separator />

            {/* 資料夾欄位設定 */}
            <section>
              <h3 className="text-body-sm font-semibold text-fg-secondary uppercase tracking-wide mb-[var(--layout-space-tight)]">資料夾欄位設定</h3>
              <FieldGroup>
                <Field required>
                  <FieldLabel>Source 路徑</FieldLabel>
                  <Input defaultValue="/repos/payment-service/src" placeholder="/path/to/source" />
                  <FieldDescription>程式碼來源目錄</FieldDescription>
                </Field>
                <Field required>
                  <FieldLabel>Build Output 路徑</FieldLabel>
                  <Input defaultValue="/repos/payment-service/dist" placeholder="/path/to/build" />
                  <FieldDescription>編譯產出目錄</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel>Config 路徑</FieldLabel>
                  <Input defaultValue="/repos/payment-service/config/prod" placeholder="/path/to/config" />
                  <FieldDescription>環境設定檔案目錄</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel>Log 輸出路徑</FieldLabel>
                  <Input defaultValue="/var/log/payment-service" placeholder="/path/to/logs" />
                </Field>
                <Field>
                  <FieldLabel>Backup 路徑</FieldLabel>
                  <Input defaultValue="/backup/payment-service/2026-07" placeholder="/path/to/backup" />
                  <FieldDescription>promote 前的備份目錄，自動帶入日期</FieldDescription>
                </Field>
                <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
                  <Field>
                    <FieldLabel>Target 環境</FieldLabel>
                    <Select
                      value="uat"
                      options={[
                        { value: 'staging', label: 'Staging' },
                        { value: 'uat', label: 'UAT' },
                        { value: 'pre-prod', label: 'Pre-Prod' },
                        { value: 'prod', label: 'Production' },
                      ]}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Deploy Region</FieldLabel>
                    <Select
                      value="ap-east"
                      options={[
                        { value: 'ap-east', label: 'AP East' },
                        { value: 'ap-south', label: 'AP South' },
                        { value: 'us-west', label: 'US West' },
                        { value: 'eu-central', label: 'EU Central' },
                      ]}
                    />
                  </Field>
                </div>
              </FieldGroup>
            </section>

            <Separator />

            {/* 驗收條件 */}
            <section>
              <h3 className="text-body-sm font-semibold text-fg-secondary uppercase tracking-wide mb-[var(--layout-space-tight)]">驗收條件</h3>
              <FieldGroup>
                <Field>
                  <FieldLabel>Acceptance Criteria</FieldLabel>
                  <Textarea rows={5} defaultValue={"1. 所有支付流程單元測試通過率 ≥ 95%\n2. UAT 環境壓力測試 1000 TPS 下無錯誤\n3. 3DS 驗證流程 E2E 測試通過\n4. 退款 API 相容舊版格式\n5. 監控告警設定完成"} />
                </Field>
                <Field>
                  <FieldLabel>測試報告連結</FieldLabel>
                  <Input defaultValue="https://confluence.acme.com/display/PAY/v3-test-report" />
                </Field>
                <Field>
                  <FieldLabel>PR / MR 連結</FieldLabel>
                  <Input defaultValue="https://github.com/acme/payment-service/pull/482" />
                </Field>
              </FieldGroup>
            </section>

            <Separator />

            {/* 風險與備注 */}
            <section>
              <h3 className="text-body-sm font-semibold text-fg-secondary uppercase tracking-wide mb-[var(--layout-space-tight)]">風險與備注</h3>
              <FieldGroup>
                <Field>
                  <FieldLabel>已知風險</FieldLabel>
                  <Textarea rows={4} defaultValue={"1. Safari 17 下 3DS iframe 可能有渲染延遲（已有 workaround）\n2. 舊版 SDK 消費方需額外升級（預計影響 3 個內部服務）\n3. 對帳批次在切換期間需暫停 2 小時"} />
                </Field>
                <Field>
                  <FieldLabel>Rollback 計劃</FieldLabel>
                  <Textarea rows={3} defaultValue="Rollback 指令：deploy rollback --tag v2.9.4 --env prod。預估回滾時間：15 分鐘。備份已於 2026-07-01 完成。" />
                </Field>
                <Field>
                  <FieldLabel>備注</FieldLabel>
                  <Textarea rows={3} defaultValue="請在 07/05（五）上午 10:00 前完成 UAT sign-off，否則延至下週 release window。" />
                </Field>
                <Field>
                  <FieldLabel>標籤</FieldLabel>
                  <div className="flex gap-2 flex-wrap pt-1">
                    {['payment', 'v3', 'breaking-change', 'gateway'].map(t => (
                      <Tag key={t} color="blue">{t}</Tag>
                    ))}
                  </div>
                </Field>
              </FieldGroup>
            </section>

            <Separator />

            {/* 稽核資訊 */}
            <section>
              <h3 className="text-body-sm font-semibold text-fg-secondary uppercase tracking-wide mb-[var(--layout-space-tight)]">稽核資訊</h3>
              <div className="grid grid-cols-2 gap-x-[var(--layout-space-loose)] gap-y-3">
                {[
                  { label: '建立者', value: 'Jordan Chen' },
                  { label: '建立時間', value: '2026-06-01 09:30' },
                  { label: '最後修改者', value: 'Alex Chen' },
                  { label: '最後修改時間', value: '2026-07-02 14:22' },
                  { label: '版本', value: 'v1.8' },
                  { label: '工單ID', value: ticket.id },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-caption text-fg-secondary">{label}</div>
                    <div className="text-body-sm text-fg">{value}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </TabsContent>

        {/* ── Tasks Tab ── */}
        <TabsContent value="tasks" className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)]">
            <div className="flex items-center justify-between mb-[var(--layout-space-tight)]">
              <p className="text-caption text-fg-secondary">30 個子任務 · 12 已完成 · 3 被封鎖</p>
              <Button variant="tertiary" size="sm">+ 新增子任務</Button>
            </div>
            <div className="space-y-2">
              {SUBTASKS.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    task.status === 'done' ? 'bg-green-500'
                    : task.status === 'in-progress' ? 'bg-blue-500'
                    : task.status === 'blocked' ? 'bg-red-500'
                    : 'bg-gray-300'
                  }`} />
                  <span className="text-caption text-fg-secondary w-20 shrink-0">{task.id}</span>
                  <span className="text-body-sm flex-1 truncate">{task.title}</span>
                  <span className={`text-caption shrink-0 ${PRIORITY_COLORS[task.priority] || 'text-fg-secondary'}`}>
                    {task.priority}
                  </span>
                  <span className="text-caption text-fg-secondary shrink-0 w-24 text-right truncate">{task.assignee}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── Members Tab ── */}
        <TabsContent value="members" className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)]">
            <div className="flex items-center justify-between mb-[var(--layout-space-tight)]">
              <p className="text-caption text-fg-secondary">8 位成員</p>
              <Button variant="tertiary" size="sm">+ 新增成員</Button>
            </div>
            <div className="space-y-2">
              {MEMBERS.map((member) => (
                <div key={member.email} className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-3">
                  <ItemAvatar alt={member.name} color={member.color} />
                  <div className="flex-1 min-w-0">
                    <div className="text-body-sm font-medium">{member.name}</div>
                    <div className="text-caption text-fg-secondary">{member.email}</div>
                  </div>
                  <span className="text-caption text-fg-secondary shrink-0 bg-muted px-2 py-0.5 rounded-full">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── Promote Tab ── */}
        <TabsContent value="promote" className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] space-y-[var(--layout-space-tight)]">

            {/* Status bar */}
            <div className="rounded-lg bg-muted/50 border border-border px-[var(--layout-space-tight)] py-3 flex items-center gap-[var(--layout-space-loose)] flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-green-600" />
                <span className="text-body-sm">{readyCount} Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-yellow-600" />
                <span className="text-body-sm">{pendingCount} Pending</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle size={14} className="text-red-600" />
                <span className="text-body-sm">{promoteItems.filter(i => i.status === 'failed').length} Failed</span>
              </div>
              <div className="ml-auto text-caption text-fg-secondary">Target: UAT → Pre-Prod</div>
            </div>

            {/* Large set: select header */}
            {isLargeSet && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedIds.size === promoteItems.length}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                  <span className="text-body-sm text-fg-secondary">
                    {selectedIds.size > 0 ? `已選取 ${selectedIds.size} / ${promoteItems.length} 筆` : `全選（${promoteItems.length} 筆）`}
                  </span>
                </div>
                {selectedIds.size > 0 && (
                  <span className="text-caption text-fg-secondary">
                    {Array.from(selectedIds).filter(id => promoteItems.find(i => i.id === id)?.status === 'ready').length} 筆可立即 promote
                  </span>
                )}
              </div>
            )}

            {/* Cards */}
            <div className="space-y-2">
              {promoteItems.map((item) => (
                <PromoteCard
                  key={item.id}
                  item={item}
                  selectable={isLargeSet}
                  selected={selectedIds.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>

            {/* Promote action */}
            <div className="sticky bottom-0 bg-surface border-t border-border py-3 flex items-center justify-between gap-3 min-w-0">
              {promoted ? (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 size={16} />
                  <span className="text-body-sm font-medium">Promote 已送出！系統正在處理中。</span>
                </div>
              ) : (
                <>
                  <span className="text-caption text-fg-secondary min-w-0 truncate">
                    {isLargeSet
                      ? selectedIds.size === 0
                        ? '請選擇要 promote 的套件'
                        : `將 promote ${selectedIds.size} 個套件`
                      : `將 promote 全部 ${promoteItems.length} 個套件`
                    }
                  </span>
                  <Button
                    variant="primary"
                    startIcon={Upload}
                    disabled={isLargeSet && selectedIds.size === 0}
                    onClick={() => setPromoted(true)}
                    className="shrink-0"
                  >
                    {isLargeSet && selectedIds.size > 0 ? `Promote (${selectedIds.size})` : 'Promote'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button variant="tertiary">關閉</Button>
        <Button variant="primary">儲存變更</Button>
      </DialogFooter>
    </DialogContent>
  )
}

// ── Ticket list page ──
function ProjectsPage() {
  const [openTicketId, setOpenTicketId] = useState<string | null>(null)
  const openTicket = TICKETS.find(t => t.id === openTicketId)

  return (
    <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)]">
      <div className="flex items-center justify-between mb-[var(--layout-space-tight)]">
        <p className="text-caption text-fg-secondary">{TICKETS.length} 個工單</p>
        <Button variant="primary" size="sm">+ 新建工單</Button>
      </div>

      {/* List header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-3 pb-2 text-caption text-fg-secondary border-b border-border">
        <span>工單</span>
        <span>狀態</span>
        <span>優先級</span>
        <span>負責人</span>
        <span>更新</span>
      </div>

      {/* List rows */}
      <div className="divide-y divide-border">
        {TICKETS.map((ticket) => (
          <Dialog
            key={ticket.id}
            open={openTicketId === ticket.id}
            onOpenChange={(open) => setOpenTicketId(open ? ticket.id : null)}
          >
            <DialogTrigger asChild>
              <button className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-3 py-3 text-left hover:bg-muted/50 transition-colors items-center">
                <div className="min-w-0">
                  <span className="text-caption text-fg-secondary mr-2">{ticket.id}</span>
                  <span className="text-body-sm font-medium">{ticket.title}</span>
                </div>
                <span className={`text-caption px-2 py-0.5 rounded-full font-medium w-fit ${STATUS_COLORS[ticket.status]}`}>
                  {ticket.status}
                </span>
                <span className={`text-body-sm ${PRIORITY_COLORS[ticket.priority]}`}>{ticket.priority}</span>
                <span className="text-body-sm text-fg-secondary truncate">{ticket.assignee}</span>
                <div className="flex items-center gap-2">
                  <span className="text-caption text-fg-muted">{ticket.updated}</span>
                  <ChevronRight size={14} className="text-fg-muted" />
                </div>
              </button>
            </DialogTrigger>
            <TicketModal ticket={ticket} />
          </Dialog>
        ))}
      </div>
    </div>
  )
}

// ── Sidebar ──
function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 min-w-0 group-data-[collapsible=icon]:justify-center">
          <Avatar alt="Acme Product" size={24} shape="square" color="blue" solid />
          <span className="text-body-lg font-medium truncate group-data-[collapsible=icon]:hidden">Acme DevOps</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label} isActive={id === 'projects'}>
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
              <div role="group" aria-label="Current user">
                <ItemAvatar alt="Penny Deng" color="blue" />
                <span data-sidebar="menu-label" className="min-w-0 flex-1 truncate">Penny Deng</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function PageHeader({ title, rightSlot }: { title: string; rightSlot?: ReactElement<any, any> }) {
  return (
    <ChromeHeader className="bg-surface">
      <SidebarTrigger />
      <h1 className="text-body-lg font-medium flex-1 truncate">{title}</h1>
      {rightSlot}
    </ChromeHeader>
  )
}

// ── Root ──
export default function App() {
  const [activeId, setActiveId] = useState<string>('projects')

  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeId} onActiveChange={setActiveId}>
        <AppShell
          layout="primary-sidebar"
          sidebar={<AppSidebar />}
          header={
            <PageHeader
              title="Projects"
              rightSlot={<Button variant="primary" size="md">+ New ticket</Button>}
            />
          }
        >
          <ProjectsPage />
        </AppShell>
      </SidebarProvider>
    </TooltipProvider>
  )
}
