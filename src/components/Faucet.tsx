import { motion } from 'framer-motion';
import { CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

function Faucet() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Token Faucet</h2>
      <p className="text-gray-400">Get test tokens to explore the platform</p>

      <div className="max-w-md mx-auto">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <CurrencyDollarIcon className="w-12 h-12 text-accent" />
              <div className="text-center">
                <h3 className="text-2xl font-bold">100 AAI</h3>
                <p className="text-gray-400">Available per request</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cooldown Period</span>
                <div className="flex items-center text-gray-300">
                  <ClockIcon className="w-5 h-5 mr-1" />
                  <span>24 hours</span>
                </div>
              </div>

              <button className="btn-primary w-full">
                Request Tokens
              </button>

              <p className="text-sm text-gray-400 text-center">
                These tokens are for testing purposes only and have no real value.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Faucet;