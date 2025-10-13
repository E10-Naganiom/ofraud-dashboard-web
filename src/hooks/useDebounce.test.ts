import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('debounces value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    // Update value
    rerender({ value: 'updated' });

    // Value should still be initial (not debounced yet)
    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now value should be updated
    expect(result.current).toBe('updated');
  });

  it('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    // Rapid value changes
    rerender({ value: 'second' });
    act(() => vi.advanceTimersByTime(250)); // 250ms (not enough to trigger)

    rerender({ value: 'third' });
    act(() => vi.advanceTimersByTime(250)); // Another 250ms

    // Should still be 'first' because timeout was cancelled
    expect(result.current).toBe('first');

    // Fast-forward remaining time (total 500ms from last change)
    act(() => vi.advanceTimersByTime(250));

    // Should be 'third' (only the last value)
    expect(result.current).toBe('third');
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));

    // Unmount hook
    unmount();

    // Fast-forward time - should not throw or cause errors
    expect(() => {
      act(() => vi.advanceTimersByTime(500));
    }).not.toThrow();
  });

  it('uses default delay of 500ms when not specified', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } }
    );

    // Update value
    rerender({ value: 'updated' });

    // Should not be updated before 500ms
    act(() => vi.advanceTimersByTime(499));
    expect(result.current).toBe('initial');

    // Should be updated after 500ms
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('updated');
  });

  it('works with different types (numbers)', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 0 } }
    );

    rerender({ value: 42 });

    act(() => vi.advanceTimersByTime(500));

    expect(result.current).toBe(42);
  });

  it('works with different types (objects)', () => {
    const obj1 = { name: 'test1' };
    const obj2 = { name: 'test2' };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: obj1 } }
    );

    rerender({ value: obj2 });

    act(() => vi.advanceTimersByTime(500));

    expect(result.current).toBe(obj2);
  });
});
