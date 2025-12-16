// client/src/pages/dashboard/manager/PendingOrders.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { orderAPI } from '../../../services/api';
import { 
  FaSearch, 
  FaFilter, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEye,
  FaUser,
  FaBox,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaSpinner
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const PendingOrders = () => {
  const { isDark } = useTheme();
  
  // Set page title
  useEffect(() => {
    document.title = 'Pending Orders | Garments Tracker';
    return () => {
      document.title = 'Garments Tracker';
    };
  }, []);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingOrder, setUpdatingOrder] = useState(null);

  // Fetch pending orders
  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const response = await orderAPI.getPendingOrders();
      setOrders(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      toast.error('Failed to load pending orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    return (
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle approve order
  const handleApproveOrder = async (orderId) => {
    setUpdatingOrder({ id: orderId, action: 'approve' });
    
    const result = await Swal.fire({
      title: 'Approve Order?',
      text: 'Are you sure you want to approve this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel',
      input: 'textarea',
      inputLabel: 'Additional Notes (Optional)',
      inputPlaceholder: 'Add any notes for the buyer...',
      inputAttributes: {
        'aria-label': 'Type your notes here'
      },
      showCancelButton: true
    });

    if (result.isConfirmed) {
      try {
        const response = await orderAPI.updateOrderStatus(orderId, 'approved');
        
        if (response.data.success) {
          Swal.fire(
            'Approved!',
            'Order has been approved successfully.',
            'success'
          );
          
          // Update local state
          setOrders(orders.filter(order => order._id !== orderId));
          fetchPendingOrders(); // Refresh list
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          error.response?.data?.message || 'Failed to approve order',
          'error'
        );
      }
    }
    
    setUpdatingOrder(null);
  };

  // Handle reject order
  const handleRejectOrder = async (orderId) => {
    setUpdatingOrder({ id: orderId, action: 'reject' });
    
    const { value: rejectReason } = await Swal.fire({
      title: 'Reject Order',
      text: 'Please provide a reason for rejecting this order',
      icon: 'warning',
      input: 'textarea',
      inputLabel: 'Rejection Reason *',
      inputPlaceholder: 'Enter the reason for rejection...',
      inputAttributes: {
        'aria-label': 'Type rejection reason here'
      },
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Reject Order',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a rejection reason!';
        }
      }
    });

    if (rejectReason) {
      try {
        const response = await orderAPI.updateOrderStatus(orderId, 'rejected');
        
        if (response.data.success) {
          Swal.fire(
            'Rejected!',
            'Order has been rejected.',
            'info'
          );
          
          // Update local state
          setOrders(orders.filter(order => order._id !== orderId));
          fetchPendingOrders(); // Refresh list
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          error.response?.data?.message || 'Failed to reject order',
          'error'
        );
      }
    }
    
    setUpdatingOrder(null);
  };

  // View order details
  const viewOrderDetails = (order) => {
    Swal.fire({
      title: 'Order Details',
      html: `
        <div class="text-left">
          <div class="mb-4">
            <h3 class="font-bold text-lg mb-2">Order Information</h3>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Product:</strong> ${order.productName}</p>
            <p><strong>Quantity:</strong> ${order.quantity}</p>
            <p><strong>Total Price:</strong> ৳${order.totalPrice}</p>
            <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
          
          <div class="mb-4">
            <h3 class="font-bold text-lg mb-2">Buyer Information</h3>
            <p><strong>Name:</strong> ${order.buyerName}</p>
            <p><strong>Email:</strong> ${order.buyerEmail}</p>
            <p><strong>Phone:</strong> ${order.contactNumber || 'N/A'}</p>
          </div>
          
          <div class="mb-4">
            <h3 class="font-bold text-lg mb-2">Delivery Address</h3>
            <p>${order.deliveryAddress || 'Not specified'}</p>
          </div>
          
          ${order.additionalNotes ? `
            <div>
              <h3 class="font-bold text-lg mb-2">Additional Notes</h3>
              <p>${order.additionalNotes}</p>
            </div>
          ` : ''}
        </div>
      `,
      confirmButtonColor: '#f97316',
      confirmButtonText: 'Close'
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading pending orders...
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
          Pending <span className="text-orange-500">Orders</span>
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Review and approve/reject incoming orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Pending</p>
          <p className="text-2xl font-bold text-orange-500">{orders.length}</p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Today's Orders</p>
          <p className="text-2xl font-bold text-blue-500">
            {orders.filter(order => {
              const orderDate = new Date(order.orderDate);
              const today = new Date();
              return orderDate.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>This Week</p>
          <p className="text-2xl font-bold text-purple-500">
            {orders.filter(order => {
              const orderDate = new Date(order.orderDate);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return orderDate >= weekAgo;
            }).length}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Value</p>
          <p className="text-2xl font-bold text-green-500">
            {formatCurrency(orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0))}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className={`p-5 rounded-2xl mb-8 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <div className="relative">
          <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search by order ID, product name, buyer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              isDark 
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className={`p-12 rounded-2xl text-center ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="text-6xl mb-6">✅</div>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {orders.length === 0 ? 'No Pending Orders' : 'No Orders Found'}
          </h3>
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {orders.length === 0 
              ? "Great! All orders have been processed."
              : 'Try changing your search criteria'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
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
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-600">
                          ⏳ Pending
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
                            <span><strong>Order Date:</strong> {formatDate(order.orderDate)}</span>
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
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <FaPhone />
                              <span><strong>Phone:</strong> {order.contactNumber}</span>
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

                  {/* Delivery Info */}
                  <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <FaMapMarkerAlt className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Delivery Address
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {order.deliveryAddress || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    {order.additionalNotes && (
                      <div className="mt-3">
                        <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Additional Notes
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {order.additionalNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-64 space-y-3">
                  <button
                    onClick={() => viewOrderDetails(order)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FaEye />
                    View Details
                  </button>
                  
                  <button
                    onClick={() => handleApproveOrder(order._id)}
                    disabled={updatingOrder?.id === order._id}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingOrder?.id === order._id && updatingOrder?.action === 'approve' ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        Approve Order
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleRejectOrder(order._id)}
                    disabled={updatingOrder?.id === order._id}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingOrder?.id === order._id && updatingOrder?.action === 'reject' ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        Reject Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Processing Time Info */}
      {orders.length > 0 && (
        <div className={`mt-8 p-6 rounded-2xl text-center ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            ⏰ Average processing time: 24-48 hours. Please review orders promptly for better customer experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;