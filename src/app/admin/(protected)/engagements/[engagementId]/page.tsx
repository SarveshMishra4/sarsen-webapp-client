// ✅ FORCE dynamic rendering so Vercel does NOT prerender this route
// export const dynamic = 'force-dynamic'

// import AdminEngagementClient from './AdminEngagementClient'
// export default function Page({
//   params,
// }: {
//   params: { engagementId: string }
// }) {
//   return (
//     <AdminEngagementClient engagementId={params.engagementId} />
//   )
// }

export const dynamic = 'force-dynamic'

export default function Page() {
  return <div>HELLO ENGAGEMENT</div>
}