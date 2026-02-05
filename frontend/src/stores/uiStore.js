import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * UI Store - Global UI state management
 * Features: Toasts, modals, loading states, notifications
 */
const useUIStore = create(
    devtools(
        (set, get) => ({
            // Toast notifications
            toasts: [],
            toastIdCounter: 0,

            // Modal state
            modals: {},

            // Global loading
            globalLoading: false,

            // Actions
            showToast: (message, type = 'info', duration = 5000) => {
                const { toastIdCounter } = get();
                const id = toastIdCounter + 1;

                const toast = {
                    id,
                    message,
                    type, // 'success', 'error', 'warning', 'info'
                    duration,
                    timestamp: Date.now(),
                };

                set((state) => ({
                    toasts: [...state.toasts, toast],
                    toastIdCounter: id,
                }));

                // Auto-remove after duration
                if (duration > 0) {
                    setTimeout(() => {
                        get().removeToast(id);
                    }, duration);
                }

                return id;
            },

            removeToast: (id) => {
                set((state) => ({
                    toasts: state.toasts.filter((toast) => toast.id !== id),
                }));
            },

            clearToasts: () => {
                set({ toasts: [] });
            },

            // Convenience methods for different toast types
            showSuccess: (message, duration) => {
                return get().showToast(message, 'success', duration);
            },

            showError: (message, duration) => {
                return get().showToast(message, 'error', duration);
            },

            showWarning: (message, duration) => {
                return get().showToast(message, 'warning', duration);
            },

            showInfo: (message, duration) => {
                return get().showToast(message, 'info', duration);
            },

            // Modal management
            openModal: (modalId, data = {}) => {
                set((state) => ({
                    modals: {
                        ...state.modals,
                        [modalId]: { isOpen: true, data },
                    },
                }));
            },

            closeModal: (modalId) => {
                set((state) => ({
                    modals: {
                        ...state.modals,
                        [modalId]: { isOpen: false, data: {} },
                    },
                }));
            },

            isModalOpen: (modalId) => {
                const { modals } = get();
                return modals[modalId]?.isOpen || false;
            },

            getModalData: (modalId) => {
                const { modals } = get();
                return modals[modalId]?.data || {};
            },

            // Global loading
            setGlobalLoading: (loading) => {
                set({ globalLoading: loading });
            },
        }),
        { name: 'UIStore' }
    )
);

export default useUIStore;
