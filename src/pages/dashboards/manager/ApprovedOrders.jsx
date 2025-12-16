// client/src/pages/dashboard/manager/ApprovedOrders.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { orderAPI } from '../../../services/api';
import { 
  FaSearch, 
  FaFilter, 
  FaTruck, 
  FaEye, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaBox,
  FaCheckCircle,
  FaPlus,
  FaSpinner,
  FaHistory
} from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ApprovedOrders = () => {
  const { isDark } = useTheme();
  
  // Set page title
  useEffect(() => {
    document.title = 'Approved Orders | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [addingTracking, setAddingTracking] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch approved orders
  const fetchApprovedOrders = async () => {
    setLoading(true);
    try {
      const response = await orderAPI.getApprovedOrders();
      setOrders(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching approved orders:', error);
      toast.error('Failed to load approved orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (order.trackingStatus && order.trackingStatus.toLowerCase() === filterStatus);
    
    return matchesSearch && matchesStatus;
  });

  // Track status options
  const trackStatusOptions = [
    { value: 'cutting', label: 'Cutting Completed', icon: '✂️', color: 'blue' },
    { value: 'sewing', label: 'Sewing Started', icon: '🧵', color: 'purple' },
    { value: 'finishing', label: 'Finishing', icon: '✨', color: 'indigo' },
    { value: 'qc', label: 'QC Checked', icon: '✅', color: 'green' },
    { value: 'packed', label: 'Packed', icon: '📦', color: 'yellow' },
    { value: 'shipped', label: 'Shipped', icon: '🚚', color: 'orange' },
    { value: 'delivered', label: 'Delivered', icon: '🏠', color: 'emerald' }
  ];

  // Add tracking update
  const handleAddTracking = (orderId) => {
    setSelectedOrder(orders.find(o => o._id === orderId));
    setAddingTracking(orderId);
  };

  const submitTrackingUpdate = async (status, notes) => {
    if (!selectedOrder) return;

    try {
      const trackingData = {
        status,
        notes: notes || '',
        location: 'Factory', // In real app, get from input
        date: new Date().toISOString()
      };

      const response = await orderAPI.updateTracking(selectedOrder._id, trackingData);
      
      if (response.data.success) {
        toast.success('Tracking updated successfully!');
        
        // Update local state
        setOrders(orders.map(order => 
          order._id === selectedOrder._id 
            ? { 
                ...order, 
                trackingStatus: status,
                trackingUpdates: [...(order.trackingUpdates || []), trackingData]
              }
            : order
        ));
        
        setSelectedOrder(null);
        setAddingTracking(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update tracking');
    }
  };

  const openTrackingModal = () => {
    if (!selectedOrder) return;

    Swal.fire({
      title: 'Add Tracking Update',
      html: `
        <div class="text-left">
          <div class="mb-4">
            <p><strong>Order ID:</strong> ${selectedOrder._id?.slice(-8).toUpperCase()}</p>
            <p><strong>Product:</strong> ${selectedOrder.productName}</p>
            <p><strong>Buyer:</strong> ${selectedOrder.buyerName}</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Current Status</label>
            <div class="grid grid-cols-2 gap-2">
              ${trackStatusOptions.map(option => `
                <button 
                  type="button" 
                  class="p-3 rounded-lg text-center border transition-colors"
                  onclick="window.selectTrackingStatus('${option.value}')"
                  id="status-${option.value}"
                >
                  <div class="text-xl mb-1">${option.icon}</div>
                  <div class="text-xs">${option.label}</div>
                </button>
              `).join('')}
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Location</label>
            <input 
              type="text" 
              id="tracking-location" 
              class="w-full p-2 border rounded" 
              placeholder="Factory/Shipping Center"
              value="Factory"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Notes (Optional)</label>
            <textarea 
              id="tracking-notes" 
              class="w-full p-2 border rounded" 
              rows="3"
              placeholder="Add any additional notes..."
            ></textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Update Tracking',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        // Add click handlers for status buttons
        window.selectTrackingStatus = (status) => {
          // Remove selected class from all buttons
          trackStatusOptions.forEach(option => {
            const btn = document.getElementById(`status-${option.value}`);
            btn.classList.remove('bg-orange-500', 'text-white', 'border-orange-500');
            btn.classList.add('border-gray-300');
          });
          
          // Add selected class to clicked button
          const selectedBtn = document.getElementById(`status-${status}`);
          selectedBtn.classList.add('bg-orange-500', 'text-white', 'border-orange-500');
          selectedBtn.classList.remove('border-gray-300');
          
          // Store selected status
          window.selectedStatus = status;
        };
        
        // Select first status by default
        window.selectTrackingStatus(trackStatusOptions[0].value);
      },
      preConfirm: () => {
        const notes = document.getElementById('tracking-notes').value;
        return {
          status: window.selectedStatus,
          notes: notes
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        submitTrackingUpdate(result.value.status, result.value.notes);
      }
    });
  };

  // View tracking history
  const viewTrackingHistory = (order) => {
    const trackingUpdates = order.trackingUpdates || [];
    
    Swal.fire({
      title: 'Tracking History',
      html: `
        <div class="text-left">
          <div class="mb-4">
            <h3 class="font-bold text-lg mb-2">Order: ${order.productName}</h3>
            <p><strong>Order ID:</strong> ${order._id?.slice(-8).toUpperCase()}</p>
            <p><strong>Buyer:</strong> ${order.buyerName}</p>
          </div>
          
          <div class="space-y-4">
            ${trackingUpdates.length > 0 ? trackingUpdates.map((update, index) => `
              <div class="border-l-4 border-orange-500 pl-4 py-2">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold">${trackStatusOptions.find(o => o.value === update.status)?.label || update.status}</p>
                    <p class="text-sm text-gray-600">${update.notes || 'No additional notes'}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500">${new Date(update.date).toLocaleDateString()}</p>
                    <p class="text-xs text-gray-500">${update.location || 'Factory'}</p>
                  </div>
                </div>
              </div>
            `).join('') : `
              <div class="text-center py-4 text-gray-500">
                <div class="text-4xl mb-2">📭</div>
                <p>No tracking updates yet</p>
              </div>
            `}
          </div>
        </div>
      `,
      confirmButtonColor: '#f97316',
      confirmButtonText: 'Close',
      width: '600px'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Trigger modal when selectedOrder changes
  useEffect(() => {
    if (selectedOrder && addingTracking) {
      openTrackingModal();
    }
  }, [selectedOrder, addingTracking]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading approved orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Approved <span className="text-orange-500">Orders</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage and track production & shipping of approved orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Approved</p>
          <p className="text-2xl font-bold text-orange-500">{orders.length}</p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>In Production</p>
          <p className="text-2xl font-bold text-blue-500">
            {orders.filter(o => 
              o.trackingStatus && ['cutting', 'sewing', 'finishing'].includes(o.trackingStatus)
            ).length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ready to Ship</p>
          <p className="text-2xl font-bold text-purple-500">
            {orders.filter(o => o.trackingStatus === 'packed').length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivered</p>
          <p className="text-2xl font-bold text-green-500">
            {orders.filter(o => o.trackingStatus === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-5 rounded-2xl mb-8 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search by order ID, product name, or buyer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <FaFilter className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark 
                  ? 'bg-gray-900 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="cutting">Cutting</option>
              <option value="sewing">Sewing</option>
              <option value="finishing">Finishing</option>
              <option value="qc">QC Checked</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className={`p-12 rounded-2xl text-center ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="text-6xl mb-6">📊</div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {orders.length === 0 ? 'No Approved Orders' : 'No Orders Found'}
          </h3>
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {orders.length === 0 
              ? "No orders have been approved yet. Check the Pending Orders section."
              : 'Try changing your search or filter criteria'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const currentStatus = order.trackingStatus || 'approved';
            const statusConfig = trackStatusOptions.find(o => o.value === currentStatus) || 
              { label: 'Approved', icon: '✅', color: 'gray' };
            
            return (
              <div
                key={order._id}
                className={`rounded-2xl p-6 ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                } shadow-xl`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.productName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${statusConfig.color}-500/20 text-${statusConfig.color}-600`}>
                            {statusConfig.icon} {statusConfig.label}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <FaBox />
                              <span><strong>Order ID:</strong> {order._id?.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <FaCalendarAlt />
                              <span><strong>Approved:</strong> {formatDate(order.approvedAt || order.updatedAt)}</span>
                            </div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>Quantity:</strong> {order.quantity} units
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <FaUser />
                              <span><strong>Buyer:</strong> {order.buyerName}</span>
                            </div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>Email:</strong> {order.buyerEmail}
                            </div>
                            {order.contactNumber && (
                              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <strong>Phone:</strong> {order.contactNumber}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(order.totalPrice)}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Amount
                        </p>
                      </div>
                    </div>

                    {/* Tracking Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Production & Shipping Progress
                        </h4>
                        <button
                          onClick={() => viewTrackingHistory(order)}
                          className={`flex items-center gap-2 text-sm ${
                            isDark 
                              ? 'text-gray-400 hover:text-gray-300' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <FaHistory />
                          View History
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {trackStatusOptions.map((status, index) => {
                          const isCompleted = trackStatusOptions.findIndex(o => o.value === currentStatus) >= index;
                          const isCurrent = currentStatus === status.value;
                          
                          return (
                            <div key={status.value} className="flex flex-col items-center flex-1">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                                isCompleted 
                                  ? `bg-${status.color}-500 text-white` 
                                  : isDark 
                                    ? 'bg-gray-700 text-gray-400' 
                                    : 'bg-gray-200 text-gray-400'
                              } ${isCurrent ? 'ring-2 ring-offset-2 ring-orange-500' : ''}`}>
                                {isCompleted ? '✓' : status.icon}
                              </div>
                              <div className={`text-xs text-center px-1 ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {status.label.split(' ')[0]}
                              </div>
                              {index < trackStatusOptions.length - 1 && (
                                <div className={`h-1 flex-1 mt-4 ${
                                  isCompleted ? `bg-${status.color}-500` : isDark ? 'bg-gray-700' : 'bg-gray-200'
                                }`}></div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-64 space-y-3">
                    <button
                      onClick={() => viewTrackingHistory(order)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium ${
                        isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <FaEye />
                      View Details
                    </button>
                    
                    {currentStatus !== 'delivered' && (
                      <button
                        onClick={() => handleAddTracking(order._id)}
                        disabled={addingTracking === order._id}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingTracking === order._id ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaPlus />
                            Add Tracking
                          </>
                        )}
                      </button>
                    )}
                    
                    {currentStatus === 'shipped' && (
                      <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium"
                        onClick={() => submitTrackingUpdate('delivered', 'Product delivered successfully')}
                      >
                        <FaCheckCircle />
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tracking Instructions */}
      {orders.length > 0 && (
        <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📝 Tracking Management Guidelines:
          </h3>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>• Update tracking status promptly as order progresses through production stages</li>
            <li>• Add relevant notes at each stage for better communication with buyers</li>
            <li>• Mark as "Delivered" only after confirmed delivery with the buyer</li>
            <li>• Regular updates help build trust and improve customer satisfaction</li>
            <li>• Use the tracking history to monitor production timelines and identify bottlenecks</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrders;