'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/services/api';
import type { ApiCoupon, ApiService } from './page';

interface CouponsTabProps {
  coupons: ApiCoupon[];
  setCoupons: React.Dispatch<React.SetStateAction<ApiCoupon[]>>;
  services: ApiService[];
  token: string;
}

const formatPrice = (paise: number) =>
  `₹${(paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

export function CouponsTab({ coupons, setCoupons, services, token }: CouponsTabProps) {
  const [isCreating,  setIsCreating]  = useState(false);
  const [togglingId,  setTogglingId]  = useState<string | null>(null);
  const [creating,    setCreating]    = useState(false);
  const [error,       setError]       = useState('');

  const [formData, setFormData] = useState({
    code:       '',
    price:      '',
    serviceId:  '',
    isActive:   true,
    expiryDate: '',
  });

  const resetForm = () => {
    setFormData({ code: '', price: '', serviceId: '', isActive: true, expiryDate: '' });
  };

  const toggleActive = async (id: string, current: boolean) => {
    setTogglingId(id);
    setError('');
    try {
      await apiRequest('PATCH', `/coupons/admin/${id}/status`, {
        body: { isActive: !current },
        token,
      });
      setCoupons(prev => prev.map(c => c._id === id ? { ...c, isActive: !current } : c));
    } catch (err: any) {
      setError(err.message ?? 'Failed to update coupon.');
    } finally {
      setTogglingId(null);
    }
  };

  const handleCreate = async () => {
    if (!formData.code.trim() || !formData.price || !formData.serviceId) {
      setError('Code, price, and service are required.');
      return;
    }
    setCreating(true);
    setError('');
    try {
      let expiryDateISO: string | undefined;
      if (formData.expiryDate) {
        const dateObj = new Date(formData.expiryDate);
        expiryDateISO = dateObj.toISOString();
      }

      const data = await apiRequest<{ coupon: ApiCoupon }>('POST', '/coupons/admin', {
        body: {
          code:       formData.code.trim().toUpperCase(),
          price:      Number(formData.price),
          serviceId:  formData.serviceId,
          isActive:   formData.isActive,
          expiryDate: expiryDateISO,
        },
        token,
      });
      setCoupons(prev => [data.coupon, ...prev]);
      setIsCreating(false);
      resetForm();
    } catch (err: any) {
      setError(err.message ?? 'Failed to create coupon.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Coupon Management</h2>
        {!isCreating && (
          <button
            onClick={() => { setIsCreating(true); setError(''); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Coupon
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Create form */}
      {isCreating && (
        <div className="bg-blue-50 rounded-md p-6 border border-blue-200">
          <h3 className="text-lg font-medium mb-2 text-gray-900">Create New Coupon</h3>
          <p className="text-xs text-blue-600 mb-4">
            Price is a flat override — the coupon replaces the service price entirely (not a percentage off).
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Coupon Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={e => setFormData(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                className="w-full px-4 py-2 border rounded-md font-mono text-gray-900 bg-white placeholder-gray-400"
                placeholder="e.g. SARSEN20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Final Price (paise) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData(f => ({ ...f, price: e.target.value }))}
                className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white placeholder-gray-400"
                placeholder="e.g. 3500000 = ₹35,000"
              />
              {formData.price && (
                <p className="text-xs text-green-600 mt-1">= {formatPrice(Number(formData.price))}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Service *</label>
              <select
                value={formData.serviceId}
                onChange={e => setFormData(f => ({ ...f, serviceId: e.target.value }))}
                className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
              >
                <option value="">— Select a service —</option>
                {services.map(s => (
                  <option key={s._id} value={s._id}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={e => setFormData(f => ({ ...f, expiryDate: e.target.value }))}
                className="w-full px-4 py-2 border rounded-md text-gray-900 bg-white"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={e => setFormData(f => ({ ...f, isActive: e.target.checked }))}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="isActive" className="text-sm text-gray-900">Active immediately</label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreate}
              disabled={creating}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
            >
              {creating ? 'Creating…' : 'Create Coupon'}
            </button>
            <button
              onClick={() => { setIsCreating(false); resetForm(); setError(''); }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Coupon cards */}
      {coupons.length === 0 ? (
        <div className="bg-white rounded-md border border-gray-200 p-12 text-center">
          <p className="text-gray-400">No coupons yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coupons.filter(coupon => coupon && coupon._id).map(coupon => (
            <div key={coupon._id} className="bg-white rounded-md p-5 border shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xl font-bold text-gray-800 font-mono">{coupon.code}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-sm mb-4">
                <p className="text-gray-900"><span className="text-gray-500">Price:</span> {formatPrice(coupon.price)}</p>
                <p className="text-gray-900"><span className="text-gray-500">Service:</span> {coupon.serviceId?.title ?? 'Unknown'}</p>
                {coupon.expiryDate && (
                  <p className="text-gray-900"><span className="text-gray-500">Expires:</span> {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleActive(coupon._id, coupon.isActive)}
                  disabled={togglingId === coupon._id}
                  className={`w-full text-xs px-3 py-2 rounded-md transition-colors disabled:opacity-50 ${
                    coupon.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {togglingId === coupon._id ? '…' : coupon.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}