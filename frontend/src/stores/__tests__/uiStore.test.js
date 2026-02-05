/**
 * UI Store Tests
 * Comprehensive unit tests for uiStore.js
 */

import useUIStore from '../uiStore';
import { resetAllStores } from '../../test-utils/testHelpers';

describe('uiStore', () => {
    beforeEach(() => {
        resetAllStores();
    });

    describe('Initial State', () => {
        it('should have empty toasts array', () => {
            const { toasts } = useUIStore.getState();
            expect(toasts).toEqual([]);
        });

        it('should have empty modals object', () => {
            const { modals } = useUIStore.getState();
            expect(modals).toEqual({});
        });

        it('should have globalLoading false', () => {
            const { globalLoading } = useUIStore.getState();
            expect(globalLoading).toBe(false);
        });
    });

    describe('Toast Management', () => {
        describe('showToast', () => {
            it('should add a toast', () => {
                const { showToast } = useUIStore.getState();
                showToast('Test message', 'info', 5000);

                const { toasts } = useUIStore.getState();
                expect(toasts).toHaveLength(1);
                expect(toasts[0].message).toBe('Test message');
                expect(toasts[0].type).toBe('info');
                expect(toasts[0].duration).toBe(5000);
            });

            it('should generate unique IDs for toasts', () => {
                const { showToast } = useUIStore.getState();
                showToast('Message 1');
                showToast('Message 2');

                const { toasts } = useUIStore.getState();
                expect(toasts[0].id).not.toBe(toasts[1].id);
            });

            it('should use default type and duration', () => {
                const { showToast } = useUIStore.getState();
                showToast('Test message');

                const { toasts } = useUIStore.getState();
                expect(toasts[0].type).toBe('info');
                expect(toasts[0].duration).toBe(5000);
            });

            it('should allow custom duration', () => {
                const { showToast } = useUIStore.getState();
                showToast('Test message', 'success', 10000);

                const { toasts } = useUIStore.getState();
                expect(toasts[0].duration).toBe(10000);
            });

            it('should support multiple toasts', () => {
                const { showToast } = useUIStore.getState();
                showToast('Message 1');
                showToast('Message 2');
                showToast('Message 3');

                const { toasts } = useUIStore.getState();
                expect(toasts).toHaveLength(3);
            });
        });

        describe('Convenience Methods', () => {
            it('showSuccess should add success toast', () => {
                const { showSuccess } = useUIStore.getState();
                showSuccess('Success message');

                const { toasts } = useUIStore.getState();
                expect(toasts[0].type).toBe('success');
                expect(toasts[0].message).toBe('Success message');
            });

            it('showError should add error toast', () => {
                const { showError } = useUIStore.getState();
                showError('Error message');

                const { toasts } = useUIStore.getState();
                expect(toasts[0].type).toBe('error');
                expect(toasts[0].message).toBe('Error message');
            });

            it('showWarning should add warning toast', () => {
                const { showWarning } = useUIStore.getState();
                showWarning('Warning message');

                const { toasts } = useUIStore.getState();
                expect(toasts[0].type).toBe('warning');
                expect(toasts[0].message).toBe('Warning message');
            });

            it('showInfo should add info toast', () => {
                const { showInfo } = useUIStore.getState();
                showInfo('Info message');

                const { toasts } = useUIStore.getState();
                expect(toasts[0].type).toBe('info');
                expect(toasts[0].message).toBe('Info message');
            });

            it('should accept custom duration in convenience methods', () => {
                const { showSuccess } = useUIStore.getState();
                showSuccess('Success', 10000);

                const { toasts } = useUIStore.getState();
                expect(toasts[0].duration).toBe(10000);
            });
        });

        describe('removeToast', () => {
            it('should remove toast by ID', () => {
                const { showToast, removeToast } = useUIStore.getState();
                showToast('Message 1');
                showToast('Message 2');

                const toastId = useUIStore.getState().toasts[0].id;
                removeToast(toastId);

                const { toasts } = useUIStore.getState();
                expect(toasts).toHaveLength(1);
                expect(toasts[0].message).toBe('Message 2');
            });

            it('should do nothing if ID not found', () => {
                const { showToast, removeToast } = useUIStore.getState();
                showToast('Message 1');

                removeToast('non-existent-id');

                const { toasts } = useUIStore.getState();
                expect(toasts).toHaveLength(1);
            });

            it('should handle removing from empty toasts', () => {
                const { removeToast } = useUIStore.getState();

                expect(() => removeToast('some-id')).not.toThrow();
                expect(useUIStore.getState().toasts).toEqual([]);
            });
        });

        describe('clearToasts', () => {
            it('should clear all toasts', () => {
                const { showToast, clearToasts } = useUIStore.getState();
                showToast('Message 1');
                showToast('Message 2');
                showToast('Message 3');

                clearToasts();

                const { toasts } = useUIStore.getState();
                expect(toasts).toEqual([]);
            });

            it('should handle clearing empty toasts', () => {
                const { clearToasts } = useUIStore.getState();

                expect(() => clearToasts()).not.toThrow();
                expect(useUIStore.getState().toasts).toEqual([]);
            });
        });
    });

    describe('Modal Management', () => {
        describe('openModal', () => {
            it('should open a modal', () => {
                const { openModal } = useUIStore.getState();
                openModal('testModal');

                const { modals } = useUIStore.getState();
                expect(modals.testModal).toBeDefined();
                expect(modals.testModal.isOpen).toBe(true);
            });

            it('should open modal with data', () => {
                const { openModal } = useUIStore.getState();
                const modalData = { title: 'Test', content: 'Test content' };
                openModal('testModal', modalData);

                const { modals } = useUIStore.getState();
                expect(modals.testModal.data).toEqual(modalData);
            });

            it('should handle multiple modals', () => {
                const { openModal } = useUIStore.getState();
                openModal('modal1');
                openModal('modal2');

                const { modals } = useUIStore.getState();
                expect(modals.modal1.isOpen).toBe(true);
                expect(modals.modal2.isOpen).toBe(true);
            });

            it('should update existing modal', () => {
                const { openModal } = useUIStore.getState();
                openModal('testModal', { data: 'old' });
                openModal('testModal', { data: 'new' });

                const { modals } = useUIStore.getState();
                expect(modals.testModal.data).toEqual({ data: 'new' });
            });
        });

        describe('closeModal', () => {
            it('should close a modal', () => {
                const { openModal, closeModal } = useUIStore.getState();
                openModal('testModal');
                closeModal('testModal');

                const { modals } = useUIStore.getState();
                expect(modals.testModal.isOpen).toBe(false);
            });

            it('should preserve modal data when closing', () => {
                const { openModal, closeModal } = useUIStore.getState();
                const modalData = { title: 'Test' };
                openModal('testModal', modalData);
                closeModal('testModal');

                const { modals } = useUIStore.getState();
                expect(modals.testModal.data).toEqual(modalData);
            });

            it('should handle closing non-existent modal', () => {
                const { closeModal } = useUIStore.getState();

                expect(() => closeModal('nonExistent')).not.toThrow();
            });
        });

        describe('isModalOpen', () => {
            it('should return true for open modal', () => {
                const { openModal, isModalOpen } = useUIStore.getState();
                openModal('testModal');

                expect(isModalOpen('testModal')).toBe(true);
            });

            it('should return false for closed modal', () => {
                const { openModal, closeModal, isModalOpen } = useUIStore.getState();
                openModal('testModal');
                closeModal('testModal');

                expect(isModalOpen('testModal')).toBe(false);
            });

            it('should return false for non-existent modal', () => {
                const { isModalOpen } = useUIStore.getState();
                expect(isModalOpen('nonExistent')).toBe(false);
            });
        });

        describe('getModalData', () => {
            it('should return modal data', () => {
                const { openModal, getModalData } = useUIStore.getState();
                const modalData = { title: 'Test', content: 'Content' };
                openModal('testModal', modalData);

                expect(getModalData('testModal')).toEqual(modalData);
            });

            it('should return null for non-existent modal', () => {
                const { getModalData } = useUIStore.getState();
                expect(getModalData('nonExistent')).toBeNull();
            });

            it('should return data even if modal is closed', () => {
                const { openModal, closeModal, getModalData } = useUIStore.getState();
                const modalData = { title: 'Test' };
                openModal('testModal', modalData);
                closeModal('testModal');

                expect(getModalData('testModal')).toEqual(modalData);
            });
        });
    });

    describe('Global Loading', () => {
        it('should set global loading to true', () => {
            const { setGlobalLoading } = useUIStore.getState();
            setGlobalLoading(true);

            expect(useUIStore.getState().globalLoading).toBe(true);
        });

        it('should set global loading to false', () => {
            const { setGlobalLoading } = useUIStore.getState();
            setGlobalLoading(true);
            setGlobalLoading(false);

            expect(useUIStore.getState().globalLoading).toBe(false);
        });
    });

    describe('Integration Scenarios', () => {
        it('should handle multiple toasts and modals simultaneously', () => {
            const { showToast, openModal } = useUIStore.getState();

            showToast('Toast 1');
            showToast('Toast 2');
            openModal('modal1');
            openModal('modal2');

            const state = useUIStore.getState();
            expect(state.toasts).toHaveLength(2);
            expect(Object.keys(state.modals)).toHaveLength(2);
        });

        it('should handle toast lifecycle', () => {
            const { showToast, removeToast } = useUIStore.getState();

            showToast('Message 1');
            showToast('Message 2');
            const toastId = useUIStore.getState().toasts[0].id;

            removeToast(toastId);
            expect(useUIStore.getState().toasts).toHaveLength(1);

            showToast('Message 3');
            expect(useUIStore.getState().toasts).toHaveLength(2);
        });

        it('should handle modal lifecycle', () => {
            const { openModal, closeModal, isModalOpen } = useUIStore.getState();

            openModal('modal1', { step: 1 });
            expect(isModalOpen('modal1')).toBe(true);

            openModal('modal1', { step: 2 });
            expect(isModalOpen('modal1')).toBe(true);

            closeModal('modal1');
            expect(isModalOpen('modal1')).toBe(false);
        });
    });
});
