// 'use client'



// import { useEffect } from 'react'
// import Link from 'next/link'
// import { useBlueprint } from '@/hooks/useBlueprint'
// import { Button } from '@/components/ui/Button'
// import { Card, CardBody, CardHeader } from '@/components/ui/Card'

// export default function AdminDashboardPage() {
//   const { blueprints, isLoading, fetchBlueprints } = useBlueprint()

//   useEffect(() => {
//     fetchBlueprints(true) // Fetch only active blueprints
//   }, [fetchBlueprints])

//   const stats = [
//     { label: 'Total Blueprints', value: blueprints.length },
//     { label: 'Active Services', value: blueprints.filter(b => b.isActive).length },
//     { label: 'Total Milestones', value: blueprints.reduce((acc, b) => acc + b.milestones.length, 0) },
//     { label: 'Total Resources', value: blueprints.reduce((acc, b) => acc + b.resources.length, 0) }
//   ]

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//         <Link href="/admin/blueprints/new">
//           <Button variant="primary">Create New Blueprint</Button>
//         </Link>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardBody>
//               <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//             </CardBody>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Blueprints */}
//       <Card>
//         <CardHeader>
//           <h2 className="text-lg font-semibold text-gray-900">Recent Blueprints</h2>
//         </CardHeader>
//         <CardBody>
//           {isLoading ? (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
//             </div>
//           ) : blueprints.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 mb-4">No blueprints created yet</p>
//               <Link href="/admin/blueprints/new">
//                 <Button variant="primary">Create Your First Blueprint</Button>
//               </Link>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {blueprints.slice(0, 5).map((blueprint) => (
//                 <div key={blueprint.serviceCode} className="py-4 flex justify-between items-center">
//                   <div>
//                     <h3 className="font-medium text-gray-900">{blueprint.serviceName}</h3>
//                     <p className="text-sm text-gray-500">Code: {blueprint.serviceCode}</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       blueprint.isActive 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {blueprint.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     <Link href={`/admin/blueprints/${blueprint.serviceCode}`}>
//                       <Button variant="outline" size="sm">Edit</Button>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardBody>
//       </Card>
//     </div>
//   )
// }

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/protected/dashboard')
  }, [router])

  return null
}