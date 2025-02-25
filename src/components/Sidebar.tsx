import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, CubeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Marketplace', icon: ShoppingCartIcon, path: '/marketplace' },
  { name: 'Mining', icon: CubeIcon, path: '/mining' },
  { name: 'Faucet', icon: CurrencyDollarIcon, path: '/faucet' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-secondary p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Alpha Storage</h1>
        <p className="text-sm text-gray-400">Decentralized Storage Platform</p>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-accent text-white' : 'text-gray-400 hover:bg-primary hover:text-white'}`}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          <p>Network Status: Online</p>
          <p>Storage Used: 45.3 GB</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;