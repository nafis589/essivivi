/**
 * Global Types Definition
 * Centralise les types partagés dans toute l'application.
 */

// Exemple de type utilisateur
export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'client' | 'livreur' | 'admin';
    avatarUrl?: string;
}

// Exemple de type pour les réponses API standards
export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
