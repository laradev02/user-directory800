import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, shareReplay } from 'rxjs/operators';
import { User, UsersResponse, UserResponse, VerifyTokenRequest, VerifyTokenResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = environment.production 
    ? 'https://reqres.in/api/users' 
    : '/api/users';
  
  private readonly singleUserUrl = 'https://reqres.in/api/users';
  
  private readonly verifyUrl = environment.production
    ? 'https://reqres.in/api/app-users/verify'
    : '/api/app-users/verify';
  
  private readonly CACHE_TTL_USERS = 5 * 60 * 1000;
  private readonly CACHE_TTL_USER = 10 * 60 * 1000;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {
    setInterval(() => this.cacheService.clearExpired(), 60 * 1000);
  }

  private getHeaders(includeApiKey: boolean = false): HttpHeaders {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (includeApiKey && environment.apiKey) {
      headers['x-api-key'] = environment.apiKey;
    }

    return new HttpHeaders(headers);
  }

  private getHttpOptions(withCredentials: boolean = false, includeApiKey: boolean = false) {
    return {
      headers: this.getHeaders(includeApiKey),
      withCredentials: withCredentials
    };
  }

  getUsers(page: number = 1, projectId?: string): Observable<UsersResponse> {
    const cacheKey = `users_page_${page}_${projectId || environment.projectId || 'default'}`;
    
    const cached = this.cacheService.get<UsersResponse>(cacheKey);
    if (cached) {
      return of(cached);
    }

    let url = `${this.apiUrl}?page=${page}`;
    if (projectId || environment.projectId) {
      url += `&project_id=${projectId || environment.projectId}`;
    }

    return this.http.get<UsersResponse>(url, this.getHttpOptions(false, true)).pipe(
      tap(response => {
        this.cacheService.set(cacheKey, response, this.CACHE_TTL_USERS);
        response.data.forEach(user => {
          const userCacheKey = `user_${user.id}`;
          if (!this.cacheService.has(userCacheKey)) {
            this.cacheService.set(userCacheKey, user, this.CACHE_TTL_USER);
          }
        });
      }),
      shareReplay(1),
      catchError(error => throwError(() => error))
    );
  }

  getUserById(id: number, projectId?: string): Observable<User> {
    const cacheKey = `user_${id}_${projectId || environment.projectId || 'default'}`;
    
    const cached = this.cacheService.get<User>(cacheKey);
    if (cached) {
      return of(cached);
    }

    let url = `${this.singleUserUrl}/${id}`;
    if (projectId || environment.projectId) {
      url += `?project_id=${projectId || environment.projectId}`;
    }

    return this.http.get<UserResponse>(url, this.getHttpOptions(false, true)).pipe(
      map(response => response.data),
      tap(user => {
        this.cacheService.set(cacheKey, user, this.CACHE_TTL_USER);
      }),
      shareReplay(1),
      catchError(error => throwError(() => error))
    );
  }

  searchUserById(id: number, projectId?: string): Observable<User | null> {
    const cacheKey = `user_${id}_${projectId || environment.projectId || 'default'}`;
    
    const cached = this.cacheService.get<User>(cacheKey);
    if (cached) {
      return of(cached);
    }

    let url = `${this.singleUserUrl}/${id}`;
    if (projectId || environment.projectId) {
      url += `?project_id=${projectId || environment.projectId}`;
    }

    return this.http.get<UserResponse>(url, this.getHttpOptions(false, true)).pipe(
      map(response => response.data),
      tap(user => {
        this.cacheService.set(cacheKey, user, this.CACHE_TTL_USER);
      }),
      catchError(() => of(null))
    );
  }

  verifyToken(token: string): Observable<VerifyTokenResponse> {
    const payload: VerifyTokenRequest = { token };
    
    return this.http.post<VerifyTokenResponse>(this.verifyUrl, payload, this.getHttpOptions(false, true)).pipe(
      catchError(error => throwError(() => error))
    );
  }

  clearCache(): void {
    this.cacheService.clear();
  }

  clearPageCache(page: number): void {
    const cacheKey = `users_page_${page}_default`;
    this.cacheService.delete(cacheKey);
  }

  getCacheStats() {
    return this.cacheService.getStats();
  }
}
