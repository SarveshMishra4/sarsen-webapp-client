'use client';

import React, { useState } from 'react';
import { Coupon } from './types';

export function CouponsTab({
  coupons,
  setCoupons,
  availableServices, // list of service names to choose from
}: {
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  availableServices: string[];
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    discountPercentage: 10,
    applicableServices: [],
    expiryDate: '',
    maxUses: 100,
    currentUses: 0,
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      code: '',
      discountPercentage: 10,
      applicableServices: [],
      expiryDate: '',
      maxUses: 100,
      currentUses: 0,
      isActive: true,
    });
  };

  const handleCreate = () => {
    if (!formData.code || !formData.discountPercentage || !formData.expiryDate) {
      alert('Please fill all required fields');
      return;
    }

    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: formData.code!,
      discountPercentage: formData.discountPercentage!,
      applicableServices: formData.applicableServices || [],
      expiryDate: formData.expiryDate!,
      maxUses: formData.maxUses!,
      currentUses: 0,
      isActive: formData.isActive!,
    };

    setCoupons(prev => [...prev, newCoupon]);
    setIsCreating(false);
    resetForm();
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData(coupon);
    setIsCreating(true); // reuse the same form UI
  };

  const handleUpdate = () => {
    if (!formData.code || !formData.discountPercentage || !formData.expiryDate) {
      alert('Please fill all required fields');
      return;
    }

    const updated: Coupon = {
      id: editingCoupon!.id,
      code: formData.code!,
      discountPercentage: formData.discountPercentage!,
      applicableServices: formData.applicableServices || [],
      expiryDate: formData.expiryDate!,
      maxUses: formData.maxUses!,
      currentUses: editingCoupon!.currentUses, // preserve uses
      isActive: formData.isActive!,
    };

    setCoupons(prev => prev.map(c => c.id === updated.id ? updated : c));
    setIsCreating(false);
    setEditingCoupon(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleServiceToggle = (service: string) => {
    const current = formData.applicableServices || [];
    if (current.includes(service)) {
      setFormData({ ...formData, applicableServices: current.filter(s => s !== service) });
    } else {
      setFormData({ ...formData, applicableServices: [...current, service] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Coupon Management</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Coupon
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-medium mb-4">{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Coupon Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="SUMMER20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discount % *</label>
              <input
                type="number"
                value={formData.discountPercentage}
                onChange={e => setFormData({ ...formData, discountPercentage: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                min="1" max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date *</label>
              <input
                type="date"
                value={formData.expiryDate?.slice(0,10)}
                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Uses</label>
              <input
                type="number"
                value={formData.maxUses}
                onChange={e => setFormData({ ...formData, maxUses: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                min="1"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Applicable Services</label>
            <div className="flex flex-wrap gap-2">
              {availableServices.map(service => (
                <label key={service} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={formData.applicableServices?.includes(service) || false}
                    onChange={() => handleServiceToggle(service)}
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
              <label className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                <input
                  type="checkbox"
                  checked={formData.applicableServices?.includes('ALL') || false}
                  onChange={() => handleServiceToggle('ALL')}
                />
                <span className="text-sm">ALL SERVICES</span>
              </label>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <span className="text-sm">Active</span>
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={editingCoupon ? handleUpdate : handleCreate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingCoupon(null);
                resetForm();
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Coupons List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white rounded-xl p-5 border shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xl font-bold text-gray-800">{coupon.code}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(coupon)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(coupon.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-500">Discount:</span> {coupon.discountPercentage}%</p>
              <p><span className="text-gray-500">Expires:</span> {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              <p><span className="text-gray-500">Uses:</span> {coupon.currentUses}/{coupon.maxUses}</p>
              <p><span className="text-gray-500">Services:</span> {coupon.applicableServices.join(', ') || 'None'}</p>
            </div>
            <div className="mt-3 pt-2 border-t flex justify-between items-center">
              <button
                onClick={() => toggleActive(coupon.id)}
                className={`text-xs px-3 py-1 rounded-full ${
                  coupon.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {coupon.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}