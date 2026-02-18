export interface EngagementMetrics {
  totalEngagements: number
  activeEngagements: number
  completedEngagements: number
  stalledEngagements: number
  engagementsNeedingFeedback: number
}

export interface RevenueMetrics {
  totalRevenue: number
  monthlyRevenue: number
  quarterlyRevenue: number
  yearlyRevenue: number
  averageOrderValue: number
}

export interface UserMetrics {
  totalClients: number
  newClientsThisMonth: number
  returningClients: number
}

export interface CommunicationMetrics {
  totalMessages: number
  unreadMessages: number
  averageMessagesPerEngagement: number
}

export interface ResourceMetrics {
  totalResources: number
  totalDownloads: number
  totalViews: number
}

export interface QuestionnaireMetrics {
  totalQuestionnaires: number
  pendingQuestionnaires: number
  overdueQuestionnaires: number
  averageCompletionRate: number
}

export interface FeedbackMetrics {
  averageRating: number
  totalFeedback: number
  positiveFeedbackCount: number
  negativeFeedbackCount: number
  neutralFeedbackCount: number
  recommendationRate: number
}

export interface TrendDataPoint {
  date: string
  value: number
}

export interface TopService {
  serviceCode: string
  serviceName: string
  engagementCount: number
  revenue: number
}

export interface TopRatedService {
  serviceCode: string
  serviceName: string
  averageRating: number
  feedbackCount: number
}

export interface DashboardMetrics {
  engagements: EngagementMetrics
  revenue: RevenueMetrics
  users: UserMetrics
  communication: CommunicationMetrics
  resources: ResourceMetrics
  questionnaires: QuestionnaireMetrics
  feedback: FeedbackMetrics
}

export interface DashboardTrends {
  engagements: TrendDataPoint[]
  revenue: TrendDataPoint[]
}

export interface DashboardTopPerformers {
  services: TopService[]
  rated: TopRatedService[]
}

export interface DashboardSummary {
  totalEngagements: number
  activeEngagements: number
  completedEngagements: number
  stalledEngagements: number
  totalRevenue: number
  monthlyRevenue: number
  totalClients: number
  unreadMessages: number
  pendingQuestionnaires: number
  averageRating: number
}

export interface DashboardResponse {
  realtime: boolean
  snapshotDate: string
  summary?: DashboardSummary
  metrics?: DashboardMetrics
  trends?: DashboardTrends
  topPerformers?: DashboardTopPerformers
}

export interface DashboardFilters {
  startDate?: string
  endDate?: string
  serviceCode?: string
}

export interface DashboardStatsData {
  snapshotDate: string
  cacheDuration: number
  metrics: DashboardMetrics
  trends: DashboardTrends
  topPerformers: DashboardTopPerformers
}

export interface RefreshDashboardResponse {
  success: boolean
  message: string
}