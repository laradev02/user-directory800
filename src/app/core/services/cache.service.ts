import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly DEFAULT_TTL = 5 * 60 * 1000;
  private readonly MAX_CACHE_SIZE = 100;
  private cache = new Map<string, CacheEntry<any>>();
  private accessOrder: string[] = [];

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.delete(key);
      return null;
    }

    this.updateAccessOrder(key);
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    if (this.cache.size >= this.MAX_CACHE_SIZE && !this.cache.has(key)) {
      this.evictLRU();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });

    this.updateAccessOrder(key);
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.accessOrder = this.accessOrder.filter(k => k !== key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  clearExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.delete(key));
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.MAX_CACHE_SIZE,
      keys: Array.from(this.cache.keys())
    };
  }

  private updateAccessOrder(key: string): void {
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    this.accessOrder.push(key);
  }

  private evictLRU(): void {
    if (this.accessOrder.length > 0) {
      const lruKey = this.accessOrder[0];
      this.delete(lruKey);
    }
  }
}
