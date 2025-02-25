import { motion } from 'framer-motion';
import { CurrencyDollarIcon, CloudArrowUpIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const storageOptions = [
  {
    id: 1,
    name: 'Basic Storage',
    space: '100 GB',
    price: '100 AAI',
    features: ['Basic encryption', 'Monthly backup', '24/7 support'],
  },
  {
    id: 2,
    name: 'Professional Storage',
    space: '500 GB',
    price: '400 AAI',
    features: ['Advanced encryption', 'Daily backup', 'Priority support', 'File versioning'],
  },
  {
    id: 3,
    name: 'Enterprise Storage',
    space: '2 TB',
    price: '1500 AAI',
    features: ['Military-grade encryption', 'Real-time backup', 'Dedicated support', 'Advanced analytics'],
  },
];

function Marketplace() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Storage Marketplace</h2>
      <p className="text-gray-400">Choose the perfect storage plan for your needs</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storageOptions.map((option, index) => (
          <motion.div
            key={option.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{option.name}</h3>
              <div className="flex items-center space-x-2">
                <CloudArrowUpIcon className="w-6 h-6 text-accent" />
                <span className="text-2xl font-bold">{option.space}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="w-6 h-6 text-green-500" />
                <span className="text-2xl font-bold">{option.price}</span>
              </div>
              <ul className="space-y-2">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <ShieldCheckIcon className="w-5 h-5 text-accent" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full">Purchase Now</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;