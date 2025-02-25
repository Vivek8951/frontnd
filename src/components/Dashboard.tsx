import { motion } from 'framer-motion';
import { ChartBarIcon, CloudIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Storage', value: '128 GB', icon: CloudIcon },
  { name: 'Used Storage', value: '45.3 GB', icon: ChartBarIcon },
  { name: 'Earnings', value: '1,234 AAI', icon: CurrencyDollarIcon },
];

const recentActivity = [
  { id: 1, action: 'File Upload', file: 'document.pdf', size: '2.5 MB', timestamp: '2 mins ago' },
  { id: 2, action: 'File Download', file: 'image.jpg', size: '1.8 MB', timestamp: '5 mins ago' },
  { id: 3, action: 'Mining Reward', file: '-', size: '-', timestamp: '10 mins ago' },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <stat.icon className="w-8 h-8 text-accent mr-3" />
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-3">Action</th>
                <th className="pb-3">File</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="border-t border-gray-700">
                  <td className="py-3">{activity.action}</td>
                  <td className="py-3">{activity.file}</td>
                  <td className="py-3">{activity.size}</td>
                  <td className="py-3 text-gray-400">{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;