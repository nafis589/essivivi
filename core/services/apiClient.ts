/**
 * ApiClient.ts
 * Wrapper autour de fetch pour gérer les appels API de manière centralisée.
 */


// TODO: Remplacer par l'URL de votre API
const BASE_URL = 'https://api.votre-backend.com/v1';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
    method?: RequestMethod;
    headers?: Record<string, string>;
    body?: any;
}

class ApiClient {
    private static async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { method = 'GET', headers = {}, body } = options;

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, config);

            // Gestion simple des erreurs HTTP
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
            }

            // Pour les réponses 204 No Content
            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            console.error(`API Request Failed: ${method} ${endpoint}`, error);
            throw error;
        }
    }

    static get<T>(endpoint: string, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'GET', headers });
    }

    static post<T>(endpoint: string, body: any, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'POST', body, headers });
    }

    static put<T>(endpoint: string, body: any, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'PUT', body, headers });
    }

    static delete<T>(endpoint: string, headers?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'DELETE', headers });
    }
}

export { ApiClient };
