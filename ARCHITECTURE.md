# Architecture & Guidelines - React Native (Expo Router)

Ce document définit les standards de développement, l'architecture et les bonnes pratiques pour le projet **essivivi**.

## 1. Philosophie & Principes
*   **Single Responsibility Principle (SRP)** : Un composant ne doit faire qu'une seule chose (ex: un bouton affiche une action, il ne gère pas la logique métier complexe).
*   **Composition > Héritage** : Construire des interfaces complexes en assemblant des composants simples.
*   **DRY (Don't Repeat Yourself)** : Extraire la logique dupliquée dans des `hooks` ou des `utils`.
*   **Atomic Design (Adapté)** : Séparer les composants UI purement visuels (`ui`) des composants métiers (`features`).

---

## 2. Arborescence du Projet

Nous adoptons une structure hybride **Feature-First** pour la scalabilité.

```
/
├── app/                  # 🟢 NAVIGATION (Expo Router) - Uniquement les "Screens"
│   ├── (tabs)/           # Layouts d'onglets
│   ├── auth/             # Routes d'authentification
│   └── _layout.tsx       # Configuration globale
│
├── components/           # 🧱 COMPOSANTS PARTAGÉS
│   ├── ui/               # Composants "Dumb" (Boutons, Inputs, Typo) - Hautement réutilisables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Typography.tsx
│   └── common/           # Composants composites (Cards, Headers génériques)
│
├── constants/            # 🎨 THÈME & CONFIG
│   ├── Colors.ts
│   ├── Typography.ts
│   └── Config.ts
│
├── core/                 # ⚙️ COEUR DE L'APPLICATION (Services & Utils)
│   ├── services/         # Appels API, Storage, Auth (Axios, Firebase...)
│   ├── hooks/            # Hooks globaux (useTheme, useDebounce)
│   ├── utils/            # Fonctions pures (date formatting, validation)
│   └── types/            # Définitions TypeScript globales
│
└── features/             # 💼 LOGIQUE MÉTIER (Vertical Slices)
    ├── auth/             # Tout ce qui concerne l'Auth
    │   ├── hooks/        # useLogin, useRegister
    │   └── components/   # LoginForm, RegisterForm (Exclusif à cette feature)
    └── dashboard/        # Tout ce qui concerne le Dashboard
```

---

## 3. Nomenclature (Naming Conventions)

| Type | Convention | Exemple |
| :--- | :--- | :--- |
| **Dossiers** | kebab-case (sauf composants) | `core/services`, `features/auth` |
| **Fichiers Composants** | PascalCase | `PrimaryButton.tsx`, `UserProfile.tsx` |
| **Fichiers Logiques** | camelCase | `authService.ts`, `formatDate.ts` |
| **Hooks** | camelCase (prefix `use`) | `useAuth.ts`, `useFetchData.ts` |
| **Interfaces/Types** | PascalCase (prefix `I` ou `T` optionnel) | `User.ts` ou `IUser.ts` |

---

## 4. Structure d'un Composant "Propre"

Un composant doit suivre cet ordre strict pour rester lisible :

1.  **Imports** (React, Libs, Components, Utils, Styles)
2.  **Interface Props**
3.  **Composant**
    *   Hooks (State, Effect)
    *   Fonctions Helper internes
    *   Render (Return)
4.  **Styles** (StyleSheet)

### Exemple : Composant UI Réutilisable (`components/ui/CustomButton.tsx`)

```tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Palette } from '@/constants/theme';

// 1. Definition claire des props (+ héritage des props natives si besoin)
interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    variant = 'primary',
    isLoading = false,
    style,
    disabled,
    ...props
}) => {
    // 2. Logique de style dynamique propre
    const backgroundColor = variant === 'outline' ? 'transparent' : Palette[variant];
    const textColor = variant === 'outline' ? Palette.primary : '#FFFFFF';

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor, borderColor: Palette.primary, borderWidth: variant === 'outline' ? 1 : 0 },
                disabled && styles.disabled,
                style
            ]}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
    },
});
```

---

## 5. Gestion des Données (Data Layer)

### Services (API)
Ne jamais faire de `fetch` directement dans les composants UI. Utiliser une couche de service.

```ts
// core/services/authService.ts
import { ApiClient } from './apiClient';

export const AuthService = {
    login: async (credentials: LoginCredentials) => {
        const { data } = await ApiClient.post('/auth/login', credentials);
        return data;
    },
    // ...
};
```

### Hooks (Logique de vue)
Les composants ne doivent pas savoir *comment* on récupère la donnée, juste qu'elle est là.

```ts
// features/auth/hooks/useLogin.ts
import { useState } from 'react';
import { AuthService } from '@/core/services/authService';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const login = async (creds) => {
        setIsLoading(true);
        try {
            await AuthService.login(creds);
            // Handle success
        } catch (error) {
            // Handle error
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading };
};
```

---

## 6. Bonnes Pratiques à retenir

1.  **Strict Typing** : Utilisez TypeScript pour tout. Pas de `any`.
2.  **Styles externalisés** : Si un style fait plus de 20 lignes et n'est pas dynamique, sortez-le du composant ou utilisez `StyleSheet.create`.
3.  **Performance** :
    *   Utilisez `useMemo` pour les calculs lourds.
    *   Utilisez `useCallback` pour les fonctions passées aux enfants.
    *   Utilisez `FlatList` pour les listes (jamais de `map` dans une ScrollView pour des grandes listes).
4.  **Gestion d'erreur** : Toujours wrapper les appels async dans des `try/catch` ou utiliser un gestionnaire global.

---

**Ce document servira de référence pour toute Pull Request ou modification future.**
