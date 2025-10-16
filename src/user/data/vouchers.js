export const vouchers = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 1000, description: 'Get 10% off on your first order' },
  { code: 'FLAT500', discount: 500, type: 'fixed', minOrder: 5000, description: 'Flat ₹500 off on orders above ₹5000' },
  { code: 'MEGA20', discount: 20, type: 'percentage', minOrder: 10000, description: '20% off on orders above ₹10000' },
  { code: 'FREESHIP', discount: 0, type: 'shipping', minOrder: 0, description: 'Free shipping on all orders' }
];

export const validateVoucher = (code, cartTotal) => {
  const voucher = vouchers.find(v => v.code.toUpperCase() === code.toUpperCase());
  
  if (!voucher) {
    return { valid: false, message: 'Invalid voucher code' };
  }
  
  if (cartTotal < voucher.minOrder) {
    return { valid: false, message: `Minimum order of ₹${voucher.minOrder} required` };
  }
  
  let discountAmount = 0;
  if (voucher.type === 'percentage') {
    discountAmount = (cartTotal * voucher.discount) / 100;
  } else if (voucher.type === 'fixed') {
    discountAmount = voucher.discount;
  }
  
  return { 
    valid: true, 
    voucher, 
    discountAmount,
    message: `Voucher applied successfully!` 
  };
};

export default vouchers;
